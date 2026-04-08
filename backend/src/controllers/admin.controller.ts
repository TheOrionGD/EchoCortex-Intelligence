
import { Request, Response } from 'express';
export class AdminController {
  async getSystemStatus(req: any, res: any) { res.json({ cpu: '2%', memory: '1.2GB' }); }
}
