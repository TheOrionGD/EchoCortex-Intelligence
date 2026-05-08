# Echo — Institutional Memory System

[![Theme: Obsidian Stark](https://img.shields.io/badge/Theme-Obsidian%20Stark-black.svg?style=flat-square)](#design-system-and-aesthetics)
[![Engine: Echo Cortex](https://img.shields.io/badge/Cortex-Gemini%203%20Pro-blueviolet.svg?style=flat-square)](#intelligence-layer-echo-cortex)
[![STT: Hugging Face Whisper](https://img.shields.io/badge/STT-Whisper%20Large%20v3-orange.svg?style=flat-square)](#stt--embeddings-pipeline)
[![LLM: Groq Llama 3.1](https://img.shields.io/badge/LLM-Llama%203.1--8b-emerald.svg?style=flat-square)](#analysis-layer-groq)
[![Database: MongoDB & Supabase](https://img.shields.io/badge/Database-PostgreSQL%20%26%20MongoDB-cyan.svg?style=flat-square)](#hybrid-storage-layer)
[![Build Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen.svg?style=flat-square)](#production-deployment)

Echo is an enterprise-grade **Decentralized Intelligence Platform** and **Automated Second Brain** designed for long-term organizational endurance. It ingests spoken sessions, files, and text reports, converting them into a structured, queryable relational knowledge graph.

---

## 🧠 Core Concept

In modern organizations, transient conversational artifacts (meetings, verbal synchronizations, huddles) are lost immediately after termination. Echo treats conversational sessions as high-value data. It moves beyond raw, linear transcription to extract:
*   **Structured Chronological Segments**: Timestamps mapped to validated speaker nodes.
*   **Actionable Commitments (Tactical Objectives)**: Clear tasks linked to owners with status tracking.
*   **Strategic Decisions (Truth Matrix)**: Immutable outcomes with confidence scores and contextual links.
*   **Semantic Vector Space**: A multi-dimensional embedding space enabling real-time conversational recall.

---

## 🏗️ Enterprise Strategic Suite Modules

Echo includes five high-leverage strategic management modules for advanced institutional intelligence and lifecycle governance, styled under the premium **Obsidian Stark** aesthetic:

### 1. Strategic Analytics (Enterprise Dashboard)
Tracks corporate growth, department velocities, and decision keyword metrics in real-time.
*   **KPI Sparkline Cards**: Custom SVG line graphs showing Institutional IQ and Knowledge Velocity trends.
*   **Departmental Ribbon Chart**: Visualizes Knowledge Velocity rank-over-time across multiple corporate divisions.
*   **Goal Decomposition Tree**: Collapsible nested visualizer drilling down from Corporate Goals into specific active team sessions.
*   **Transcript Word Cloud**: Interactive word grid rendering extracted transcript keywords with hover scale micro-animations.
*   **Operational Onboarding Handbook**: High-leverage, step-by-step cryptographic dashboard cards outlining local audio ingestion, Whisper speech transcription, Truth Matrix query, and Compliance Vault retention workflows.
*   **Premium Split-Screen Login & Registration**: Clean dual-panel gateway featuring high-fidelity neural lattice network backdrop, active clock timezone widget, floating core-sector modules, and refined name/mailid/password/avatar-link creation inputs.
*   **Local Favicon Branding**: Native `/logo.png` image serving as website browser tab favicon and animated sidebar rotating token.

### 2. Delta Audit (Selective Session Comparison)
Compares two ingested sessions side-by-side to track action item execution and clarity upgrades.
*   **Clustered Column Chart**: Renders side-by-side comparative column graphs for action item outputs and decision confidence levels.
*   **Decision Slope Chart**: Maps the progressive evolution of decisions from Low to High confidence states.
*   **Target Progress Bullet Chart**: Measures current execution progress against historical session baselines.
*   **AI Smart Narrative**: Auto-generates structured comparative insights using live meeting transcripts.

### 3. Entity Graph (Neural Directory)
Maps organizational networks, active conversational speaker footprints, and collective skill matrixes.
*   **Network Navigator Canvas**: Rendered via custom HTML5 Canvas, allowing interactive node highlighting of speakers and team nodes.
*   **Information Flow Sankey Chart**: Visualizes the pathway of raw audio segments flowing into structured decisions.
*   **Expertise Mapping Heatmap**: Cell grids mapping team members against specific skills with high-contrast conditional gradient backgrounds.

### 4. Compliance Vault (The Vault)
Advanced governance deck managing data lifecycles, auditability, and pipeline loads.
*   **Artifact Lifecycle Gantt Chart**: Traces retention stages (Created -> Audited -> Archived) of meeting assets.
*   **Decision Ingest Waterfall Chart**: Illustrates base segments adjusted by action items and decisions to reach final Immutable Logs.
*   **Telemetry Gauges**: Radial dial indicators monitoring real-time load capacities on Groq and Hugging Face pipelines.
*   **AI Morality Alignment Principles**: Hardcoded compliance controls covering human-in-the-loop, fairness, and right-to-forget protocols.
*   **Immutable Cryptographic Ledger**: Transparent table tracking operations and SHA-256 cryptographic origin proofs.

### 5. Synapse Hub (External Connectors & Support)
Decoupled system endpoints for external synchronization and executive administrative support.
*   **Atlassian Jira Issues**: Backlog synchronizations for development action items.
*   **Slack Channels**: Real-time push streams of decisions to project feeds.
*   **Support Node (Contact Admin)**: Instant link targeting `godfrey.prof@gmail.com` with glowing neon micro-animations.

---

## 🌌 System Architecture Overview

Echo is built with a decoupled, high-performance architecture separating multi-modal ingestion, structured data extraction, semantic search vectorization, and premium interface rendering.

```mermaid
graph TD
    A[Client UI: React 19] -->|Base64 Audio / Text Report| B[Express API Gateway: Port 2348]
    B -->|Pipeline Trigger| C[Echo Cortex Pipeline]
    
    subgraph Ingestion Pipeline
        C -->|1. Raw Audio WebM| D[Hugging Face: Whisper Large v3 STT]
        D -->|2. Refined Transcript| E[Hugging Face: Sentence Transformers Embedding]
        C -->|3. Transcript + Prompt| F[Groq LLM: Llama-3.1-8b-instant Analysis]
    end
    
    subgraph Storage Layer
        B -->|Mongoose Handshake| G[(MongoDB Atlas Cluster)]
        B -->|PostgreSQL Mock / Pool| H[(Supabase PostgreSQL Database)]
        G -.->|Fallback if Offline| I[[Local In-Memory Storage]]
    end
    
    subgraph Recall Layer
        A -->|Chat Query / Vector Query| J[Gemini 3 Flash LLM]
        J -->|Contextual Response| A
    end
```

---

## 🛠 Tech Stack & Core Dependencies

### Frontend Architecture (Client-Side)
*   **Core Framework**: React 19 (Strict Mode, ESM-native development).
*   **Design Tokens**: Vanilla CSS with Stark-Obsidian typography (Inter & JetBrains Mono).
*   **Icons & Vector Graphics**: Lucide Icons.
*   **3D Elements**: Three.js (via Scene3D visualizers).
*   **State Management**: Context-driven architecture ([AuthContext](file:///e:/echo/Echo/context/AuthContext.tsx) & [TeamContext](file:///e:/echo/Echo/context/TeamContext.tsx)).

### Backend Architecture (Cortex Server)
*   **Runtime Environment**: Node.js v18+ with `ts-node-dev` live transpiling.
*   **Server Framework**: Express.js with full CORS and pre-flight handling.
*   **Database ODM**: Mongoose v8.x connecting to MongoDB Atlas.
*   **Database Client**: Supabase Client (PostgreSQL integration with pgvector).
*   **AI SDKs**: `@google/genai` (Google Gemini SDK) for conversational recall.

---

## 🧬 End-to-End Ingestion Pipeline

When an audio file or text report is pushed to `/api/meetings/ingest`, the server triggers a 4-phase synchronization pipeline:

```
[Audio Ingestion] ────────> [Phase 1: Whisper STT] ────────> [Phase 2: Sentence Transformers Embed]
                                                                          │
[Text Ingestion]  ────────────────────────────────────────────────────────┘
                                      │
                                      ▼
[Phase 4: Groq Llama-3.1] <── [Phase 3: Database Sync]
          │
          ▼
   [Unified JSON Output]
   * Chronological Segments
   * Tactical Action Items
   * Strategic Decisions
```

### Phase 1: Hugging Face Speech-to-Text (STT)
Raw audio recorded by [AudioRecorder.tsx](file:///e:/echo/Echo/components/audio/AudioRecorder.tsx) is captured as `audio/webm` via the browser-native `MediaRecorder` API, serialized to a `Base64` string, and pushed to the backend. The backend deserializes it into a buffer and executes an inference call to **OpenAI Whisper Large v3** hosted on Hugging Face:
*   **Model Endpoint**: `https://api-inference.huggingface.co/models/openai/whisper-large-v3`
*   **Role**: Converts raw voice waveforms into written chronological transcripts.

### Phase 2: Hugging Face Sentence Transformers (Embeddings)
The transcript text is dispatched to **Sentence Transformers (all-MiniLM-L6-v2)** to calculate a 384-dimensional dense floating-point vector. This embedding captures the complete semantic intent of the meeting.
*   **Model Endpoint**: `https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2`
*   **Role**: Vectorizes text for semantic searches, similarity analysis, and context injection.

### Phase 3: Hybrid Database Sync (MongoDB / Local Fallback)
The server analyzes the active database state. If `isMongoConnected` is true, the record is immediately committed to MongoDB Atlas under the `Meeting` schema. If offline or in an isolated environment, it gracefully commits to a volatile, memory-mapped storage array (`inMemoryMeetings`) using a safe custom ID (`m-Date.now()`).

### Phase 4: Groq Conversational Intelligence
The chronological transcript is sent alongside an institutional prompt instruction to **Llama 3.1 8B Instant** on Groq to perform rapid information extraction.
*   **Model Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
*   **Response Schema Enforced**: Strict JSON Mode containing `segments`, `actionItems`, and `decisions`.

---

## 📡 API Reference Specifications

The Express backend runs on port `2348` (configurable via `.env`).

### 1. Ingest Meeting Audio / Report
*   **Endpoint**: `POST /api/meetings/ingest`
*   **Headers**: `Content-Type: application/json`
*   **Request Body (Audio)**:
    ```json
    {
      "audio": "UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA...",
      "mimeType": "audio/webm"
    }
    ```
*   **Request Body (Report Override)**:
    ```json
    {
      "report": "Sarah: Let's finalize the database architecture. Dave: I recommend moving to MongoDB Atlas."
    }
    ```
*   **Response (HTTP 211 / 201 Created)**:
    ```json
    {
      "message": "Artifact committed to Echo knowledge graph",
      "artifactId": "69fde7068fd6745695003518",
      "data": {
        "segments": [
          { "speaker": "Sarah", "text": "Let's finalize the database architecture." },
          { "speaker": "Dave", "text": "I recommend moving to MongoDB Atlas." }
        ],
        "actionItems": [
          { "description": "Migrate database architecture to MongoDB Atlas", "owner": "Dave" }
        ],
        "decisions": [
          { "summary": "Migrate database architecture to MongoDB Atlas" }
        ]
      }
    }
    ```

### 2. Chat with Gemini Cortex
*   **Endpoint**: `POST /api/meetings/chat`
*   **Request Body**:
    ```json
    {
      "meetingId": "69fde7068fd6745695003518",
      "query": "Who is tasked with migrating the database?"
    }
    ```
*   **Response (HTTP 200 OK)**:
    ```json
    {
      "reply": "According to the transcript, Dave recommended migrating to MongoDB Atlas, and the action item was assigned to him."
    }
    ```

### 3. Retrieve All Meetings
*   **Endpoint**: `GET /api/meetings`
*   **Response (HTTP 200 OK)**:
    ```json
    [
      {
        "_id": "69fde7068fd6745695003518",
        "title": "SaaS Architecture Review",
        "transcript": "...",
        "segments": [...],
        "actionItems": [...],
        "decisions": [...],
        "createdAt": "2026-05-08T13:33:29.009Z"
      }
    ]
    ```

### 4. Delete Meeting
*   **Endpoint**: `DELETE /api/meetings/:id`
*   **Response (HTTP 204 No Content)**

---

## 🎛️ Setup, Configuration & Installation

Follow these steps to configure both backend and frontend servers.

### 1. Pre-requisites
*   **Node.js**: v18.0.0 or higher
*   **NPM**: v9.0.0 or higher
*   **MongoDB Cluster**: A running MongoDB Atlas instance (or a local MongoDB installation).
*   **Supabase (Optional)**: A running PostgreSQL database with Supabase access.

### 2. Clone and Install Dependencies
Navigate to the root workspace directory and install dependencies:
```bash
# Clone the repository
git clone https://github.com/your-org/echo.git
cd echo

# Install Root and Frontend Dependencies
npm install

# Install Backend Dependencies
cd backend
npm install
cd ..
```

### 3. Environment Variables Configuration
Create a `.env` file in the **root** folder `e:\echo\Echo\.env` with the following schema:
```env
# Server Configuration
PORT=2348

# Database Connection URLs
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.m78vuqq.mongodb.net/echo_db?retryWrites=true&w=majority&appName=Cluster0
DATABASE_URL=postgresql://postgres:<password>@db.supabase.co:5432/postgres

# Hugging Face Inference Tokens (Whisper + Sentence Transformers)
HF_TOKEN=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

# LLM Ingestion Layer API Tokens
GROQ_API_LLM=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
GROQ_MODEL=llama-3.1-8b-instant

# Gemini Conversational Recall Engine Token
GEMINI_API_LLM=AIzaSyAYfihj4mgecCfidY1gchpicFf1zkVeM5Y
VITE_API_KEY=AIzaSyAYfihj4mgecCfidY1gchpicFf1zkVeM5Y
VITE_API_URL=http://localhost:2348
```

### 4. Executing Database Migrations
If using Supabase PostgreSQL, open the Supabase SQL editor and execute the following query to initialize the required tables:
```sql
-- Create Core Firebase Config table
CREATE TABLE firebase_config (
  id SERIAL PRIMARY KEY,
  api_key VARCHAR(500) NOT NULL,
  auth_domain VARCHAR(255) NOT NULL,
  project_id VARCHAR(255) NOT NULL,
  storage_bucket VARCHAR(255) NOT NULL,
  messaging_sender_id VARCHAR(255) NOT NULL,
  app_id VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Seed with current Firebase instance config
INSERT INTO firebase_config (
  api_key, auth_domain, project_id, storage_bucket, messaging_sender_id, app_id, active
) VALUES (
  'AIzaSyB8b...', 'echo-institutional.firebaseapp.com', 'echo-institutional', 
  'echo-institutional.appspot.com', '402414766279', '1:402414766279:web:2ea3f7b453', true
);
```

### 5. Running the System Locally

Echo provides a preconfigured launching utility `launch_echo.bat` in the root workspace folder to launch both frontend and backend concurrently.

Alternatively, execute the dev servers using npm scripts:
```bash
# Start Backend Express API (Runs on http://localhost:2348)
cd backend
npm run dev

# Start Frontend Vite Server (Runs on http://localhost:5173)
cd ..
npm run dev
```

---

## ⚖️ Database-Only Policy & Resiliency Enforcements

Echo implements a strict **Database-Only Configuration Policy** (see [DATABASE_ONLY_POLICY.md](file:///e:/echo/Echo/docs/DATABASE_ONLY_POLICY.md)) designed to operate safely in volatile network states.

### Graceful Fallbacks & ObjectId Safety
1.  **Defensive MongoDB Mongoose Validation**: All API lookups on meeting resources (such as [meetings.controller.ts](file:///e:/echo/Echo/backend/src/controllers/meetings.controller.ts)) utilize explicit `mongoose.Types.ObjectId.isValid(id)` checks. If an ID format is custom-generated during an offline state (e.g., `"m-1778247035547"`), the server bypasses MongoDB and directly scans the local volatile storage `inMemoryMeetings` to prevent `CastError` exceptions.
2.  **Unified Synchronization**: If MongoDB is connected, the backend automatically merges live database results with volatile in-memory results, filtering out duplicate primary keys. This ensures absolute visibility of all transcripts regardless of database connectivity transitions.
3.  **No Mock Fallback Data**: In alignment with enterprise compliance, the system has removed all hardcoded placeholder data. If the database is completely offline and no local records are present, the application throws explicit network errors rather than serving stale dummy mock payloads.

---

## 🎨 Design System & Aesthetics

Echo uses a custom high-contrast visual interface called the **Obsidian Stark** design system (detailed in [ui-guidelines.md](file:///e:/echo/Echo/docs/ui-guidelines.md)), featuring:
*   **Obsidian Dark Mode**: Dominant deep black backgrounds (`#050505`) to minimize eye strain during long-form analytical reading sessions.
*   **Stark Typography**: Pristine sans-serif `Inter` for layout text paired with high-legibility `JetBrains Mono` for code blocks, transcript logs, and telemetry details.
*   **Active Micro-Animations**: Interactive hover states and state-based transitions designed to enhance spatial awareness within complex meeting detail structures.
*   **Signal Aesthetics**: Vibrant neon green elements indicating system health, pairing with deep muted violet highlighting for active conversational focus points.

---

## 🔬 Running System Endpoints Test Suite

To ensure your system variables are configured correctly and that all endpoints can securely authenticate and process conversational streams, execute our integrated test suite:
```bash
# Execute endpoints suite
node Echo/test_endpoints.js
```
The test suite performs the following assertions:
*   **Assertion 1**: Verifies `GET /health` returns operational server status.
*   **Assertion 2**: Resolves authentication handshake via `POST /api/auth/login` (with automatic fallback registration).
*   **Assertion 3**: Fetches all institutional meetings via `GET /api/meetings`.
*   **Assertion 4**: Performs audio ingestion test with mock base64 WebM buffers via `POST /api/meetings/ingest`.
*   **Assertion 5**: Assert Conversational Gemini recall on ingested session via `POST /api/meetings/chat`.
*   **Assertion 6**: Validates dense vector similarity ranking via `POST /api/search`.

---

*Built for organizations that prioritize focus, endurance, and clarity.*