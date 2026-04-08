
import React from 'react';
import { LandingHeader } from '../components/landing/Header.tsx';
import { Hero } from '../components/landing/Hero.tsx';
import { Features } from '../components/landing/Features.tsx';
import { Footer } from '../components/landing/Footer.tsx';
import { Shield, Layers, Zap } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-obsidian text-zinc-400 selection:bg-accent/30 selection:text-stark">
      <LandingHeader onNavigate={onNavigate} />
      
      <main>
        <Hero onNavigate={onNavigate} />
        
        <Features />

        {/* Institutional Trust Section */}
        <section className="py-32 px-6 bg-zinc-900/10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tighter text-stark uppercase">Institutional Security</h2>
              <p className="text-lg text-zinc-500 leading-relaxed italic">
                "Echo transforms spoken artifacts into immutable institutional intelligence. Built for organizations that prioritize focus, endurance, and clarity."
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-zinc-400">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">End-to-end Cryptography Active</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400">
                  <Layers className="w-5 h-5 text-accent" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Relational Knowledge Graphing</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square bg-carbon border border-zinc-900 p-8 flex flex-col justify-end group hover:bg-zinc-900 transition-colors">
                  <Zap className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-stark font-bold uppercase tracking-widest text-xs">99.9% Pipeline Uptime</p>
               </div>
               <div className="aspect-square bg-carbon border border-zinc-900 p-8 flex flex-col justify-end group hover:bg-zinc-900 transition-colors">
                  <Layers className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-stark font-bold uppercase tracking-widest text-xs">Vectorized Recall Engine</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
