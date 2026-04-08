# Echo Data Flow Analysis

## Ingestion Workflow
1. **Audio Capture**: User initiates a stream. `AudioRecorder.tsx` captures raw chunks via `MediaRecorder`.
2. **Commit**: On termination, chunks are bloated into a single `Blob`, converted to `Base64`.
3. **Cortex Ingestion**: `geminiService.ts` sends Base64 payload + System Instructions to Gemini 3 Pro.
4. **Relational Mapping**: Cortex returns a JSON object containing:
    - `segments`: Chronological text nodes with timestamps.
    - `action_items`: Tasks mapped to `segments` via index.
    - `decisions`: Outcomes with confidence scores.
5. **State Hydration**: The app updates the `meetings` state, triggering a UI re-render in the Repository.

## Recall Workflow
1. **Query Entry**: User enters a semantic intent (e.g., "What was decided about the budget?").
2. **Contextual Retrieval**: App flattens all `segments` into a temporary "Vector Space".
3. **Semantic Analysis**: Gemini 3 Flash compares query intent against segments.
4. **Result Ranking**: Cortex returns segment IDs and similarity scores.
5. **Reconstruction**: App renders `SearchResultItem.tsx` components with deep links to the original transcript.