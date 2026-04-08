
import express from 'express';
import cors from 'cors';
import meetingsRoutes from '../routes/meetings.routes';
import searchRoutes from '../routes/search.routes';
import adminRoutes from '../routes/admin.routes';
import transcriptRoutes from '../routes/transcript.routes';

const app = express();

app.use(cors());
// Cast express.json() to any to bypass type mismatch between connect and express types
app.use(express.json({ limit: '100mb' }) as any);

// Service endpoints
app.use('/api/v1/meetings', meetingsRoutes);
app.use('/api/v1/transcripts', transcriptRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/status', (req, res) => {
  res.json({ 
    service: 'Echo Institutional Memory', 
    status: 'ONLINE', 
    timestamp: new Date().toISOString() 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[ECHO-CORE] Intelligence pipeline active on port ${PORT}`);
});

export default app;
