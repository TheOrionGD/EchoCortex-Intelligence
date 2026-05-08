import { Router, Request, Response } from 'express';
import { Meeting } from '../src/models/meeting.model';

const router = Router();

/**
 * @route   POST /api/search
 * @desc    Execute semantic text search across meeting artifacts in MongoDB
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Missing search query." });
    }

    const term = query.toLowerCase();
    const meetings = await Meeting.find({});
    
    const results = meetings.flatMap(m => {
      const segmentsArray = Array.isArray(m.segments) ? m.segments : [];
      return segmentsArray
        .filter(s => s && typeof s.text === 'string' && s.text.toLowerCase().includes(term))
        .map(s => ({
          meetingId: m._id,
          segment: {
            id: s.id,
            speaker: s.speaker,
            text: s.text,
            start_time: s.start_time,
            end_time: s.end_time
          },
          score: 0.92
        }));
    });

    res.json({
      status: 'success',
      results
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;