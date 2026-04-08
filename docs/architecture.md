# Echo System Architecture

## Overview
Echo is a decentralized intelligence platform designed to convert transient conversational artifacts into persistent institutional memory. It leverages the **Gemini 3 series** for high-fidelity reasoning and extraction.

## Core Layers

### 1. Presentation Layer (React 19)
- **State Management**: Context-based (Auth, Team) for global synchronization.
- **Routing**: View-state driven architecture for rapid context switching between Repository, Ingestion, and Search views.
- **Theming**: "Obsidian/Stark" high-contrast design system optimized for long-form data analysis.

### 2. Intelligence Layer (Echo Cortex)
- **Extraction Engine**: Powered by `gemini-3-pro-preview`. Performs multi-modal analysis on raw audio to extract structured JSON (Segments, Action Items, Decisions).
- **Recall Engine**: Powered by `gemini-3-flash-preview`. Executes semantic similarity queries over the institutional vector space.

### 3. Ingestion Pipeline
- **Capture**: Browser-native `MediaRecorder` API (audio/webm).
- **Transformation**: PCM/WebM to Base64 serialization for Cortex ingestion.
- **Refining**: Post-extraction relational mapping (linking action items to transcript nodes).

### 4. Storage (Conceptual)
- **Relational Memory**: PostgreSQL for structured artifacts.
- **Vector Space**: `pgvector` for storing and querying transcript embeddings.
- **Artifacts**: Firebase Storage for raw audio preservation.