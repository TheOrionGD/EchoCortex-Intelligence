// backend/src/config/database.ts
import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Connection pool settings for better resilience
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Handle connection errors
pool.on('error', (err: Error) => {
  console.error('[DB] Unexpected error on idle client', err);
});

// Run database migrations
async function runMigrations(): Promise<void> {
  try {
    const migrationsDir = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsDir).sort();

    for (const file of migrationFiles) {
      if (file.endsWith('.sql')) {
        console.log(`[DB] Running migration: ${file}`);
        const filePath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');

        const client = await pool.connect();
        try {
          await client.query(sql);
          console.log(`[DB] Migration ${file} completed successfully`);
        } finally {
          client.release();
        }
      }
    }
  } catch (err) {
    console.error('[DB] Migration error:', (err as Error).message);
  }
}

// Test connection with retry logic
async function testConnection(retries = 3, delay = 2000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const client: PoolClient = await pool.connect();
      console.log('[DB] PostgreSQL connected successfully');
      client.release();

      // Run migrations after successful connection
      await runMigrations();
      return;
    } catch (err) {
      console.error(`[DB] Connection attempt ${attempt}/${retries} failed:`, (err as Error).message);
      if (attempt < retries) {
        console.log(`[DB] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('[DB] Failed to connect after all retries. Supabase may be under maintenance.');
        console.log('[DB] Check: https://status.supabase.com');
      }
    }
  }
}

// Attempt connection on startup
testConnection();
