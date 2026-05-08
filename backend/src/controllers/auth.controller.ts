import { Request, Response } from 'express';
import { User } from '../models/user.model';

export class AuthController {
  static async login(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed: Node identifier (email) not found in MongoDB.' });
      }
      if (user.passwordHash !== password) {
        return res.status(401).json({ error: 'Authentication failed: Invalid security token (password) credentials.' });
      }
      return res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      });
    } catch (error: any) {
      console.error('[DB] Authentication Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async register(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email, password, name } = req.body;
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ error: `MongoDB Error: E11000 duplicate key error collection: echo_db.users index: email_1 dup key: { email: "${email}" }` });
      }
      
      const avatar = name.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';
      const user = new User({
        name,
        email: email.toLowerCase(),
        passwordHash: password,
        avatar,
        role: 'admin'
      });
      await user.save();
      
      return res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      });
    } catch (error: any) {
      console.error('[DB] Registration Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateAvatar(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email, avatar } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.avatar = avatar;
      await user.save();
      return res.json({ success: true, avatar: user.avatar });
    } catch (error: any) {
      console.error('[DB] Update Avatar Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }
}
