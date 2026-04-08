import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { SYSTEM_LOGO_URL } from '../../constants/branding.ts';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-stark flex items-center justify-center overflow-hidden rounded-sm">
            <img src={SYSTEM_LOGO_URL} alt="Echo Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-stark font-black tracking-tighter text-lg uppercase italic">Echo</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-700">
          <a href="#" className="hover:text-stark transition-colors">Terms</a>
          <a href="#" className="hover:text-stark transition-colors">Privacy</a>
          <a href="#" className="hover:text-stark transition-colors">Contact</a>
          <a href="#" className="hover:text-stark transition-colors">Governance</a>
        </div>

        <div className="flex gap-6">
          <Github className="w-5 h-5 hover:text-stark cursor-pointer transition-colors" />
          <Twitter className="w-5 h-5 hover:text-stark cursor-pointer transition-colors" />
        </div>
      </div>
      <p className="text-center mt-20 text-[9px] font-mono text-zinc-800 uppercase tracking-widest">
        © 2025 Institutional Core — Second Brain Unit
      </p>
    </footer>
  );
};

export default Footer;