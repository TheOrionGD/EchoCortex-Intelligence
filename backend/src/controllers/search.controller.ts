
import { Request, Response } from 'express';
export class SearchController {
  async query(req: any, res: any) { res.json({ results: [] }); }
}
