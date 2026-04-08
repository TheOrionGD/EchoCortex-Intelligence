
import React from 'react';
// Removed useNavigate import to resolve react-router-dom missing member error
import { 
  ArrowRight, 
  Mic, 
  Target, 
  Search, 
  Box, 
  Github, 
  Twitter, 
  Zap,
  Shield,
  Layers,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '../components/ui/Button.tsx';
import { useTheme } from '../context/ThemeContext';

interface LandingProps {
  onNavigate: (path: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-obsidian text-zinc-400' : 'bg-white text-gray-900'} selection:bg-accent/30 selection:text-stark`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b ${theme === 'dark' ? 'border-zinc-900 bg-obsidian/80' : 'border-gray-200 bg-white/80'} backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-stark' : 'bg-gray-900'} flex items-center justify-center`}>
              <Box className={`w-5 h-5 ${theme === 'dark' ? 'text-obsidian' : 'text-white'}`} />
            </div>
            <span className={`font-black tracking-tighter text-xl uppercase italic ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Echo</span>
          </div>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => onNavigate('/login')} className={`text-[10px] font-black uppercase tracking-widest transition-colors ${theme === 'dark' ? 'text-zinc-500 hover:text-stark' : 'text-gray-600 hover:text-gray-900'}`}>
              Node Access
            </button>
            <Button variant="stark" size="sm" onClick={() => onNavigate('/login')}>
              Get Started <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] ${theme === 'dark' ? 'bg-accent/10' : 'bg-blue-100'} blur-[120px] rounded-full pointer-events-none opacity-50`}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
          <div className={`inline-flex items-center gap-3 px-4 py-2 ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-100/50 border-gray-300'} border rounded-full mb-4 animate-in fade-in slide-in-from-top-4 duration-700`}>
            <Zap className="w-3 h-3 text-accent" />
            <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>Powered by Gemini Cortex</span>
          </div>
          
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000 ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>
            Your AI Second Brain <br />
            <span className="text-accent">for Meetings</span>
          </h1>
          
          <p className={`text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
            Capture, recall, and act on every decision effortlessly. Echo transforms spoken words into structured intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button variant="stark" size="lg" className="w-full sm:w-auto" onClick={() => onNavigate('/login')}>
              Deploy Echo Core <ArrowRight className="ml-3 w-4 h-4" />
            </Button>
            <button className={`px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] transition-colors ${theme === 'dark' ? 'text-zinc-500 hover:text-stark' : 'text-gray-600 hover:text-gray-900'}`}>
              Explore Documentation
            </button>
          </div>
        </div>

        {/* Visualizer Mockup */}
        <div className="mt-32 max-w-6xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className={`p-2 rounded-lg shadow-2xl relative ${theme === 'dark' ? 'bg-carbon border-zinc-800' : 'bg-gray-100 border-gray-300'}`}>
             <div className={`absolute -top-12 -right-12 w-64 h-64 ${theme === 'dark' ? 'bg-accent/20' : 'bg-blue-200/20'} blur-[80px] rounded-full`}></div>
             <div className={`rounded-md overflow-hidden border aspect-video flex flex-col ${theme === 'dark' ? 'bg-obsidian border-zinc-900' : 'bg-white border-gray-200'}`}>
                <div className={`h-10 border-b flex items-center px-4 gap-2 ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-900' : 'bg-gray-100/50 border-gray-200'}`}>
                   <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                   <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                   <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                   <div className={`ml-4 text-[9px] font-mono tracking-widest uppercase ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-500'}`}>System_Active // Session_Recall</div>
                </div>
                <div className={`flex-1 flex items-center justify-center relative ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]'}`}>
                   <div className="flex items-end gap-1.5 h-32">
                      {[...Array(40)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 bg-accent/40 rounded-full animate-pulse-slow" 
                          style={{ 
                            height: `${20 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.1}s` 
                          }} 
                        />
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`py-32 px-6 border-t ${theme === 'dark' ? 'border-zinc-900' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`grid md:grid-cols-3 gap-px border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-200 border-gray-200'}`}>
            <FeatureCard 
              icon={Mic}
              title="Neural Ingestion"
              description="High-fidelity transcription that understands context, speakers, and industry-specific jargon."
              theme={theme}
            />
            <FeatureCard 
              icon={Target}
              title="Relational Mapping"
              description="Automatically extract tasks and decisions, mapping them back to the exact moment they occurred."
              theme={theme}
            />
            <FeatureCard 
              icon={Search}
              title="Semantic Recall"
              description="Don't search for keywords. Ask your second brain questions and get context-aware answers."
              theme={theme}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className={`py-32 px-6 ${theme === 'dark' ? 'bg-zinc-900/20' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className={`text-4xl font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Institutional Security</h2>
            <p className={`text-lg leading-relaxed italic ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
              "Echo transforms spoken artifacts into immutable institutional intelligence. Built for organizations that prioritize focus, endurance, and clarity."
            </p>
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-mono uppercase tracking-widest">End-to-end Cryptography Active</span>
              </div>
              <div className={`flex items-center gap-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                <Layers className="w-5 h-5 text-accent" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Relational Knowledge Graphing</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className={`aspect-square border p-8 flex flex-col justify-end group transition-colors ${theme === 'dark' ? 'bg-carbon border-zinc-900 hover:bg-zinc-900' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <Zap className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <p className={`font-bold uppercase tracking-widest text-xs ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>99.9% Cortex Uptime</p>
             </div>
             <div className={`aspect-square border p-8 flex flex-col justify-end group transition-colors ${theme === 'dark' ? 'bg-carbon border-zinc-900 hover:bg-zinc-900' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <Layers className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <p className={`font-bold uppercase tracking-widest text-xs ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Vectorized Recall</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 px-6 border-t ${theme === 'dark' ? 'border-zinc-900' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 flex items-center justify-center ${theme === 'dark' ? 'bg-stark' : 'bg-gray-900'}`}>
              <Box className={`w-4 h-4 ${theme === 'dark' ? 'text-obsidian' : 'text-white'}`} />
            </div>
            <span className={`font-black tracking-tighter text-lg uppercase italic ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Echo</span>
          </div>
          
          <div className={`flex gap-12 text-[9px] font-mono uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-500'}`}>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-stark' : 'hover:text-gray-900'}`}>Governance</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-stark' : 'hover:text-gray-900'}`}>Privacy</a>
            <a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-stark' : 'hover:text-gray-900'}`}>Audit Trail</a>
          </div>

          <div className="flex gap-6">
            <Github className={`w-5 h-5 cursor-pointer transition-colors ${theme === 'dark' ? 'hover:text-stark' : 'hover:text-gray-900'}`} />
            <Twitter className={`w-5 h-5 cursor-pointer transition-colors ${theme === 'dark' ? 'hover:text-stark' : 'hover:text-gray-900'}`} />
          </div>
        </div>
        <p className="text-center mt-20 text-[9px] font-mono text-zinc-800 uppercase tracking-widest">© 2025 Institutional Core — Unit_Primary</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: any, title: string, description: string, theme: string }> = ({ icon: Icon, title, description, theme }) => (
  <div className={`${theme === 'dark' ? 'bg-obsidian hover:bg-carbon' : 'bg-white hover:bg-gray-50'} p-12 space-y-8 group transition-all duration-500`}>
    <div className={`w-12 h-12 border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-300'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className={`text-xl font-black tracking-tighter uppercase italic ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>{title}</h3>
    <p className={`leading-relaxed font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>{description}</p>
  </div>
);

export default Landing;
