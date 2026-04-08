/**
 * Logs Routes
 * Frontend logs endpoint
 */

import { Router, Request, Response } from 'express';
import { LogsController } from '../controllers/logs.controller';

const router = Router();

/**
 * POST /api/logs
 * Receive logs from frontend
 */
router.post('/', LogsController.receiveLogs);

export default router;
