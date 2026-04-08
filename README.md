# Echo — Institutional Memory System

Echo is an AI-augmented **Automated Second Brain** designed for organizational endurance. It converts spoken sessions into a structured, queryable relational knowledge graph.

![Institutional Theme](https://img.shields.io/badge/Theme-Obsidian-black)
![Model](https://img.shields.io/badge/Cortex-Gemini%203%20Pro-blueviolet)

## 🧠 Core Concept

Echo treats conversational artifacts as data. It moves beyond simple transcription to extract **Intent**, **Commitments**, and **Decisions**, allowing teams to query their past with semantic precision.

## 🚀 Key Features

- **Neural Ingestion**: High-fidelity extraction using Gemini 3 Pro.
- **Truth Matrix**: A centralized repository of all institutional decisions.
- **Recall Engine**: Meaning-based semantic search across all stored artifacts.
- **Committed Nodes**: Automated action item tracking with ownership mapping.
- **Institutional Governance**: Full system architecture visibility and node provisioning.

## 🛠 Tech Stack

- **Frontend**: React 19 + Tailwind CSS + Lucide Icons.
- **Intelligence**: Google Gemini API (Cortex Engine).
- **Typography**: Inter (Sans) & JetBrains Mono (Institutional).
- **Environment**: ESM-native development with strict TypeScript.

## 📦 Directory Structure

```text
echo/
├── frontend/src/
│   ├── app/           # Main application logic
│   ├── components/    # Reusable UI (Audio, Search, Transcript)
│   ├── context/       # Auth & Team state
│   ├── pages/         # Route-level views (Dashboard, Search, Admin)
│   ├── services/      # Gemini API integration
│   └── types/         # Strict institutional data models
├── backend/           # (Prototype) Service architecture
└── docs/              # System specifications
```

## ⚙️ Setup & Installation

1. **Environment Configuration**:
   Ensure your `.env` file contains a valid Gemini API Key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

2. **Ingestion**:
   - Access the **Ingestion** tab.
   - Initialize a live stream or upload a pre-recorded artifact (WebM/MP3).
   - Wait for the **Cortex Pipeline** to finalize relational mapping.

3. **Retrieval**:
   - Use the **Recall Engine** to ask questions about past sessions (e.g., "What was the decision on the Q4 budget?").

## ⚖️ Governance & Security

Echo is built for institutional use. All administrative modifications are logged in a simulated immutable audit trail. Identity revocation propagates across the vector space within <100ms.

---
*Built for organizations that prioritize focus, endurance, and clarity.*