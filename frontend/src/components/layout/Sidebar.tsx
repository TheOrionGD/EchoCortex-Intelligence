import React from 'react';
import { 
  Box, 
  Terminal, 
  Layers, 
  Activity, 
  Search, 
  User, 
  Lock, 
  Power,
  Cpu
} from 'lucide-react';
import { ViewState, UserProfile } from '../../types.ts';

interface SidebarProps {
  user: UserProfile;
  viewState: ViewState;
  setViewState: (view: ViewState) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, viewState, setViewState, onLogout }) => {
  const NavButton = ({ id, icon: Icon, label }: { id: ViewState, icon: any, label: string }) => {
    const isActive = viewState === id || (id === 'dashboard' && viewState === 'meeting');
    return (
      <button 
        onClick={() => setViewState(id)}
        className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 group border-l-2 ${
          isActive 
            ? 'bg-carbon border-accent text-stark' 
            : 'border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/40'
        }`}
      >
        <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:translate-x-1'}`} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      </button>
    );
  };

  return (
    <aside className="w-72 border-r border-zinc-900 flex flex-col fixed h-full bg-obsidian z-30">
      <div className="pt-12 pb-12 px-8 flex items-center gap-4">
        <div className="w-10 h-10 bg-stark flex items-center justify-center">
          <Box className="w-6 h-6 text-obsidian" />
        </div>
        <div>
          <h1 className="text-stark font-bold tracking-tighter text-xl uppercase italic">Echo</h1>
          <p className="text-[8px] font-mono tracking-[0.3em] text-zinc-600">INSTITUTIONAL CORE</p>
        </div>
      </div>

      <div className="flex-1 space-y-px">
        <div className="px-8 mb-6">
          <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.4em] mb-4">Operations</p>
          <div className="border-t border-zinc-900 mb-6" />
        </div>
        
        <NavButton id="dashboard" icon={Terminal} label="Repository" />
        <NavButton id="create" icon={Cpu} label="Ingestion" />
        <NavButton id="intelligence" icon={Layers} label="Truth Matrix" />
        <NavButton id="search" icon={Search} label="Recall Engine" />

        <div className="px-8 my-8 pt-8">
          <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.4em] mb-4">Governance</p>
          <div className="border-t border-zinc-900 mb-4" />
        </div>

        <NavButton id="profile" icon={User} label="Identity" />
        {user.role === 'admin' && (
          <NavButton id="admin" icon={Lock} label="System Config" />
        )}
      </div>

      <div className="p-8 border-t border-zinc-900 bg-carbon/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">
              {user.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-stark truncate tracking-tight">{user.name}</p>
              <p className="text-[8px] font-mono text-zinc-600 uppercase">Unit: Primary</p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="text-zinc-700 hover:text-accent p-2 transition-colors"
            title="De-authenticate"
          >
            <Power className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;