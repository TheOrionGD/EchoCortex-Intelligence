import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Cpu, 
  Network, 
  BrainCircuit, 
  Database, 
  Shield, 
  BookOpen, 
  Code, 
  Workflow, 
  Lock, 
  Terminal, 
  CheckCircle, 
  FileText,
  Search
} from 'lucide-react';

interface DocumentsProps {
  onBack: () => void;
  initialSection?: string;
}

type SectionKey = 
  | 'neural-ingestion' 
  | 'cognitive-extraction' 
  | 'conversational-recall' 
  | 'knowledge-graph' 
  | 'api-reference'
  | 'use-cases' 
  | 'read-docs' 
  | 'system-architecture' 
  | 'threat-model' 
  | 'governance-policy';

export const Documents: React.FC<DocumentsProps> = ({ onBack, initialSection }) => {
  const [activeSection, setActiveSection] = useState<SectionKey>(
    (initialSection as SectionKey) || 'neural-ingestion'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    {
      category: 'Product Suite',
      items: [
        { key: 'neural-ingestion', label: 'Neural Ingestion', icon: Cpu },
        { key: 'cognitive-extraction', label: 'Cognitive Extraction', icon: BrainCircuit },
        { key: 'conversational-recall', label: 'Conversational Recall', icon: Search },
        { key: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
        { key: 'api-reference', label: 'API Reference', icon: Code },
      ]
    },
    {
      category: 'Resources & Security',
      items: [
        { key: 'use-cases', label: 'View Use Cases', icon: Workflow },
        { key: 'read-docs', label: 'Read Documentation', icon: BookOpen },
        { key: 'system-architecture', label: 'System Architecture', icon: FileText },
        { key: 'threat-model', label: 'Threat Model', icon: Lock },
        { key: 'governance-policy', label: 'Governance Policy', icon: Shield },
      ]
    }
  ];

  // Helper to filter sections based on search query
  const filteredMenuItems = menuItems.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div 
      className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-transparent"
      style={{
        WebkitFontSmoothing: 'antialiased',
      }}
    >

      {/* Top Header Bar */}
      <header className="border-b border-white/5 bg-[#030511]/80 backdrop-blur-xl h-20 px-8 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#00FF41] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Gateway
          </button>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-3">
            <span className="text-white font-black tracking-[0.2em] text-lg uppercase">ECHO</span>
            <span className="text-[10px] font-mono uppercase bg-[#00FF41]/10 text-[#00FF41] px-2.5 py-1 rounded border border-[#00FF41]/20">SYSTEM DOCS v4.0</span>
          </div>
        </div>

        {/* Live System Uptime */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
          </span>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#00FF41]">NODE: ACTIVE</span>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex relative z-10">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-80 border-r border-white/5 bg-[#030511]/40 backdrop-blur-md p-6 flex flex-col gap-8 flex-shrink-0 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto no-scrollbar">
          
          {/* Live Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4.5 top-4" />
            <input 
              type="text" 
              placeholder="FILTER DOCUMENTATION..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-xs font-mono uppercase tracking-widest text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF41]/50 transition-colors"
            />
          </div>

          {/* Navigation Categories */}
          <div className="flex flex-col gap-8">
            {filteredMenuItems.map(cat => (
              <div key={cat.category} className="space-y-3.5">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 font-bold px-3">
                  {cat.category}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {cat.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveSection(item.key as SectionKey)}
                        className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-xl border text-left transition-all duration-300 ${
                          isActive 
                            ? 'border-[#00FF41]/30 bg-[#00FF41]/5 text-white font-bold shadow-[0_0_15px_rgba(0,255,65,0.05)]' 
                            : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#00FF41]' : 'text-zinc-500'}`} />
                        <span className="text-[11px] font-mono uppercase tracking-widest">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT PANEL */}
        <main className="flex-1 p-12 lg:p-20 overflow-y-auto h-[calc(100vh-5rem)] no-scrollbar">
          <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Neural Ingestion Content */}
            {activeSection === 'neural-ingestion' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00FF41]">
                    <Cpu className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Product Core Module</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Neural Ingestion Pipeline</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Convert transient voice artifacts, recorded call payloads, and raw text files into high-fidelity institutional memory. Powered by the OpenAI Whisper v3 model running over Hugging Face hardware, Echo ensures multi-speaker segment resolution and zero-loss transcription pipelines.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-white/8 bg-white/[0.02] rounded-2xl">
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-3">Multi-Speaker Diarization</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                      Echo's diarization algorithm segregates transcript segments automatically by checking acoustics boundaries, assigning distinct vector speaker IDs.
                    </p>
                  </div>
                  <div className="p-6 border border-white/8 bg-white/[0.02] rounded-2xl">
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-3">Real-time Capture queues</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                      Supports audio streaming chunks up to 100MB directly through client gateways. Audio is transcribed, chunked, and parsed in parallel under 10 seconds.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-8">
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm">Transcribe Configuration Parameters</h3>
                  <pre className="p-5 bg-black/60 border border-white/5 rounded-2xl text-xs font-mono text-[#00e5ff] overflow-x-auto">
{`{
  "model": "openai/whisper-large-v3",
  "language": "en",
  "temperature": 0.0,
  "chunk_length_s": 30,
  "stride_length_s": [5, 5],
  "return_timestamps": true
}`}
                  </pre>
                </div>
              </article>
            )}

            {/* Cognitive Extraction Content */}
            {activeSection === 'cognitive-extraction' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#8B5CF6]">
                    <BrainCircuit className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Product Core Module</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Cognitive Extraction</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Once voice transcriptions are settled, Echo triggers Groq Llama 3.1 8B reasoning matrices to isolate key strategic decisions, isolate committed tasks, extract specific operational owners, and map confidence scoring.
                  </p>
                </div>

                <div className="p-6 border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 rounded-2xl space-y-3">
                  <h3 className="text-[#8B5CF6] font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Zero-Guesswork Structured Extraction
                  </h3>
                  <p className="text-zinc-300 text-xs leading-relaxed font-mono">
                    Groq's sub-100ms inference time processes raw meeting text against strict JSON system schemas. The algorithm ensures all commitments are categorized with exact owners or defaults to systemic organizational holding IDs.
                  </p>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-8">
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm">Structured Output Schema</h3>
                  <pre className="p-5 bg-black/60 border border-white/5 rounded-2xl text-xs font-mono text-[#8B5CF6] overflow-x-auto">
{`interface CognitiveExtractionPayload {
  decisions: Array<{
    id: string;
    summary: string;
    confidence_score: number; // Range 0.0 - 1.0
  }>;
  action_items: Array<{
    id: string;
    owner: string;
    description: string;
    due_date?: string;
  }>;
}`}
                  </pre>
                </div>
              </article>
            )}

            {/* Conversational Recall Content */}
            {activeSection === 'conversational-recall' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00e5ff]">
                    <Search className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Product Core Module</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Conversational Recall</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Search your corporate database using semantic questions instead of simple keywords. Echo embeds search queries using MiniLM-L6-v2, computing Cosine Similarity scores against Mongoose-indexed dense vectors for sub-second recall.
                  </p>
                </div>

                <div className="p-6 border border-[#00e5ff]/20 bg-[#00e5ff]/5 rounded-2xl">
                  <h3 className="text-[#00e5ff] font-bold uppercase tracking-wider text-sm mb-2">384-Dimensional Space</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                    By embedding text into 384 distinct real-value dimensions, Echo captures synonym relationships, contextual intent, and underlying semantics, returning ranked match percentages.
                  </p>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-8">
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm">Recall Distance Evaluation</h3>
                  <pre className="p-5 bg-black/60 border border-white/5 rounded-2xl text-xs font-mono text-[#00e5ff] overflow-x-auto">
{`const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB);
};`}
                  </pre>
                </div>
              </article>
            )}

            {/* Knowledge Graph Content */}
            {activeSection === 'knowledge-graph' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00FF41]">
                    <Network className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Product Core Module</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Institutional Knowledge Graph</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Echo maps transient spoken records into an evergreen decentralized relational network. By treating meetings, users, decisions, and action items as interconnected graph nodes, the system lets you trace a single conceptual commit back to the exact conversational timestamp.
                  </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-8 bg-black/40 flex items-center justify-center">
                  {/* Mock Knowledge Graph Diagram */}
                  <div className="w-full max-w-md py-6 flex flex-col items-center gap-6">
                    <div className="px-5 py-2.5 rounded-lg border border-[#00FF41] bg-[#00FF41]/10 text-xs font-mono uppercase tracking-widest text-center">
                      Concept Node: Database Migration
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="px-4 py-2 rounded border border-[#8B5CF6] bg-[#8B5CF6]/10 text-[10px] font-mono uppercase">
                        Owner: Sarah Jenkins
                      </div>
                      <div className="px-4 py-2 rounded border border-[#00e5ff] bg-[#00e5ff]/10 text-[10px] font-mono uppercase">
                        Decision: Move to MongoDB Atlas
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gradient-to-b from-white/20 to-white/0" />
                    <div className="px-4 py-2 rounded border border-white/20 bg-white/5 text-[10px] font-mono uppercase text-[#A3A3A3]">
                      Transcript Segment: "Let's finalize database architecture..."
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* API Reference Content */}
            {activeSection === 'api-reference' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00e5ff]">
                    <Terminal className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Developer Specifications</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">API Reference Guide</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Connect and query your Echo core node from any external platform. All endpoints are fully JWT-secured and expect JSON payload structures.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#00FF41]/20 border border-[#00FF41]/30 rounded text-[#00FF41] text-[10px] font-mono uppercase font-bold">POST</span>
                      <span className="text-xs font-mono text-white tracking-widest">/api/meetings/ingest</span>
                    </div>
                    <p className="text-zinc-400 text-xs font-mono">Ingests base64 audio streams or report text payloads, triggering the 4-phase parsing pipeline.</p>
                  </div>

                  <div className="space-y-3 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 rounded text-[#8B5CF6] text-[10px] font-mono uppercase font-bold">POST</span>
                      <span className="text-xs font-mono text-white tracking-widest">/api/meetings/chat</span>
                    </div>
                    <p className="text-zinc-400 text-xs font-mono">Triggers Gemini context-aware conversations against transcribed meeting historical indexes.</p>
                  </div>
                </div>
              </article>
            )}

            {/* View Use Cases Content */}
            {activeSection === 'use-cases' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00FF41]">
                    <Workflow className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Enterprise Applications</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Operational Use Cases</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Discover how global organizations deploy Echo to streamline communication boundaries, capture structural consensus, and retain institutional alignment.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="p-8 border border-white/8 bg-white/[0.02] rounded-2xl space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm">Asynchronous Daily Syncs</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                      Teams record casual, short audio updates at start-of-day. Echo converts updates to categorized action items, automatically assigning due dates and owners without scheduling overhead.
                    </p>
                  </div>
                  <div className="p-8 border border-white/8 bg-white/[0.02] rounded-2xl space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-wider text-sm">Board Room Audit Trails</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                      Capture large-scale executive alignments. Echo provides fully overridable strategic decisions records with timestamped links back to exact transcribed audio segments.
                    </p>
                  </div>
                </div>
              </article>
            )}

            {/* Read Documentation Content */}
            {activeSection === 'read-docs' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#8B5CF6]">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Getting Started</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Deploying Your Echo Node</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Set up your system locally using our fully configured development environment. Echo integrates Supabase (metadata core) and MongoDB (conversational collection) systems.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm">Quick Setup Steps</h3>
                  <div className="space-y-4 font-mono text-xs">
                    <div className="p-5 bg-black/40 border border-white/5 rounded-xl space-y-2">
                      <div className="text-[#00FF41]">1. Clone and Initialize Dependencies</div>
                      <pre className="text-zinc-500">npm install</pre>
                    </div>
                    <div className="p-5 bg-black/40 border border-white/5 rounded-xl space-y-2">
                      <div className="text-[#00FF41]">2. Configure Environment Properties (.env)</div>
                      <pre className="text-zinc-500">{`MONGODB_URI=mongodb+srv://atlas-cluster
GEMINI_API_KEY=AIzaSy...`}</pre>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* System Architecture Content */}
            {activeSection === 'system-architecture' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00e5ff]">
                    <FileText className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">System Topography</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">System Architecture</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    A conceptual blueprint of Echo's multi-layered ingestion pipeline, illustrating real-time parsing from client gateways through database syncing and LLM reasoning blocks.
                  </p>
                </div>

                <div className="border border-white/10 rounded-2xl p-8 bg-black/40 space-y-6">
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm text-center">4-Phase Pipeline Ingestion Graph</h3>
                  <div className="flex flex-col gap-4 font-mono text-xs max-w-md mx-auto">
                    <div className="p-4 border border-[#00FF41]/30 bg-[#00FF41]/5 rounded text-center">
                      PHASE 1: Hugging Face Whisper v3 (STT Ingestion)
                    </div>
                    <div className="text-center text-zinc-600">↓</div>
                    <div className="p-4 border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 rounded text-center">
                      PHASE 2: MiniLM-L6-v2 (384-Dim Vector Embeds)
                    </div>
                    <div className="text-center text-zinc-600">↓</div>
                    <div className="p-4 border border-[#00e5ff]/30 bg-[#00e5ff]/5 rounded text-center">
                      PHASE 3: Hybrid Database Sync (MongoDB Atlas / In-Memory fallback)
                    </div>
                    <div className="text-center text-zinc-600">↓</div>
                    <div className="p-4 border border-white/15 bg-white/5 rounded text-center">
                      PHASE 4: Groq Llama 3.1 Inference (Structured extraction)
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Threat Model Content */}
            {activeSection === 'threat-model' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#8B5CF6]">
                    <Lock className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Security Posture</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Threat Analysis & Security</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Designed with enterprise security standards in mind, Echo operates within isolated runtime containers and enforces strict data boundary protection.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border border-white/8 bg-white/[0.02] rounded-2xl space-y-2">
                    <h4 className="text-white font-bold text-xs uppercase">Data Scrubbing</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">All audio streaming chunks are purged immediately after 4-phase pipeline parsing is resolved.</p>
                  </div>
                  <div className="p-6 border border-white/8 bg-white/[0.02] rounded-2xl space-y-2">
                    <h4 className="text-white font-bold text-xs uppercase">JWT Token Boundaries</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">User identity verification requires signed JWT authentication tokens across every vector search operation.</p>
                  </div>
                </div>
              </article>
            )}

            {/* Governance Policy Content */}
            {activeSection === 'governance-policy' && (
              <article className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#00FF41]">
                    <Shield className="w-5 h-5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Institutional Compliance</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">Data Governance Policy</h1>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Our compliance guidelines enforce strict database-only configuration practices with zero hardcoded credentials, preventing spoofing risks or tenant crossing.
                  </p>
                </div>

                <div className="p-6 border border-[#00FF41]/20 bg-[#00FF41]/5 rounded-2xl space-y-3">
                  <h3 className="text-[#00FF41] font-bold uppercase tracking-wider text-sm">Immutable Record Auditing</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-mono">
                    Decisions and action items extracted into MongoDB contain unique, irreversible timestamps. Any subsequent modification creates a permanent audit record, maintaining data accuracy.
                  </p>
                </div>
              </article>
            )}

          </div>
        </main>

      </div>
    </div>
  );
};

export default Documents;
