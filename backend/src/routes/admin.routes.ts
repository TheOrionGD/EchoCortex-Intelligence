
import { Router } from 'express';
const router = Router();
router.get('/health', (req, res) => res.json({ status: 'HEALTHY' }));
export default router;
