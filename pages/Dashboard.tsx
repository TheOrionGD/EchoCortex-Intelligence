import React from 'react';
import { ChevronRight, Trash2, Database, Clock, ArrowUpRight } from 'lucide-react';
import { Meeting } from '../types.ts';
import { Button } from '../components/ui/Button.tsx';
import { useTheme } from '../context/ThemeContext';

interface DashboardProps {
  meetings: Meeting[];
  onSelectMeeting: (id: string) => void;
  onDeleteMeeting: (id: string) => void;
  onInitiateCapture: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ meetings, onSelectMeeting, onDeleteMeeting, onInitiateCapture }) => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className={`flex flex-col md:flex-row md:items-end justify-between pb-12 gap-8 ${theme === 'dark' ? 'border-b border-zinc-900' : 'border-b border-gray-200'}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-accent mb-2">
            <Database className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Meeting History</span>
          </div>
          <h2 className={`text-6xl font-black tracking-tighter uppercase ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Dashboard</h2>
          <p className={`font-medium text-sm leading-relaxed max-w-xl ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-600'}`}>
            View all your past meetings. The AI has automatically extracted tasks and decisions from each one.
          </p>
        </div>
        <Button variant="stark" size="lg" onClick={onInitiateCapture}>
          Start Recording
        </Button>
      </header>

      <div className={`grid grid-cols-1 gap-px border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-900' : 'bg-gray-200 border-gray-200'}`}>
        {meetings.map((m, idx) => (
          <div 
            key={m.id} 
            onClick={() => onSelectMeeting(m.id)} 
            className={`${theme === 'dark' ? 'bg-obsidian hover:bg-carbon' : 'bg-white hover:bg-gray-50'} p-10 flex flex-col lg:flex-row lg:items-center justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start lg:items-center gap-12">
              <div className="hidden sm:block">
                <p className={`text-[9px] font-mono uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-600'}`}>#</p>
                <p className={`text-xl font-mono group-hover:text-accent/50 transition-colors ${theme === 'dark' ? 'text-zinc-800' : 'text-gray-300'}`}>
                  {meetings.length - idx}
                </p>
              </div>

              <div className="space-y-4">
                <div className={`flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                  <Clock className="w-3 h-3" />
                  {new Date(m.start_time).toLocaleDateString(undefined, { month: 'long', day: '2-digit', year: 'numeric' })}
                </div>
                <h4 className={`text-2xl font-bold group-hover:tracking-wide transition-all duration-500 uppercase ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>
                  {m.title}
                </h4>
                <div className="flex flex-wrap items-center gap-6">
                   <div className={`flex items-center gap-2 px-3 py-1 border text-[8px] font-mono uppercase tracking-[0.2em] ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' : 'bg-gray-100/50 border-gray-300 text-gray-600'}`}>
                      Tasks: {m.action_items.length}
                   </div>
                   <div className={`flex items-center gap-2 px-3 py-1 border text-[8px] font-mono uppercase tracking-[0.2em] ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400' : 'bg-gray-100/50 border-gray-300 text-gray-600'}`}>
                      Decisions: {m.decisions.length}
                   </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-12 mt-8 lg:mt-0">
               <div className="flex items-center gap-4">
                 <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteMeeting(m.id); }} 
                  className={`p-4 transition-all border ${theme === 'dark' ? 'bg-zinc-900/40 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 border-transparent hover:border-red-900/30' : 'bg-gray-100/40 text-gray-600 hover:text-red-500 hover:bg-red-50 border-transparent hover:border-red-200'}`}
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
                 <div className="p-4 bg-accent text-stark transform translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                 </div>
               </div>
            </div>
          </div>
        ))}
        {meetings.length === 0 && (
           <div className={`p-32 text-center border ${theme === 'dark' ? 'bg-obsidian border-zinc-900' : 'bg-white border-gray-200'}`}>
             <Database className={`w-12 h-12 mx-auto mb-6 ${theme === 'dark' ? 'text-zinc-900' : 'text-gray-300'}`} />
             <p className={`font-mono text-[10px] uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>No meetings saved yet.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;