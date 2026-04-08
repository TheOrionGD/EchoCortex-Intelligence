import React from 'react';
import { 
  Terminal, 
  Layers, 
  Search, 
  User, 
  Lock, 
  Power,
  Cpu,
  Sun,
  Moon
} from 'lucide-react';
import { ViewState, UserProfile } from '../../types.ts';
import { SYSTEM_LOGO_URL } from '../../constants/branding.ts';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  user: UserProfile;
  viewState: ViewState;
  setViewState: (view: ViewState) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, viewState, setViewState, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  
  const NavButton = ({ id, icon: Icon, label }: { id: ViewState, icon: any, label: string }) => {
    const isActive = viewState === id || (id === 'dashboard' && viewState === 'meeting');
    return (
      <button 
        onClick={() => setViewState(id)}
        className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 group border-l-2 ${
          isActive 
            ? (theme === 'dark' ? 'bg-carbon border-accent text-stark' : 'bg-white border-blue-500 text-gray-900')
            : (theme === 'dark' ? 'border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/40' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/40')
        }`}
      >
        <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:translate-x-1'}`} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      </button>
    );
  };

  return (
    <aside className={`w-72 border-r flex flex-col fixed h-full z-30 ${theme === 'dark' ? 'border-zinc-900 bg-obsidian' : 'border-gray-200 bg-white'}`}>
      <div className="pt-12 pb-12 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 flex items-center justify-center overflow-hidden rounded-sm ${theme === 'dark' ? 'bg-stark' : 'bg-gray-900'}`}>
            <img src={SYSTEM_LOGO_URL} alt="Echo Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className={`font-bold tracking-tighter text-xl uppercase italic leading-none ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>Echo</h1>
            <p className={`text-[8px] font-mono tracking-[0.3em] mt-1 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>INSTITUTIONAL CORE</p>
          </div>
        </div>
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-gray-100 text-gray-600'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 space-y-px">
        <div className="px-8 mb-6">
          <p className={`text-[9px] font-mono uppercase tracking-[0.4em] mb-4 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-600'}`}>Operations</p>
          <div className={`border-t mb-6 ${theme === 'dark' ? 'border-zinc-900' : 'border-gray-200'}`} />
        </div>
        
        <NavButton id="dashboard" icon={Terminal} label="Repository" />
        <NavButton id="create" icon={Cpu} label="Ingestion" />
        <NavButton id="intelligence" icon={Layers} label="Truth Matrix" />
        <NavButton id="search" icon={Search} label="Recall Engine" />

        <div className="px-8 my-8 pt-8">
          <p className={`text-[9px] font-mono uppercase tracking-[0.4em] mb-4 ${theme === 'dark' ? 'text-zinc-700' : 'text-gray-600'}`}>Governance</p>
          <div className={`border-t mb-4 ${theme === 'dark' ? 'border-zinc-900' : 'border-gray-200'}`} />
        </div>

        <NavButton id="profile" icon={User} label="Identity" />
        {user.role === 'admin' && (
          <NavButton id="admin" icon={Lock} label="System Config" />
        )}
      </div>

      <div className={`p-8 border-t bg-carbon/50 ${theme === 'dark' ? 'border-zinc-900' : 'border-gray-200 bg-gray-50/50'}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-8 h-8 flex items-center justify-center text-[10px] font-bold overflow-hidden ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-200 text-gray-600'}`}>
              <img src={SYSTEM_LOGO_URL} alt="User node" className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
            <div className="min-w-0">
              <p className={`text-[10px] font-bold truncate tracking-tight ${theme === 'dark' ? 'text-stark' : 'text-gray-900'}`}>{user.name}</p>
              <p className={`text-[8px] font-mono uppercase ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-500'}`}>Unit: Primary</p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className={`p-2 transition-colors ${theme === 'dark' ? 'text-zinc-700 hover:text-accent' : 'text-gray-600 hover:text-blue-600'}`}
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