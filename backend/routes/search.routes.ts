import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @route   POST /api/search
 * @desc    Execute semantic recall across meeting artifacts
 */
router.post('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    results: [],
    message: 'Recall engine stub active'
  });
});

export default router;