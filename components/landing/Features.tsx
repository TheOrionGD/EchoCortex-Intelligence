import React from 'react';
import { Mic, Target, Search } from 'lucide-react';

const FeatureCard: React.FC<{ icon: any, title: string, description: string }> = ({ icon: Icon, title, description }) => (
  <div className="bg-obsidian p-12 space-y-8 group hover:bg-carbon transition-all duration-500">
    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-black tracking-tighter text-stark uppercase italic">{title}</h3>
    <p className="text-zinc-500 leading-relaxed font-medium">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
          <FeatureCard 
            icon={Mic}
            title="Automated Transcription"
            description="High-fidelity transcription that understands context, multiple speakers, and technical terminology."
          />
          <FeatureCard 
            icon={Target}
            title="Intelligent Extraction"
            description="Automatically extract tasks and decisions, mapping them back to the exact moment they were committed."
          />
          <FeatureCard 
            icon={Search}
            title="Semantic Recall"
            description="Search your history by intent, not just keywords. Ask questions and get context-aware answers."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;