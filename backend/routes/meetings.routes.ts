import { Router } from 'express';
import { uploadMeeting, getMeetings } from '../controllers/meetings.controller';

const router = Router();

router.post('/', uploadMeeting);
router.get('/', getMeetings);

export default router;