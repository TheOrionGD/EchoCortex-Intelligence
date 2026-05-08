import { Router } from 'express';
import { uploadMeeting, getMeetings } from '../controllers/meetings.controller';
import { MeetingsController } from '../src/controllers/meetings.controller';

const router = Router();
const controller = new MeetingsController();

router.post('/', uploadMeeting);
router.get('/', getMeetings);
router.post('/ingest', (req, res) => controller.ingest(req, res));
router.post('/chat', (req, res) => controller.chat(req, res));
router.get('/:id', (req, res) => controller.getOne(req, res));
router.delete('/:id', (req, res) => controller.purge(req, res));

export default router;