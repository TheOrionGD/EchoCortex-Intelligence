import { Request, Response } from 'express';
import { pool } from '../../config/database';
import { logger } from '../utils/logger';

/**
 * Execute query with retry logic for transient failures
 */
async function executeWithRetry(query: string, values?: any[], retries = 2): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await pool.query(query, values);
    } catch (error: any) {
      const isRetryable = error?.code === 'ECONNREFUSED' || 
                         error?.code === 'ETIMEDOUT' || 
                         error?.code === 'ENOTFOUND' ||
                         error?.message?.includes('server closed the connection');
      
      if (isRetryable && attempt < retries) {
        console.log(`[DB] Query failed (attempt ${attempt}/${retries}), retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        continue;
      }
      throw error;
    }
  }
}

export class ConfigController {
  /**
   * Get Firebase configuration from database
   * Configuration should be securely stored in database table
   */
  static async getFirebaseConfig(req: Request, res: Response): Promise<Response | void> {
    try {
      // Query database for Firebase configuration
      const query = `
        SELECT 
          api_key as "apiKey",
          auth_domain as "authDomain",
          project_id as "projectId",
          storage_bucket as "storageBucket",
          messaging_sender_id as "messagingSenderId",
          app_id as "appId"
        FROM firebase_config
        WHERE active = true
        LIMIT 1
      `;

      const result = await executeWithRetry(query);

      if (result.rows.length === 0) {
        logger.info('Firebase config not found in database');
        return res.status(404).json({
          error: 'Firebase configuration not found',
          message: 'Configure Firebase settings in the database first',
        });
      }

      const config = result.rows[0];
      logger.info('Firebase config served from database', {
        projectId: config.projectId,
        timestamp: new Date().toISOString(),
      });

      // Set cache headers for client-side caching
      res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.json(config);
    } catch (error) {
      logger.error('Failed to fetch Firebase config', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to retrieve Firebase configuration',
      });
    }
  }

  /**
   * Update Firebase configuration in database
   * Protected endpoint - requires admin authentication
   */
  static async updateFirebaseConfig(req: Request, res: Response): Promise<Response | void> {
    try {
      const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
      } = req.body;

      // Validate required fields
      const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
      const missingFields = requiredFields.filter(field => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: 'Missing required fields',
          missingFields,
        });
      }

      // Update configuration in database
      const query = `
        UPDATE firebase_config
        SET 
          api_key = $1,
          auth_domain = $2,
          project_id = $3,
          storage_bucket = $4,
          messaging_sender_id = $5,
          app_id = $6,
          updated_at = NOW()
        WHERE active = true
        RETURNING 
          api_key as "apiKey",
          auth_domain as "authDomain",
          project_id as "projectId",
          storage_bucket as "storageBucket",
          messaging_sender_id as "messagingSenderId",
          app_id as "appId"
      `;

      const values = [apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId];
      const result = await executeWithRetry(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Firebase config not found',
          message: 'Initialize Firebase configuration in database first',
        });
      }

      logger.info('Firebase config updated in database', {
        projectId,
        timestamp: new Date().toISOString(),
      });

      res.json({
        message: 'Firebase configuration updated successfully',
        config: result.rows[0],
      });
    } catch (error) {
      logger.error('Failed to update Firebase config', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to update Firebase configuration',
      });
    }
  }

  /**
   * Health check to verify configuration is available
   */
  static async checkConfigStatus(req: Request, res: Response): Promise<void> {
    try {
      const query = `
        SELECT EXISTS(
          SELECT 1 FROM firebase_config WHERE active = true
        ) as configured
      `;

      const result = await executeWithRetry(query);
      const isConfigured = result.rows[0]?.configured || false;

      res.json({
        status: 'ok',
        configured: isConfigured,
        message: isConfigured 
          ? 'Firebase configuration is available' 
          : 'Firebase configuration not found in database',
      });
    } catch (error) {
      logger.error('Config status check failed', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to check configuration status',
      });
    }
  }
}
