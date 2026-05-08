import { Request, Response } from 'express';
import { MeetingsController } from '../src/controllers/meetings.controller';

const controller = new MeetingsController();

export const uploadMeeting = async (req: Request, res: Response) => {
  return controller.ingest(req, res);
};

export const getMeetings = async (req: Request, res: Response) => {
  return controller.getAll(req, res);
};