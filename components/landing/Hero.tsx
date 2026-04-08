import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button.tsx';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Neural Soundscape Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-accent/10 blur-[160px] rounded-full opacity-40 animate-pulse-slow"></div>
        
        {/* SVG Mesh Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-accent" />
              <path d="M 2 2 L 50 50 M 2 2 L 100 0" stroke="currentColor" strokeWidth="0.2" fill="none" className="text-accent/30" />
            </pattern>
            <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="80%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="mesh-mask">
              <rect width="100%" height="100%" fill="url(#fade-gradient)" />
            </mask>
          </defs>
          
          {/* Main Background Pattern */}
          <rect width="100%" height="100%" fill="url(#neural-mesh)" mask="url(#mesh-mask)" />
          
          {/* Dynamic Nodes and Connections */}
          <g className="animate-float" style={{ animationDuration: '20s' }}>
            <circle cx="15%" cy="25%" r="2" fill="currentColor" className="text-accent animate-pulse" />
            <circle cx="85%" cy="40%" r="1.5" fill="currentColor" className="text-accent animate-pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="40%" cy="80%" r="2.5" fill="currentColor" className="text-accent animate-pulse" style={{ animationDelay: '3s' }} />
            
            <path d="M 15 250 L 850 400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" fill="none" className="text-accent/20" />
            <path d="M 850 400 L 400 800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" fill="none" className="text-accent/20" />
          </g>

          {/* Sound Wave Ripple (Top Right) */}
          <g className="text-accent/10" stroke="currentColor" fill="none">
            <circle cx="90%" cy="10%" r="50" strokeWidth="1" />
            <circle cx="90%" cy="10%" r="100" strokeWidth="0.5" />
            <circle cx="90%" cy="10%" r="150" strokeWidth="0.2" />
          </g>
        </svg>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full mb-4 animate-in fade-in slide-in-from-top-4 duration-700 backdrop-blur-sm">
          <Zap className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Powered by Gemini Cortex Engine</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-stark leading-[1.1] uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Echo: Your AI Second Brain <br />
          <span className="text-accent">for Professional Meetings</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Capture, recall, and act on every decision effortlessly. Echo transforms spoken words into structured institutional intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Button variant="stark" size="lg" className="w-full sm:w-auto shadow-2xl" onClick={() => onNavigate('/login')}>
            Get Started — Login <ArrowRight className="ml-3 w-4 h-4" />
          </Button>
          <button className="px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-stark transition-colors">
            View Use Cases
          </button>
        </div>
      </div>

      {/* Hero Visualizer Mockup */}
      <div className="mt-32 max-w-6xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
        <div className="bg-carbon border border-zinc-800 p-2 rounded-lg shadow-2xl relative">
           <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/20 blur-[80px] rounded-full opacity-30"></div>
           <div className="bg-obsidian rounded-md overflow-hidden border border-zinc-900 aspect-video flex flex-col">
              <div className="h-10 bg-zinc-900/50 border-b border-zinc-900 flex items-center px-4 gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                 <div className="w-2 h-2 rounded-full bg-amber-500/30"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
                 <div className="ml-4 text-[9px] font-mono text-zinc-700 tracking-widest uppercase">system_log // interface_active</div>
              </div>
              <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]">
                 <div className="flex items-end gap-1.5 h-32">
                    {[...Array(40)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-accent/40 rounded-full animate-pulse" 
                        style={{ 
                          height: `${20 + Math.random() * 80}%`,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: '2s'
                        }} 
                      />
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;