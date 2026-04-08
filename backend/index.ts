import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import meetingsRoutes from './routes/meetings.routes';
import searchRoutes from './routes/search.routes';
import adminRoutes from './routes/admin.routes';
import logsRoutes from './src/routes/logs.routes';
import configRoutes from './src/routes/config.routes';

dotenv.config();

const app = express();

// Simple request logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] API called: ${req.method} ${req.originalUrl}`);
  next();
});

// Standard middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Route Registration with logs
app.use('/api/logs', logsRoutes);

// Configuration routes - serves Firebase and other configs from database
app.use('/api/config', configRoutes);

app.use('/api/meetings', (req, res, next) => {
  console.log(`[MEETINGS] ${req.method} ${req.originalUrl}`);
  next();
}, meetingsRoutes);

app.use('/api/search', (req, res, next) => {
  console.log(`[SEARCH] ${req.method} ${req.originalUrl}`);
  next();
}, searchRoutes);

app.use('/api/admin', (req, res, next) => {
  console.log(`[ADMIN] ${req.method} ${req.originalUrl}`);
  next();
}, adminRoutes);

// Root Health Check
app.get('/health', (_req: Request, res: Response) => {
  console.log(`[HEALTH] Health check endpoint called`);
  res.json({
    status: 'operational',
    cortex: 'active',
    version: '1.0.0-institutional'
  });
});

// Global error logging
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({ error: err.message });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`[SERVER] Echo Backend started on port ${PORT}`);
  console.log(`[SERVER] Node: Unit_Primary`);
});
