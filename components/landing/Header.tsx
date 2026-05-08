import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface LandingHeaderProps {
  onNavigate: (path: string) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-[#040714]/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)]'
          : 'border-b border-white/0 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 group"
          id="echo-logo"
        >
          {/* Circuit-E Icon */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
              {/* Circuit board paths */}
              <rect x="1" y="1" width="34" height="34" rx="4" stroke="#00FF41" strokeWidth="0.8" opacity="0.4" />
              {/* E shape from circles */}
              <circle cx="10" cy="10" r="2" fill="#00FF41" />
              <circle cx="10" cy="18" r="2" fill="#00FF41" />
              <circle cx="10" cy="26" r="2" fill="#00FF41" />
              <circle cx="18" cy="10" r="2" fill="#00FF41" />
              <circle cx="16" cy="18" r="2" fill="#00FF41" opacity="0.7" />
              <circle cx="20" cy="26" r="2" fill="#00FF41" />
              {/* Connecting lines */}
              <line x1="10" y1="10" x2="10" y2="26" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="10" x2="18" y2="10" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="18" x2="16" y2="18" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="26" x2="20" y2="26" stroke="#00FF41" strokeWidth="1" opacity="0.5" />
              {/* Corner circuit nodes */}
              <circle cx="28" cy="8" r="1.5" fill="#00FF41" opacity="0.3" />
              <line x1="28" y1="8" x2="28" y2="16" stroke="#00FF41" strokeWidth="0.6" opacity="0.2" />
              <circle cx="28" cy="28" r="1.5" fill="#00FF41" opacity="0.3" />
            </svg>
          </div>
          <span
            className="text-white font-black tracking-[0.15em] text-2xl uppercase"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.2em' }}
          >
            ECHO
          </span>
        </button>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => onNavigate('/')}
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#A3A3A3] hover:text-white transition-colors duration-300"
            id="nav-home"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('/login')}
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#A3A3A3] hover:text-white transition-colors duration-300"
            id="nav-node-access"
          >
            Node Access
          </button>
          <button
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#A3A3A3] hover:text-white transition-colors duration-300"
            id="nav-product"
          >
            Product
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* System Operational Indicator */}
          <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]"></span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#00FF41]">System: Operational</span>
          </div>

          {/* Get Started CTA */}
          <button
            onClick={() => onNavigate('/login')}
            id="header-get-started"
            className="relative group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;