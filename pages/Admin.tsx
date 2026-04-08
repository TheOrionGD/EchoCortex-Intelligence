
import React, { useState } from 'react';
import { Plus, Settings, Trash2, ShieldCheck, Folder, FileCode, ChevronRight, ChevronDown, Database, Terminal, Globe, Braces, FileText, Code2, DatabaseBackup } from 'lucide-react';

interface AdminProps {
  meetingsCount: number;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  comment?: string;
  extension?: 'ts' | 'tsx' | 'js' | 'html' | 'css' | 'json' | 'md' | 'sql' | 'env';
}

const SYSTEM_TREE: FileNode = {
  name: 'echo',
  type: 'folder',
  children: [
    { name: 'README.md', type: 'file', extension: 'md' },
    { name: '.gitignore', type: 'file' },
    { name: '.env.example', type: 'file', extension: 'env' },
    {
      name: 'frontend',
      type: 'folder',
      comment: 'React + Tailwind SPA',
      children: [
        { name: 'index.html', type: 'file', extension: 'html' },
        { name: 'package.json', type: 'file', extension: 'json' },
        { name: 'vite.config.ts', type: 'file', extension: 'ts' },
        { name: 'postcss.config.js', type: 'file', extension: 'js' },
        { name: 'tailwind.config.ts', type: 'file', extension: 'ts' },
        {
          name: 'public',
          type: 'folder',
          children: [
            { name: 'favicon.svg', type: 'file' },
            { name: 'robots.txt', type: 'file' },
          ]
        },
        {
          name: 'src',
          type: 'folder',
          children: [
            { name: 'main.tsx', type: 'file', extension: 'tsx' },
            { name: 'App.tsx', type: 'file', extension: 'tsx' },
            { name: 'assets', type: 'folder', comment: 'Static assets' },
            {
              name: 'components',
              type: 'folder',
              comment: 'Reusable UI components',
              children: [
                { 
                  name: 'layout', 
                  type: 'folder', 
                  children: [
                    { name: 'Sidebar.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'Header.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'PageShell.tsx', type: 'file', extension: 'tsx' }
                  ] 
                },
                { 
                  name: 'audio', 
                  type: 'folder', 
                  children: [
                    { name: 'AudioRecorder.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'AudioPlayer.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'Waveform.tsx', type: 'file', extension: 'tsx' }
                  ] 
                },
                { 
                  name: 'transcript', 
                  type: 'folder', 
                  children: [
                    { name: 'TranscriptTimeline.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'TranscriptLine.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'Timestamp.tsx', type: 'file', extension: 'tsx' }
                  ] 
                },
                { 
                  name: 'search', 
                  type: 'folder', 
                  children: [
                    { name: 'SemanticSearchBar.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'SearchResultItem.tsx', type: 'file', extension: 'tsx' }
                  ] 
                },
                { 
                  name: 'ui', 
                  type: 'folder', 
                  children: [
                    { name: 'Button.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'Input.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'Badge.tsx', type: 'file', extension: 'tsx' }, 
                    { name: 'Loader.tsx', type: 'file', extension: 'tsx' }
                  ] 
                },
              ]
            },
            { 
              name: 'pages', 
              type: 'folder', 
              children: [
                { name: 'Login.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'Dashboard.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'CreateMeeting.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'MeetingDetail.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'ActionsDecisions.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'SemanticSearch.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'Profile.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'Admin.tsx', type: 'file', extension: 'tsx' }
              ] 
            },
            { 
              name: 'hooks', 
              type: 'folder', 
              children: [
                { name: 'useAuth.ts', type: 'file', extension: 'ts' }, 
                { name: 'useAudioRecorder.ts', type: 'file', extension: 'ts' }, 
                { name: 'useTranscriptSync.ts', type: 'file', extension: 'ts' }, 
                { name: 'useSemanticSearch.ts', type: 'file', extension: 'ts' }
              ] 
            },
            { 
              name: 'context', 
              type: 'folder', 
              children: [
                { name: 'AuthContext.tsx', type: 'file', extension: 'tsx' }, 
                { name: 'TeamContext.tsx', type: 'file', extension: 'tsx' }
              ] 
            },
            { 
              name: 'services', 
              type: 'folder', 
              children: [
                { name: 'firebase.ts', type: 'file', extension: 'ts' }, 
                { name: 'apiClient.ts', type: 'file', extension: 'ts' }, 
                { name: 'audioUpload.ts', type: 'file', extension: 'ts' }
              ] 
            },
            { 
              name: 'utils', 
              type: 'folder', 
              children: [
                { name: 'formatTime.ts', type: 'file', extension: 'ts' }, 
                { name: 'extractInitials.ts', type: 'file', extension: 'ts' }, 
                { name: 'debounce.ts', type: 'file', extension: 'ts' }
              ] 
            },
            { 
              name: 'styles', 
              type: 'folder', 
              children: [
                { name: 'globals.css', type: 'file', extension: 'css' }
              ] 
            },
          ]
        },
        { name: '.env.local', type: 'file', extension: 'env' },
      ]
    },
    {
      name: 'backend',
      type: 'folder',
      comment: 'Node.js + Firebase Functions',
      children: [
        { name: 'package.json', type: 'file', extension: 'json' },
        { name: 'index.ts', type: 'file', extension: 'ts' },
        { 
          name: 'config', 
          type: 'folder', 
          children: [
            { name: 'firebase.ts', type: 'file', extension: 'ts' },
            { name: 'database.ts', type: 'file', extension: 'ts' },
            { name: 'gemini.ts', type: 'file', extension: 'ts' }
          ]
        },
        { 
          name: 'routes', 
          type: 'folder', 
          children: [
            { name: 'meetings.routes.ts', type: 'file', extension: 'ts' },
            { name: 'transcript.routes.ts', type: 'file', extension: 'ts' },
            { name: 'search.routes.ts', type: 'file', extension: 'ts' },
            { name: 'admin.routes.ts', type: 'file', extension: 'ts' }
          ]
        },
        { 
          name: 'controllers', 
          type: 'folder', 
          children: [
            { name: 'meetings.controller.ts', type: 'file', extension: 'ts' },
            { name: 'transcript.controller.ts', type: 'file', extension: 'ts' },
            { name: 'search.controller.ts', type: 'file', extension: 'ts' },
            { name: 'admin.controller.ts', type: 'file', extension: 'ts' }
          ]
        },
        { 
          name: 'services', 
          type: 'folder', 
          children: [
            { name: 'transcription.service.ts', type: 'file', extension: 'ts' },
            { name: 'embedding.service.ts', type: 'file', extension: 'ts' },
            { name: 'extraction.service.ts', type: 'file', extension: 'ts' },
            { name: 'semanticSearch.service.ts', type: 'file', extension: 'ts' }
          ]
        },
        { 
          name: 'middleware', 
          type: 'folder', 
          children: [
            { name: 'auth.middleware.ts', type: 'file', extension: 'ts' },
            { name: 'role.middleware.ts', type: 'file', extension: 'ts' }
          ]
        },
        { 
          name: 'jobs', 
          type: 'folder', 
          children: [
            { name: 'processAudio.job.ts', type: 'file', extension: 'ts' },
            { name: 'generateEmbeddings.job.ts', type: 'file', extension: 'ts' }
          ]
        },
        { 
          name: 'utils', 
          type: 'folder', 
          children: [
            { name: 'logger.ts', type: 'file', extension: 'ts' },
            { name: 'validators.ts', type: 'file', extension: 'ts' }
          ]
        },
      ]
    },
    {
      name: 'database',
      type: 'folder',
      comment: 'PostgreSQL + pgvector',
      children: [
        { 
          name: 'migrations', 
          type: 'folder', 
          children: [
            { name: '001_init.sql', type: 'file', extension: 'sql' },
            { name: '002_transcripts.sql', type: 'file', extension: 'sql' },
            { name: '003_embeddings.sql', type: 'file', extension: 'sql' },
            { name: '004_actions_decisions.sql', type: 'file', extension: 'sql' }
          ]
        },
        { name: 'seeds', type: 'folder' },
        { name: 'schema.sql', type: 'file', extension: 'sql' },
      ]
    },
    { 
      name: 'docs', 
      type: 'folder', 
      children: [
        { name: 'architecture.md', type: 'file', extension: 'md' },
        { name: 'data-flow.md', type: 'file', extension: 'md' },
        { name: 'api-spec.md', type: 'file', extension: 'md' },
        { name: 'ui-guidelines.md', type: 'file', extension: 'md' },
        { name: 'threat-model.md', type: 'file', extension: 'md' }
      ]
    },
    { name: 'vercel.json', type: 'file', extension: 'json' },
  ]
};

const FileTreeItem: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const isFolder = node.type === 'folder';

  const getIcon = () => {
    if (isFolder) return <Folder className={`w-4 h-4 ${isOpen ? 'text-zinc-400' : 'text-zinc-600'} group-hover:text-zinc-300 transition-colors`} />;
    
    switch(node.extension) {
      case 'ts':
      case 'tsx':
        return <Code2 className="w-4 h-4 text-cyan-700/80 group-hover:text-cyan-500 transition-colors" />;
      case 'json':
        return <Braces className="w-4 h-4 text-amber-700/80 group-hover:text-amber-500 transition-colors" />;
      case 'md':
        return <FileText className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors" />;
      case 'sql':
        return <DatabaseBackup className="w-4 h-4 text-emerald-700/80 group-hover:text-emerald-500 transition-colors" />;
      default:
        return <FileCode className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors" />;
    }
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-1 px-2 hover:bg-zinc-800/50 rounded-sm cursor-pointer group transition-colors`}
        style={{ paddingLeft: `${depth * 1.5}rem` }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1 w-5 justify-center">
          {isFolder && (isOpen ? <ChevronDown className="w-3 h-3 text-zinc-600" /> : <ChevronRight className="w-3 h-3 text-zinc-600" />)}
        </div>
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className={`text-[11px] font-mono tracking-tight ${isFolder ? 'text-zinc-300 font-semibold' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
            {node.name}
          </span>
          {node.comment && (
            <span className="text-[9px] font-mono text-zinc-700 italic ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              # {node.comment}
            </span>
          )}
        </div>
      </div>
      {isFolder && isOpen && node.children && (
        <div className="border-l border-zinc-900/50 ml-[0.625rem]">
          {node.children.map((child, i) => (
            <FileTreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Admin: React.FC<AdminProps> = ({ meetingsCount }) => {
  const [nodes, setNodes] = useState([
    { name: 'Sarah Jenkins', role: 'Senior Lead', scope: 'Full', email: 's.jenkins@echo-intel.ai' },
    { name: 'Robert Miller', role: 'Policy Analyst', scope: 'Scoped', email: 'r.miller@echo-intel.ai' },
    { name: 'Emma Watson', role: 'DevOps Lead', scope: 'Full', email: 'e.watson@echo-intel.ai' }
  ]);
  const [activeTab, setActiveTab] = useState<'governance' | 'structure'>('governance');

  const handleProvisionNode = () => {
    const name = prompt("Enter Node Identifier:");
    const email = prompt("Enter Node Email:");
    if (name && email) setNodes(prev => [...prev, { name, role: 'New Provision', scope: 'Scoped', email }]);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-6xl">
       <header className="border-b border-zinc-800 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
             <h2 className="text-4xl font-semibold tracking-tighter text-zinc-100">Institutional Governance</h2>
             <p className="text-zinc-500 font-serif italic text-base leading-relaxed max-w-2xl">
                Centralized command for authorization scopes, relational architecture, and artifact lifecycle management.
             </p>
          </div>
          <div className="flex bg-zinc-900/50 border border-zinc-800 p-1 rounded-sm shadow-inner self-start">
             <button 
                onClick={() => setActiveTab('governance')}
                className={`px-6 py-2 text-[10px] font-mono uppercase tracking-[0.2em] rounded-sm transition-all ${activeTab === 'governance' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
                Personnel
             </button>
             <button 
                onClick={() => setActiveTab('structure')}
                className={`px-6 py-2 text-[10px] font-mono uppercase tracking-[0.2em] rounded-sm transition-all ${activeTab === 'structure' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-600 hover:text-zinc-400'}`}
             >
                Architecture
             </button>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl">
          <div className="p-10 bg-[#09090b] text-center space-y-4">
             <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">Total Artifacts</p>
             <p className="text-6xl font-semibold text-zinc-100 tracking-tighter">{meetingsCount}</p>
          </div>
          <div className="p-10 bg-[#09090b] text-center space-y-4">
             <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">Active Nodes</p>
             <p className="text-6xl font-semibold text-zinc-100 tracking-tighter">{nodes.length}</p>
          </div>
          <div className="p-10 bg-[#09090b] text-center space-y-4">
             <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">Vector Cortex</p>
             <p className="text-5xl font-semibold text-zinc-100 tracking-tighter">42.8GB</p>
          </div>
       </div>

       {activeTab === 'governance' ? (
          <div className="border border-zinc-800 rounded-sm bg-[#09090b] shadow-2xl overflow-hidden">
             <div className="p-8 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="w-5 h-5 text-zinc-500" />
                   <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-100">Personnel Provisioning</h3>
                </div>
                <button 
                  onClick={handleProvisionNode}
                  className="flex items-center gap-3 px-6 py-3 bg-zinc-100 text-zinc-950 font-bold text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all shadow-lg active:scale-95"
                >
                  <Plus className="w-4 h-4"/> Authorize Node
                </button>
             </div>
             <div className="divide-y divide-zinc-900">
                {nodes.map((node, i) => (
                  <div key={i} className="p-8 flex items-center justify-between hover:bg-zinc-900/40 transition-colors group">
                     <div className="flex items-center gap-8">
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-[12px] font-bold text-zinc-500 group-hover:text-zinc-200 transition-colors">
                          {node.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                           <p className="text-base font-medium text-zinc-200 tracking-tight">{node.name}</p>
                           <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mt-2">
                             Designation: {node.role} • {node.scope} Scope
                           </p>
                           <p className="text-[9px] font-mono text-zinc-700 lowercase mt-1">{node.email}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 text-zinc-700 hover:text-zinc-400 transition-colors"><Settings className="w-4.5 h-4.5"/></button>
                        <button 
                          onClick={() => setNodes(prev => prev.filter((_, idx) => idx !== i))}
                          className="p-3 text-zinc-700 hover:text-red-500 transition-colors"
                        >
                           <Trash2 className="w-4.5 h-4.5"/>
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl min-h-[700px]">
             <div className="lg:col-span-1 bg-zinc-950 p-6 border-r border-zinc-800 space-y-8">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 border-b border-zinc-900 pb-4">
                   <Terminal className="w-4 h-4" /> System Core
                </div>
                <div className="space-y-4">
                   <div className="p-4 bg-zinc-900/30 rounded-sm border border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-2 text-zinc-400"><Database className="w-3.5 h-3.5" /><span className="text-[9px] font-mono uppercase tracking-widest">Database Sync</span></div>
                      <div className="text-[11px] font-mono text-zinc-100 tracking-tight">PostgreSQL 16.2</div>
                      <div className="text-[9px] font-mono text-cyan-500/60 mt-1 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" /> Operational</div>
                   </div>
                   <div className="p-4 bg-zinc-900/30 rounded-sm border border-zinc-800/50">
                      <div className="flex items-center gap-2 mb-2 text-zinc-400"><Globe className="w-3.5 h-3.5" /><span className="text-[9px] font-mono uppercase tracking-widest">Deployment</span></div>
                      <div className="text-[11px] font-mono text-zinc-100 tracking-tight">Edge Network (Vercel)</div>
                      <div className="text-[9px] font-mono text-zinc-600 mt-1">Version: 2.1.0-alpha</div>
                   </div>
                </div>
             </div>
             <div className="lg:col-span-3 bg-[#09090b] p-10 overflow-auto scrollbar-thin">
                <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-6">
                   <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500">System Architecture Graph</h3>
                   <span className="text-[9px] font-mono text-zinc-700 italic">Structural Verification: Pass</span>
                </div>
                <div className="font-mono text-[11px] space-y-1">
                  <FileTreeItem node={SYSTEM_TREE} depth={0} />
                </div>
             </div>
          </div>
       )}

       <div className="p-10 bg-zinc-900/10 border border-zinc-800 rounded-sm flex items-start gap-6">
          <ShieldCheck className="w-6 h-6 text-zinc-700 mt-1" />
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">Governance Protocol</h4>
            <p className="text-xs text-zinc-600 font-serif leading-relaxed italic">
               All administrative modifications are logged in the immutable audit trail. Identity revocation propagates across the vector space within &lt;100ms.
            </p>
          </div>
       </div>
    </div>
  );
};

export default Admin;
