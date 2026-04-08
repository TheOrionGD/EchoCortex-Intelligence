# Echo Threat Model & Security

## Identified Risks

### 1. API Key Leakage
- **Threat**: The `API_KEY` for Gemini is exposed in the client-side environment.
- **Mitigation**: Keys are loaded via `process.env`. In production, a middleware proxy (Node.js backend) should handle all Gemini calls, keeping the key server-side.

### 2. Unauthorized Audio Capture
- **Threat**: Browser microphone access remains active after session end.
- **Mitigation**: `AudioRecorder.tsx` explicitly calls `track.stop()` on all tracks when `mediaRecorder.stop()` is triggered.

### 3. Data Integrity
- **Threat**: Artifacts could be deleted by unauthorized nodes.
- **Mitigation**: Implementation of `Admin.tsx` demonstrates a role-based access control (RBAC) model. Delete actions require "Admin" designation.

### 4. Model Hallucination
- **Threat**: Cortex extracts action items or decisions that were not actually made.
- **Mitigation**: Each decision includes a `confidence_score`. Segments include links to original audio timestamps for human verification.

## Privacy Notice
Audio artifacts processed by Echo are sent to Google Gemini for transient analysis. Organizations should ensure their API usage tier matches their privacy requirements (e.g., opting out of data training).