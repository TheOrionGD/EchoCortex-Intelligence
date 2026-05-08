import React from 'react';
import { ArrowRight, Cpu, Network, BrainCircuit } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

// ─── Tech Stack Badge ─────────────────────────────────────────────────────────
const TechBadge: React.FC<{ label: string; accent?: boolean; violet?: boolean }> = ({
  label, accent, violet
}) => (
  <div
    className={`
      flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-mono uppercase tracking-[0.25em]
      backdrop-blur-md transition-all duration-300 hover:scale-105
      ${accent
        ? 'border-[#00FF41]/40 text-[#00FF41] bg-[#00FF41]/5 hover:border-[#00FF41]/70 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]'
        : violet
        ? 'border-[#8B5CF6]/40 text-[#8B5CF6] bg-[#8B5CF6]/5 hover:border-[#8B5CF6]/70 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]'
        : 'border-white/15 text-[#A3A3A3] bg-white/5 hover:border-white/30 hover:text-white'
      }
    `}
  >
    {label}
  </div>
);

// ─── Main Hero Section ────────────────────────────────────────────────────────
export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* ── Deep Space Content-Specific Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#8B5CF6]/4 rounded-full blur-[180px]" />
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-[#00FF41]/3 rounded-full blur-[160px]" />
      </div>

      {/* ── Telemetry Corner Data (JetBrains Mono) ── */}
      <div className="absolute top-28 left-8 text-[9px] text-white/10 font-mono leading-6 pointer-events-none hidden xl:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <div>NODE_ID :: UNIT_PRIMARY</div>
        <div>MONGODB_URI :: atlas.cluster0</div>
        <div>PIPELINE :: 4-PHASE ACTIVE</div>
        <div>HF_WHISPER :: LARGE-V3</div>
        <div>GROQ_MODEL :: llama-3.1-8b</div>
        <div>GEMINI :: 3-FLASH-PREVIEW</div>
        <div>UPTIME :: 99.9%</div>
      </div>
      <div className="absolute top-28 right-8 text-right text-[9px] text-white/10 font-mono leading-6 pointer-events-none hidden xl:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <div>VECTOR_DIM :: 384</div>
        <div>EMBED_MODEL :: MiniLM-L6-v2</div>
        <div>PORT :: 2348 ACTIVE</div>
        <div>MEETINGS_INDEXED :: ████</div>
        <div>SEMANTIC_RECALL :: ONLINE</div>
        <div>AUTH_METHOD :: MongoDB JWT</div>
        <div>STATUS :: OPERATIONAL</div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-10 pt-32 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">

        {/* Infrastructure partners capsule */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-inner">
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#A3A3A3]">
              Powered by Infrastructure Partners
            </span>
            <div className="flex items-center gap-3">
              {/* CPU Icon */}
              <div className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/5">
                <Cpu className="w-4 h-4 text-[#00FF41]" />
              </div>
              {/* Data Pipeline Icon */}
              <div className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/5">
                <Network className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              {/* Brain / Cortex */}
              <div className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 bg-white/5">
                <BrainCircuit className="w-4 h-4 text-[#00e5ff]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className="text-[clamp(2.8rem,7vw,6rem)] font-black uppercase tracking-tight text-white leading-[1.05]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Echo: Your Institutional
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] via-[#00e5ff] to-[#8B5CF6]">
            Intelligence Hub
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg text-[#A3A3A3] max-w-2xl leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Transforming transient conversations into a structured, queryable relational knowledge graph.
          Capture commitments, extract strategic decisions, and query your institutional memory with semantic precision.
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TechBadge label="Gemini 3 Pro" violet />
          <TechBadge label="Whisper v3" accent />
          <TechBadge label="Llama 3.1" violet />
          <TechBadge label="MongoDB" accent />
          <TechBadge label="Supabase" />
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* PRIMARY — Neon Green pulsing intelligence button */}
          <button
            id="cta-launch"
            onClick={() => onNavigate('/login')}
            className="relative group px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-300"
            style={{
              background: '#00FF41',
              color: '#000',
              boxShadow: '0 0 30px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.25), 0 0 100px rgba(0,255,65,0.1)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 0 40px rgba(0,255,65,0.7), 0 0 80px rgba(0,255,65,0.4), 0 0 120px rgba(0,255,65,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 0 30px rgba(0,255,65,0.5), 0 0 60px rgba(0,255,65,0.25), 0 0 100px rgba(0,255,65,0.1)';
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="relative flex h-2 w-2"
                style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              Launch Echo Intelligence
            </span>
          </button>

          {/* SECONDARY — Ghost outline button */}
          <button
            id="cta-knowledge-graph"
            className="group px-10 py-5 rounded-full border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-3"
          >
            View Knowledge Graph
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ── Bottom secondary navigation ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-10 z-10">
        <button className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A3A3A3] hover:text-white transition-colors duration-300 group">
          <span className="border-b border-transparent group-hover:border-white/40 pb-0.5">View Use Cases</span>
        </button>
        <div className="w-px h-4 bg-white/10" />
        <button className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A3A3A3] hover:text-white transition-colors duration-300 group">
          <span className="border-b border-transparent group-hover:border-white/40 pb-0.5">Read Documentation</span>
        </button>
      </div>

      {/* ── Gradient fade-to-black at bottom ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #02040e)' }}
      />
    </section>
  );
};

export default Hero;