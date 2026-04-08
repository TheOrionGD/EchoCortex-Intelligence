import { Router } from 'express';
import { ConfigController } from '../controllers/config.controller';

const router = Router();

/**
 * GET /api/config/firebase
 * Retrieve Firebase configuration from database
 * Public endpoint - configuration itself is safe to expose
 */
router.get('/firebase', ConfigController.getFirebaseConfig);

/**
 * PUT /api/config/firebase
 * Update Firebase configuration in database
 * Protected endpoint - requires admin authentication in middleware
 */
router.put('/firebase', ConfigController.updateFirebaseConfig);

/**
 * GET /api/config/status
 * Check if configuration is available
 */
router.get('/status', ConfigController.checkConfigStatus);

export default router;
