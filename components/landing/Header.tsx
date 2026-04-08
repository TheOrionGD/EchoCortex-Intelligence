import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { SYSTEM_LOGO_URL } from '../../constants/branding.ts';

interface LandingHeaderProps {
  onNavigate: (path: string) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onNavigate }) => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-obsidian/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-8 h-8 bg-stark flex items-center justify-center overflow-hidden rounded-sm">
            <img src={SYSTEM_LOGO_URL} alt="Echo Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-stark font-black tracking-tighter text-xl uppercase italic">Echo</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('/login')} 
            className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-stark transition-colors"
          >
            Node Access
          </button>
          <Button variant="stark" size="sm" onClick={() => onNavigate('/login')}>
            Get Started <ArrowRight className="ml-2 w-3 h-3" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;