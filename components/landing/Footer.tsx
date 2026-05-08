import React from 'react';
import { Github, Twitter, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      className="relative border-t border-white/5 pt-24 pb-10 px-6"
      style={{ background: '#02040e' }}
    >
      {/* Top fade separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16 mb-20">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
                <rect x="1" y="1" width="34" height="34" rx="4" stroke="#00FF41" strokeWidth="0.8" opacity="0.4" />
                <circle cx="10" cy="10" r="2" fill="#00FF41" />
                <circle cx="10" cy="18" r="2" fill="#00FF41" />
                <circle cx="10" cy="26" r="2" fill="#00FF41" />
                <circle cx="18" cy="10" r="2" fill="#00FF41" />
                <circle cx="16" cy="18" r="2" fill="#00FF41" opacity="0.7" />
                <circle cx="20" cy="26" r="2" fill="#00FF41" />
                <line x1="10" y1="10" x2="10" y2="26" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
                <line x1="10" y1="10" x2="18" y2="10" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
                <line x1="10" y1="18" x2="16" y2="18" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
                <line x1="10" y1="26" x2="20" y2="26" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
              </svg>
              <span className="text-white font-black tracking-[0.2em] text-xl uppercase">ECHO</span>
            </div>
            <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-xs">
              The enterprise Automated Second Brain — transforming transient conversations into permanent institutional memory.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-[#A3A3A3] hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-[#A3A3A3] hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[11px]">Product</h4>
            <div className="space-y-4">
              {['Neural Ingestion', 'Cognitive Extraction', 'Conversational Recall', 'Knowledge Graph', 'API Reference'].map(link => (
                <button
                  key={link}
                  onClick={() => onNavigate ? onNavigate('documents') : undefined}
                  className="flex items-center gap-2 text-[#A3A3A3] hover:text-white text-sm transition-colors duration-300 group text-left w-full"
                >
                  <span>{link}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-[11px]">Resources</h4>
            <div className="space-y-4">
              {['View Use Cases', 'Read Documentation', 'System Architecture', 'Threat Model', 'Governance Policy'].map(link => (
                <button
                  key={link}
                  onClick={() => onNavigate ? onNavigate('documents') : undefined}
                  className="flex items-center gap-2 text-[#A3A3A3] hover:text-white text-sm transition-colors duration-300 group text-left w-full"
                >
                  <span>{link}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">
            © 2026 Echo Institutional Core — Second Brain Unit
          </p>
          <div className="flex items-center gap-8">
            {['Terms', 'Privacy', 'Contact', 'Governance'].map(link => (
              <a
                key={link}
                href="#"
                className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/20 hover:text-white/60 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF41]"></span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#00FF41]/60">All Systems Nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;