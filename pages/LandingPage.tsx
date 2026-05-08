import React from 'react';
import { LandingHeader } from '../components/landing/Header.tsx';
import { Hero } from '../components/landing/Hero.tsx';
import { Features } from '../components/landing/Features.tsx';
import { Footer } from '../components/landing/Footer.tsx';
import { Shield, Database, Zap, Lock } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div
      className="min-h-screen text-white overflow-x-hidden relative animate-in fade-in duration-500 bg-transparent"
      style={{
        fontFamily: 'Inter, sans-serif',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Global Header */}
      <LandingHeader onNavigate={onNavigate} />

      {/* Main Relative Container */}
      <main className="relative z-10 bg-transparent">
        <Hero onNavigate={onNavigate} />
        <Features />

        {/* ── Institutional Trust / Security Section ── */}
        <section className="relative py-36 px-6 bg-transparent">
          {/* Separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">

              {/* Left: Copy */}
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <Shield className="w-3.5 h-3.5 text-[#00FF41]" />
                  <span className="text-[9px] font-mono uppercase tracking-[0.45em] text-[#A3A3A3]">Institutional Governance</span>
                </div>

                <h2
                  className="text-5xl font-black uppercase tracking-tight text-white leading-tight"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Built for Organizations
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#00e5ff]">
                    That Demand Precision
                  </span>
                </h2>

                <p className="text-[#A3A3A3] text-lg leading-relaxed italic max-w-md">
                  "Echo transforms spoken artifacts into immutable institutional intelligence. Built for organizations that prioritize focus, endurance, and clarity."
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Shield, label: 'Database-Only Config Policy — Zero Hardcoded Credentials', color: '#00FF41' },
                    { icon: Lock, label: 'ObjectId-Safe MongoDB Validation with In-Memory Fallback', color: '#8B5CF6' },
                    { icon: Database, label: 'Hybrid Supabase + MongoDB Atlas Dual-Storage Architecture', color: '#00e5ff' },
                    { icon: Zap, label: 'Identity Revocation Propagation < 100ms Across Vector Space', color: '#00FF41' },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-start gap-4 group">
                      <div
                        className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110"
                        style={{ color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#A3A3A3] group-hover:text-white transition-colors duration-300 pt-2.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Stats Grid */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: '99.9%', label: 'Pipeline Uptime', color: '#00FF41' },
                  { value: '<10s', label: 'Full Ingestion Cycle', color: '#00e5ff' },
                  { value: '384', label: 'Vector Dimensions', color: '#8B5CF6' },
                  { value: '4', label: 'Phase AI Pipeline', color: '#00FF41' },
                ].map(({ value, label, color }) => (
                  <div
                    key={label}
                    className="p-8 rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500 group cursor-default"
                  >
                    <div
                      className="text-4xl font-black mb-3 transition-all duration-300"
                      style={{ color, fontFamily: 'Inter, sans-serif', textShadow: `0 0 30px ${color}40` }}
                    >
                      {value}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#A3A3A3] group-hover:text-white transition-colors duration-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA Banner ── */}
        <section className="relative py-32 px-6 overflow-hidden bg-transparent">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#00FF41]/5 rounded-full blur-[120px]" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-3xl mx-auto text-center space-y-10 relative z-10">
            <h2
              className="text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Your Institutional Memory
              <br />
              <span className="text-[#00FF41]" style={{ textShadow: '0 0 40px rgba(0,255,65,0.4)' }}>
                Starts Here
              </span>
            </h2>
            <p className="text-[#A3A3A3] text-lg">
              Launch your Echo node and begin converting transient conversations into permanent, queryable knowledge graphs in minutes.
            </p>

            <button
              id="cta-final"
              onClick={() => onNavigate('/login')}
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-black font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-300"
              style={{
                background: '#00FF41',
                boxShadow: '0 0 40px rgba(0,255,65,0.5), 0 0 80px rgba(0,255,65,0.2)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 60px rgba(0,255,65,0.7), 0 0 100px rgba(0,255,65,0.35)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 40px rgba(0,255,65,0.5), 0 0 80px rgba(0,255,65,0.2)';
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              Access Cognitive Node
            </button>

            <div className="flex items-center justify-center gap-10 pt-4">
              <button className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A3A3A3] hover:text-white transition-colors duration-300 group">
                <span className="border-b border-transparent group-hover:border-white/30 pb-0.5">View Use Cases</span>
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#A3A3A3] hover:text-white transition-colors duration-300 group">
                <span className="border-b border-transparent group-hover:border-white/30 pb-0.5">Read Documentation</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandingPage;
