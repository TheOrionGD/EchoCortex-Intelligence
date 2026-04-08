import { Request, Response } from 'express';
import { ExtractionService } from '../services/extraction.service';

const extractionService = new ExtractionService();

export class MeetingsController {
  /**
   * Get all meetings
   */
  async getAll(req: Request, res: Response) {
    console.log(`[MEETINGS] GET /api/meetings - Request from ${req.ip}`);
    // Here, normally fetch from DB
    const meetings = [
      { id: 1, title: "Project Kickoff", uploadedBy: "Alice", timestamp: Date.now() },
      { id: 2, title: "Sprint Review", uploadedBy: "Bob", timestamp: Date.now() }
    ];
    console.log(`[MEETINGS] Returning ${meetings.length} meetings`);
    res.json(meetings);
  }

  /**
   * Ingest a new meeting
   */
  async ingest(req: Request, res: Response) {
    const user = req.body.user || 'unknown';
    console.log(`[MEETINGS] POST /api/meetings - Ingest request`);
    console.log(`           User: ${user}`);
    console.log(`           Audio size: ${req.body.audio ? req.body.audio.length : 0} bytes`);
    console.log(`           MIME Type: ${req.body.mimeType || 'unknown'}`);

    try {
      const intelligence = await extractionService.extractIntelligence(req.body.audio, req.body.mimeType);
      const artifactId = Date.now();
      console.log(`[MEETINGS] Artifact committed to knowledge graph with ID: ${artifactId}`);

      res.status(201).json({ 
        message: 'Artifact committed to knowledge graph',
        artifactId,
        data: intelligence 
      });
    } catch (error) {
      console.error(`[MEETINGS] CORTEX_FAILURE: Relational mapping failed`, error);
      res.status(500).json({ error: 'CORTEX_FAILURE: Relational mapping failed.' });
    }
  }

  /**
   * Get a single meeting by ID
   */
  async getOne(req: Request, res: Response) {
    console.log(`[MEETINGS] GET /api/meetings/${req.params.id} - Request from ${req.ip}`);
    res.json({ id: req.params.id });
  }

  /**
   * Delete a meeting (purge)
   */
  async purge(req: Request, res: Response) {
    console.log(`[MEETINGS] DELETE /api/meetings/${req.params.id} - Purge request from ${req.ip}`);
    res.status(204).send();
  }
}
