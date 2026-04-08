
import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @route   GET /api/admin/health
 * @desc    System health and cortex status check
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'HEALTHY',
    // Fix: Cast process to any to access Node.js uptime property which is missing in current TS context
    uptime: (process as any).uptime(),
    cortex: 'ONLINE',
    timestamp: new Date().toISOString()
  });
});

export default router;
