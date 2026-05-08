
import { Router } from 'express';
import { MeetingsController } from '../controllers/meetings.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new MeetingsController();

router.get('/', authMiddleware, controller.getAll);
router.post('/ingest', authMiddleware, controller.ingest);
router.post('/chat', authMiddleware, controller.chat);
router.get('/:id', authMiddleware, controller.getOne);
router.delete('/:id', authMiddleware, controller.purge);

export default router;
