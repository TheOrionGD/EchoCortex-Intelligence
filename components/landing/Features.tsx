import React from 'react';
import { Mic, Target, Search, Database, Activity, Shield } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent?: 'green' | 'violet' | 'cyan';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, accent = 'cyan', delay = 0 }) => {
  const accentMap: Record<'green' | 'violet' | 'cyan', { border: string; shadow: string; icon: string; bg: string; glow: string }> = {
    green: {
      border: 'hover:border-[#00FF41]/40',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,255,65,0.1)]',
      icon: 'text-[#00FF41]',
      bg: 'group-hover:bg-[#00FF41]/5',
      glow: 'bg-[#00FF41]/10',
    },
    violet: {
      border: 'hover:border-[#8B5CF6]/40',
      shadow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]',
      icon: 'text-[#8B5CF6]',
      bg: 'group-hover:bg-[#8B5CF6]/5',
      glow: 'bg-[#8B5CF6]/10',
    },
    cyan: {
      border: 'hover:border-[#00e5ff]/40',
      shadow: 'hover:shadow-[0_0_30px_rgba(0,229,255,0.1)]',
      icon: 'text-[#00e5ff]',
      bg: 'group-hover:bg-[#00e5ff]/5',
      glow: 'bg-[#00e5ff]/10',
    },
  };
  const a = accentMap[accent];

  return (
    <div
      className={`
        group relative p-10 border border-white/8 rounded-2xl
        bg-white/[0.02] backdrop-blur-sm
        ${a.border} ${a.shadow} ${a.bg}
        transition-all duration-500 overflow-hidden cursor-default
        animate-in fade-in slide-in-from-bottom-6 duration-700
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Corner glow on hover */}
      <div className={`absolute top-0 right-0 w-40 h-40 ${a.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2`} />

      {/* Icon */}
      <div className={`w-14 h-14 mb-8 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 ${a.icon} group-hover:scale-110 group-hover:border-current/30 transition-all duration-500`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3
        className="text-white font-black uppercase tracking-tight text-xl mb-4"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {title}
      </h3>
      <p className="text-[#A3A3A3] text-sm leading-relaxed">{description}</p>

      {/* Bottom status line */}
      <div className={`mt-8 flex items-center gap-2 ${a.icon} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
        <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
        <span className="text-[9px] font-mono uppercase tracking-[0.35em]">Module Active</span>
      </div>
    </div>
  );
};

// ── Pipeline Step for the Architecture section ────────────────────────────────
const PipelineStep: React.FC<{ step: number; label: string; detail: string; active?: boolean }> = ({ step, label, detail, active }) => (
  <div className={`flex items-start gap-5 p-6 rounded-xl border transition-all duration-300 ${
    active
      ? 'border-[#00FF41]/30 bg-[#00FF41]/5'
      : 'border-white/8 bg-white/[0.02] hover:border-white/15'
  }`}>
    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ${
      active ? 'bg-[#00FF41] text-black' : 'bg-white/10 text-white'
    }`}>
      {step}
    </div>
    <div>
      <div className="text-white font-bold text-sm uppercase tracking-wider mb-1">{label}</div>
      <div className="text-[#A3A3A3] text-xs font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{detail}</div>
    </div>
  </div>
);

export const Features: React.FC = () => {
  return (
    <>
      {/* ── Feature Cards Section ── */}
      <section
        id="features"
        className="relative py-40 px-6 bg-transparent"
      >
        {/* Section glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 mb-8 backdrop-blur-sm">
              <Activity className="w-3.5 h-3.5 text-[#00FF41]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.45em] text-[#A3A3A3]">Core Cognitive Modules</span>
            </div>
            <h2
              className="text-5xl font-black uppercase tracking-tight text-white leading-tight mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              The Full Intelligence
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#00e5ff]">
                Stack
              </span>
            </h2>
            <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto">
              Every layer of the Echo platform works in concert to transform raw audio and text into a persistent, queryable institutional knowledge graph.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            <FeatureCard
              icon={Mic}
              title="Neural Ingestion"
              description="Convert live audio streams and text reports into high-fidelity structured transcript segments via Hugging Face Whisper Large v3 — multi-speaker, real-time, zero-loss."
              accent="green"
              delay={0}
            />
            <FeatureCard
              icon={Target}
              title="Cognitive Extraction"
              description="Leverage Groq Llama 3.1 8B Instant reasoning to map tactical action items, assign ownership, and capture strategic decisions with confidence scoring."
              accent="violet"
              delay={100}
            />
            <FeatureCard
              icon={Search}
              title="Conversational Recall"
              description="Query institutional memory using Gemini 3 Flash semantic indexing. Ask natural language questions and receive context-aware answers backed by vector similarity."
              accent="cyan"
              delay={200}
            />
          </div>

          {/* Second row features */}
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Database}
              title="Hybrid Storage"
              description="MongoDB Atlas with graceful in-memory fallback. Zero data loss during connectivity transitions. All records synchronized with full ObjectId safety."
              accent="green"
              delay={300}
            />
            <FeatureCard
              icon={Shield}
              title="Institutional Governance"
              description="Database-only config policy with no mock data fallback. All access credentials fetched from live database. Audit-ready, production-grade security posture."
              accent="violet"
              delay={400}
            />
            <FeatureCard
              icon={Activity}
              title="384-Dim Vector Space"
              description="Sentence Transformers all-MiniLM-L6-v2 embeds every segment into a 384-dimensional dense vector for high-precision semantic similarity ranking."
              accent="cyan"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ── 4-Phase Pipeline Architecture Section ── */}
      <section
        className="relative py-32 px-6 bg-transparent"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-black uppercase tracking-tight text-white mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              The{' '}
              <span className="text-[#00FF41]">4-Phase</span>
              {' '}Ingestion Pipeline
            </h2>
            <p className="text-[#A3A3A3]">
              From raw audio to fully indexed institutional intelligence in under 10 seconds.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <PipelineStep
              step={1}
              label="Hugging Face STT"
              detail="openai/whisper-large-v3 → raw transcript"
              active
            />
            <PipelineStep
              step={2}
              label="Sentence Embeddings"
              detail="all-MiniLM-L6-v2 → 384-dim vector"
            />
            <PipelineStep
              step={3}
              label="Hybrid DB Sync"
              detail="MongoDB Atlas ↔ in-memory fallback"
              active
            />
            <PipelineStep
              step={4}
              label="Groq LLM Extraction"
              detail="llama-3.1-8b-instant → JSON segments, tasks, decisions"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;