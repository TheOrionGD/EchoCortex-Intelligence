/**
 * Logs Controller
 * Receives and displays frontend logs in the terminal
 */

import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export const LogsController = {
  /**
   * Receive logs from frontend and display in terminal
   */
  receiveLogs: (req: Request, res: Response) => {
    const { timestamp, level, category, message, data } = req.body;

    // Format and display in terminal with colors
    const colors = {
      debug: '\x1b[35m', // Magenta
      info: '\x1b[36m', // Cyan
      warn: '\x1b[33m', // Yellow
      error: '\x1b[31m', // Red
    };
    const reset = '\x1b[0m';
    const color = colors[level as keyof typeof colors] || colors.info;

    // Parse timestamp for readable format
    const time = new Date(timestamp).toLocaleTimeString();

    // Log to terminal
    if (data && Object.keys(data).length > 0) {
      console.log(
        `${color}[${time}] [FRONTEND] [${category.toUpperCase()}] ${message}${reset}`,
        data
      );
    } else {
      console.log(`${color}[${time}] [FRONTEND] [${category.toUpperCase()}] ${message}${reset}`);
    }

    res.status(200).json({ received: true });
  },
};
