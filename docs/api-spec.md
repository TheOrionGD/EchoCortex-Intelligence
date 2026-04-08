# API Specification - Echo Cortex

## Intelligence Extraction (Gemini 3 Pro)
**Method**: `ai.models.generateContent`
**Input**: `InlineData` (Audio Base64) + Text Prompt.
**Response Schema**:
```json
{
  "segments": [
    { "speaker": "string", "text": "string", "start_time": "number", "end_time": "number" }
  ],
  "action_items": [
    { "description": "string", "owner": "string", "source_segment_index": "number" }
  ],
  "decisions": [
    { "summary": "string", "confidence_score": "number", "source_segment_index": "number" }
  ]
}
```

## Semantic Recall (Gemini 3 Flash)
**Method**: `ai.models.generateContent`
**Input**: Text query + JSON-stringified segments.
**Response Schema**:
```json
{
  "results": [
    { "meetingId": "string", "segmentId": "string", "score": "number" }
  ]
}
```

## Backend Endpoints (Mock/Prototype)
- `GET /api/v1/meetings`: Retrieve institutional repository.
- `POST /api/v1/meetings/ingest`: Commit audio for extraction.
- `GET /api/v1/search`: Execute semantic recall.
- `GET /api/v1/admin/health`: Monitor Cortex pipeline status.