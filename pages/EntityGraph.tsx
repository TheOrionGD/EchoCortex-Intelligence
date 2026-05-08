import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Users, Award, Tag, LayoutGrid } from 'lucide-react';
import { Meeting } from '../types/meeting';

interface EntityGraphProps {
  meetings: Meeting[];
}

interface MemberNode {
  id: string;
  name: string;
  role: string;
  skills: string[];
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const EntityGraph: React.FC<EntityGraphProps> = ({ meetings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedMember, setSelectedMember] = useState<string>('GODFREY');

  // Parse actual speakers / action item assignees dynamically
  const parsedOwners = Array.from(new Set(meetings.flatMap(m => m.action_items.map(ai => ai.owner))));
  
  const members = parsedOwners.length > 0 
    ? parsedOwners.map((owner, idx) => ({
        id: owner,
        name: owner,
        role: idx === 0 ? 'Quantum Executive' : idx === 1 ? 'Systems Architect' : 'Compliance Officer',
        skills: idx === 0 
          ? ['Speech-to-Text Ingestion', 'Groq Llama Orchestration', 'Hugging Face MMS Synthesis']
          : ['Vector DB Operations', 'Mongoose Modeling', 'Express Backend Sockets'],
        color: idx % 2 === 0 ? '#39FF14' : '#8B5CF6'
      }))
    : [
        { id: 'GODFREY', name: 'GODFREY', role: 'Quantum Executive', skills: ['Speech-to-Text Ingestion', 'Groq Llama Orchestration', 'Hugging Face MMS Synthesis'], color: '#39FF14' },
        { id: 'Orion Pax', name: 'Orion Pax', role: 'Systems Architect', skills: ['Vector DB Operations', 'Mongoose Modeling', 'Express Backend Sockets'], color: '#8B5CF6' },
        { id: 'OrionGD', name: 'OironGD', role: 'Compliance Officer', skills: ['SOC2 Audit Handshakes', 'GDPR Forgetting Protocols', 'Cryptographic Proofing'], color: '#00FF41' },
      ];

  const currentMember = members.find(m => m.id === selectedMember) || members[0];

  // Dynamic calculations for Sankey
  const rawSegmentsCount = meetings.reduce((acc, m) => acc + (m.segments?.length || 0), 0) || 24;
  const decisionsCount = meetings.reduce((acc, m) => acc + (m.decisions?.length || 0), 0) || 8;

  // Matrix heatmap mapping
  const skillsMatrix = members.map((m, idx) => ({
    name: m.name,
    stt: 90 - (idx * 15),
    vector: 45 + (idx * 25),
    compliance: 30 + (idx * 30),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 340;

    // Create interactive nodes
    const nodes: MemberNode[] = members.map((m, idx) => ({
      ...m,
      x: 100 + (idx * (width - 200)) / (members.length - 1 || 1),
      y: height / 2 + (Math.sin(idx) * 60),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 45,
    }));

    const resizeHandler = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = 340;
    };
    window.addEventListener('resize', resizeHandler);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
        }
      }
      ctx.stroke();

      // Update and draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x - node.radius < 0 || node.x + node.radius > width) node.vx *= -1;
        if (node.y - node.radius < 0 || node.y + node.radius > height) node.vy *= -1;

        const isHighlighted = node.id === selectedMember;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHighlighted ? 15 : 8), 0, Math.PI * 2);
        ctx.strokeStyle = isHighlighted ? `${node.color}50` : `${node.color}15`;
        ctx.lineWidth = isHighlighted ? 3 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#050505';
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px "Space Grotesk"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [selectedMember, members]);

  return (
    <div className="space-y-12 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 text-[#39FF14] mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
            <Network className="w-5 h-5 animate-pulse text-[#39FF14]" />
            Neural Organizational Entity Graph
          </div>
          <h2 className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 uppercase">
            Entity Graph
          </h2>
       </header>

       {/* Network Navigator Canvas */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 relative overflow-hidden">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14] flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 animate-pulse" /> Network Navigator (Derived from live audio speakers)
          </span>
          <div className="bg-black/60 border border-white/10 rounded-xl overflow-hidden relative">
             <canvas ref={canvasRef} className="w-full block cursor-pointer" />
          </div>
       </div>

       {/* Flow / Sankey Chart */}
       <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8B5CF6]">Information Flow Sankey Chart</span>
          
          <div className="relative h-44 w-full bg-black/40 border border-white/5 rounded-xl p-4 flex items-center justify-between">
             <div className="flex flex-col items-center gap-2">
                <span className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-mono text-zinc-400">AUDIO ({rawSegmentsCount} SEGMENTS)</span>
             </div>

             <div className="flex-1 px-8 relative h-16">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                   <path d="M 0,10 C 50,10 50,30 100,30" fill="none" stroke="#8B5CF6" strokeWidth="2.5" opacity="0.3" />
                   <path d="M 0,30 C 50,30 50,10 100,10" fill="none" stroke="#39FF14" strokeWidth="2.5" opacity="0.3" />
                </svg>
             </div>

             <div className="flex flex-col items-center gap-2">
                <span className="px-3 py-2 bg-cyan-950 border border-cyan-800 rounded text-[9px] font-mono text-cyan-400">DECISIONS ({decisionsCount} NODES)</span>
             </div>

             <div className="flex-1 px-8 relative h-16">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                   <path d="M 0,20 C 50,20 50,20 100,20" fill="none" stroke="#39FF14" strokeWidth="2.5" opacity="0.3" />
                </svg>
             </div>

             <div className="flex flex-col items-center gap-2">
                <span className="px-3 py-2 bg-emerald-950 border border-emerald-800 rounded text-[9px] font-mono text-[#39FF14]">SYNAPSE OUT</span>
             </div>
          </div>
       </div>

       {/* Heatmap Matrix Selection Panel */}
       <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-4">
             <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#39FF14]">Select Entity Node</span>
             <div className="space-y-2">
                {members.map(m => (
                   <button 
                     key={m.id}
                     onClick={() => setSelectedMember(m.id)}
                     className={`w-full py-4 px-5 text-left rounded-lg border text-xs font-mono uppercase tracking-widest transition-all flex items-center justify-between ${
                       selectedMember === m.id 
                         ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14] shadow-neon-cyan' 
                         : 'bg-black border-white/5 text-zinc-400 hover:border-white/25 hover:text-white'
                     }`}
                   >
                      <span>{m.name}</span>
                      <span className="text-[9px] text-zinc-600">{m.role}</span>
                   </button>
                ))}
             </div>
          </div>

          {/* Matrix Heatmap */}
          <div className="lg:col-span-8 glass-panel p-8 rounded-2xl border border-white/5 bg-[#050505]/80 space-y-6">
             <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight flex items-center gap-2">
                   <LayoutGrid className="w-5 h-5 text-cyan-400" /> Expertise Mapping Matrix (Heatmap)
                </h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-1">Darker colors represent higher quantitative expertise ratios.</p>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[10px] uppercase border-collapse">
                   <thead>
                      <tr className="border-b border-white/10 text-zinc-500 tracking-widest">
                         <th className="py-2 px-3">People</th>
                         <th className="py-2 px-3">STT Ingestion</th>
                         <th className="py-2 px-3">Vector DB Ops</th>
                         <th className="py-2 px-3">Compliance</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {skillsMatrix.map((row, idx) => (
                         <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-3 text-white font-bold">{row.name}</td>
                            
                            {/* Ingestion cell */}
                            <td 
                              className="py-3 px-3 font-bold border border-white/5"
                              style={{ 
                                backgroundColor: `rgba(57, 255, 20, ${row.stt / 100})`, 
                                color: row.stt > 60 ? '#000000' : '#FFFFFF' 
                              }}
                            >
                               {row.stt}%
                            </td>

                            {/* Vector cell */}
                            <td 
                              className="py-3 px-3 font-bold border border-white/5"
                              style={{ 
                                backgroundColor: `rgba(139, 92, 246, ${row.vector / 100})`, 
                                color: row.vector > 60 ? '#FFFFFF' : '#FFFFFF' 
                              }}
                            >
                               {row.vector}%
                            </td>

                            {/* Compliance cell */}
                            <td 
                              className="py-3 px-3 font-bold border border-white/5"
                              style={{ 
                                backgroundColor: `rgba(57, 255, 20, ${row.compliance / 100})`, 
                                color: row.compliance > 60 ? '#000000' : '#FFFFFF' 
                              }}
                            >
                               {row.compliance}%
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );
};

export default EntityGraph;
