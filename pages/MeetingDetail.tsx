import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Activity, Share2, Play, Pause, Target, ShieldAlert, Layers, Check, Edit2, Zap, Radio } from 'lucide-react';
import { Meeting } from '../types/meeting';
import TranscriptTimeline from '../components/transcript/TranscriptTimeline.tsx';
import { ChatWithNotes } from '../components/chat/ChatWithNotes.tsx';

interface MeetingDetailProps {
  meeting: Meeting;
  onBack: () => void;
  highlightedSegmentId: string | null;
  onJumpToSegment: (meetingId: string, segmentId: string | undefined, time?: number) => void;
  onUpdateMeeting: (updatedMeeting: Meeting) => void;
}

const MeetingDetail: React.FC<MeetingDetailProps> = ({ meeting, onBack, highlightedSegmentId, onJumpToSegment, onUpdateMeeting }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSummaryPlaying, setIsSummaryPlaying] = useState(false);
  const playbackIntervalRef = useRef<number | null>(null);
  const summaryAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSummaryPlay = () => {
    if (!meeting.summarySpeechBase64) return;
    
    if (isSummaryPlaying) {
      if (summaryAudioRef.current) {
        summaryAudioRef.current.pause();
      }
      setIsSummaryPlaying(false);
    } else {
      setIsPlaying(false); // Stop main transcript player if active
      if (!summaryAudioRef.current) {
        const audioUrl = `data:audio/wav;base64,${meeting.summarySpeechBase64}`;
        const audio = new Audio(audioUrl);
        audio.onended = () => setIsSummaryPlaying(false);
        summaryAudioRef.current = audio;
      }
      summaryAudioRef.current.play().catch(err => console.error("Audio playback error:", err));
      setIsSummaryPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (summaryAudioRef.current) {
        summaryAudioRef.current.pause();
      }
    };
  }, []);

  const lastSegment = meeting.segments[meeting.segments.length - 1];
  const maxDuration = lastSegment ? lastSegment.end_time : 0;

  useEffect(() => {
    if (isPlaying) {
      playbackIntervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= maxDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
    }
    return () => { if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current); };
  }, [isPlaying, maxDuration]);

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    setIsPlaying(true);
  };

  const startEditing = (id: string, value: string) => {
    setEditingId(id);
    setEditValue(value);
  };

  const saveEdit = (type: 'action' | 'decision', id: string) => {
    const updatedMeeting = { ...meeting };
    if (type === 'action') {
      updatedMeeting.action_items = updatedMeeting.action_items.map(a => 
        a.id === id ? { ...a, description: editValue } : a
      );
    } else {
      updatedMeeting.decisions = updatedMeeting.decisions.map(d => 
        d.id === id ? { ...d, summary: editValue } : d
      );
    }
    onUpdateMeeting(updatedMeeting);
    setEditingId(null);
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to export the PDF.");
      return;
    }

    const docId = `ECHO-INTEL-${meeting.id.slice(-8).toUpperCase()}`;
    const timestamp = new Date(meeting.start_time).toLocaleString();
    const checksum = Math.random().toString(16).slice(2, 10).toUpperCase();

    const decisionsHtml = meeting.decisions.map(d => `
      <div style="border-left: 3px solid #00FF41; padding-left: 15px; margin-bottom: 15px; background: #fafafa; padding: 12px; border-radius: 4px;">
        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #111;">"${d.summary}"</p>
        <div style="display: flex; justify-content: space-between; font-size: 10px; color: #666; font-family: monospace;">
          <span>SECURITY CLASSIFICATION: CONFIDENTIAL</span>
          <span>CONFIDENCE: ${(d.confidence_score * 100).toFixed(0)}%</span>
        </div>
      </div>
    `).join('');

    const actionItemsHtml = meeting.action_items.map(a => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px; font-size: 12px; font-weight: bold; color: #111;">${a.description}</td>
        <td style="padding: 10px; font-size: 11px; font-family: monospace; color: #333;">${a.owner}</td>
        <td style="padding: 10px; font-size: 10px; font-family: monospace; color: #00FF41; font-weight: bold;">[ ${a.status.toUpperCase()} ]</td>
      </tr>
    `).join('');

    const segmentsHtml = meeting.segments.map(s => `
      <div style="margin-bottom: 12px; font-size: 11px; line-height: 1.5; border-bottom: 1px dashed #f0f0f0; padding-bottom: 8px;">
        <span style="font-weight: bold; color: #111; display: inline-block; width: 120px; font-family: monospace;">${s.speaker}:</span>
        <span style="color: #444;">${s.text}</span>
      </div>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${docId}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #111;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              border-bottom: 2px solid #111;
              padding-bottom: 20px;
            }
            .title-badge {
              background: #00FF41;
              color: #000;
              font-family: 'JetBrains Mono', monospace;
              font-size: 10px;
              font-weight: bold;
              padding: 4px 8px;
              display: inline-block;
              letter-spacing: 2px;
              margin-bottom: 10px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              border: 1px solid #ddd;
              padding: 20px;
              background: #fbfbfb;
              margin-bottom: 40px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
            }
            .meta-item span {
              font-weight: bold;
              color: #555;
            }
            .section-title {
              font-family: 'JetBrains Mono', monospace;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 3px;
              border-bottom: 1px solid #111;
              padding-bottom: 6px;
              margin-top: 40px;
              margin-bottom: 20px;
              font-weight: bold;
            }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td style="vertical-align: middle;">
                <div class="title-badge">SECURITY LEVEL 5 / INSTITUTIONAL CORE</div>
                <h1 style="margin: 0; font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; color: #000;">${meeting.title}</h1>
              </td>
              <td style="text-align: right; vertical-align: middle; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                <h3 style="margin: 0; font-weight: bold;">ECHO PLATFORM</h3>
                <p style="margin: 4px 0 0 0; color: #666;">COGNITIVE INTEL DIRECTIVE</p>
              </td>
            </tr>
          </table>

          <div class="meta-grid">
            <div class="meta-item"><span>DOCUMENT ID:</span> ${docId}</div>
            <div class="meta-item"><span>ACQUISITION TIME:</span> ${timestamp}</div>
            <div class="meta-item"><span>AUTHORITY NODE:</span> ECHO SYSTEM CORE</div>
            <div class="meta-item"><span>INTEGRITY HASH:</span> SHA256-${checksum}</div>
          </div>

          <div class="section-title">Strategic Decisions</div>
          <div>${decisionsHtml || '<p style="font-size: 12px; color: #666; font-style: italic">No decisions extracted from this session.</p>'}</div>

          <div class="section-title">Tactical Objectives</div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; text-align: left;">
            <thead>
              <tr style="background: #f4f4f4; border-bottom: 1px solid #ccc; font-family: 'JetBrains Mono', monospace; font-size: 11px;">
                <th style="padding: 10px;">OBJECTIVE DESCRIPTION</th>
                <th style="padding: 10px; width: 150px;">OWNER</th>
                <th style="padding: 10px; width: 100px;">STATUS</th>
              </tr>
            </thead>
            <tbody>
              ${actionItemsHtml || '<tr><td colspan="3" style="padding: 10px; font-size: 12px; color: #666; font-style: italic;">No tactical action items extracted.</td></tr>'}
            </tbody>
          </table>

          <div class="section-title">Semantic Transcript Feed</div>
          <div style="background: #fafafa; border: 1px solid #eee; padding: 20px; border-radius: 4px; max-height: 400px; overflow-y: auto;">
            ${segmentsHtml}
          </div>

          <div style="margin-top: 60px; border-top: 1px solid #ddd; padding-top: 30px; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #666;">
            <div>VERIFIED BY: ECHO CRYPTOGRAPHIC CORE</div>
            <div>STATUS: INTEL RECORD COMMITTED</div>
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-12 pb-24 relative z-10 text-crystal font-inter">
       <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 gap-6">
          <button onClick={onBack} className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#00FF41] hover:text-white transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Retract
          </button>
          
          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-2 text-[#00FF41] font-mono text-[10px] uppercase tracking-widest bg-[#00FF41]/10 px-4 py-2 rounded border border-[#00FF41]/30">
               <Radio className="w-3 h-3 animate-pulse" /> Vector ID: {meeting.id.slice(-8)}
             </div>
             <button onClick={exportToPDF} className="px-4 py-2 rounded border border-[#00FF41]/20 hover:border-[#00FF41] text-xs font-mono uppercase tracking-widest hover:text-[#00FF41] transition-colors flex items-center gap-2 text-white bg-[#00FF41]/5">
               <Share2 className="w-3 h-3 text-[#00FF41]" /> Transmit PDF Briefing
             </button>
          </div>
       </header>

       <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Visualizer and Timeline */}
          <div className="lg:col-span-8 space-y-8">
             <div className="glass-panel p-8 rounded-2xl relative overflow-hidden border border-white/5 bg-black/40">
                <div className="flex items-center gap-3 text-[#00FF41] mb-4">
                  <Zap className="w-4 h-4 animate-pulse-fast" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Neural Extraction Complete</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-white">{meeting.title}</h1>
                <div className="flex items-center gap-8 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                   <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#00FF41]" /> {new Date(meeting.start_time).toLocaleString()}</div>
                   <div className="flex items-center gap-2 text-[#00FF41]"><Activity className="w-3 h-3 animate-pulse" /> Signal Stable</div>
                </div>
             </div>

             <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden border border-white/5 bg-black/40">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400 text-cyan-400 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-all active:scale-95 flex-shrink-0"
                >
                   {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>

                <div className="flex-1 w-full space-y-4">
                   <div className="flex justify-between items-end">
                      <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest animate-pulse">Audio Stream</div>
                      <div className="font-mono text-2xl text-white tabular-nums">
                        {Math.floor(currentTime / 60).toString().padStart(2, '0')}:{(currentTime % 60).toString().padStart(2, '0')}
                        <span className="text-zinc-600 mx-2">/</span>
                        <span className="text-zinc-400 text-xl">
                          {Math.floor(maxDuration / 60).toString().padStart(2, '0')}:{(Math.floor(maxDuration) % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                   </div>
                   
                   <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden cursor-pointer relative border border-white/10" onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     handleSeek((x / rect.width) * maxDuration);
                   }}>
                      {/* Waveform */}
                      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(34,211,238,0.5)_4px,rgba(34,211,238,0.5)_6px)]" />
                      <div 
                        className="h-full bg-cyan-400 relative z-10 transition-all duration-300" 
                        style={{ width: `${(currentTime / (maxDuration || 1)) * 100}%` }} 
                      />
                   </div>
                </div>
             </div>

             {/* Dynamic TTS Summary Audio Briefing Card */}
             {meeting.summarySpeechBase64 && (
                <div className="glass-panel p-6 rounded-2xl flex items-center gap-6 border border-[#00FF41]/20 hover:border-[#00FF41]/40 transition-colors bg-black/40 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent" />
                  <button 
                    onClick={toggleSummaryPlay} 
                    className="w-12 h-12 rounded-full bg-[#00FF41]/15 border border-[#00FF41] text-[#00FF41] flex items-center justify-center hover:bg-[#00FF41] hover:text-black transition-all active:scale-95 flex-shrink-0 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                  >
                     {isSummaryPlaying ? <Pause className="w-4 h-4 fill-current animate-pulse" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <div className="flex-1 space-y-1">
                    <div className="font-mono text-[9px] text-[#00FF41] uppercase tracking-[0.25em] flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF41]"></span>
                      </span>
                      Hugging Face AI Audio Briefing (TTS)
                    </div>
                    <div className="text-[11px] text-[#A3A3A3] font-mono uppercase tracking-widest leading-relaxed">
                      Click to stream synthesized vocal briefing summarizing the core institutional decisions.
                    </div>
                  </div>
                </div>
             )}

             <div className="glass-panel rounded-2xl p-8 space-y-6 border border-white/5 bg-black/40">
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 border-b border-white/10 pb-4">
                   <Layers className="w-4 h-4 animate-pulse" />
                   Semantic Transcript Feed
                </div>
                <TranscriptTimeline 
                  segments={meeting.segments} 
                  onSeek={handleSeek} 
                  highlightedSegmentId={highlightedSegmentId} 
                  currentTime={currentTime} 
                />
             </div>
          </div>

          {/* Sidebar Tactical Feed */}
          <div className="lg:col-span-4 space-y-8">
             <section className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/5 bg-black/40">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <ShieldAlert className="w-24 h-24 text-purple-400" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-purple-400 mb-6 border-b border-white/10 pb-3">
                 <ShieldAlert className="w-4 h-4" /> Strategic Decisions
                </div>
                <div className="space-y-4 relative z-10">
                   {meeting.decisions.map(d => (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        key={d.id} 
                        className="p-4 bg-black/40 border border-purple-500/20 rounded-lg hover:border-purple-500 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)] group"
                      >
                         {editingId === d.id ? (
                           <div className="space-y-3">
                             <textarea 
                               className="w-full bg-black border border-purple-500 p-3 text-xs text-white focus:outline-none rounded font-inter"
                               value={editValue}
                               onChange={(e) => setEditValue(e.target.value)}
                               autoFocus
                             />
                             <button className="px-3 py-1.5 rounded border border-purple-500 text-purple-400 text-[9px] hover:bg-purple-500 hover:text-black transition-colors font-mono uppercase" onClick={() => saveEdit('decision', d.id)}>
                               <Check className="w-3 h-3 mr-2 inline" /> Commit Update
                             </button>
                           </div>
                         ) : (
                           <>
                             <p className="text-xs leading-relaxed text-white font-medium mb-4">"{d.summary}"</p>
                             <div className="flex items-center justify-between mt-auto">
                                 <button 
                                   onClick={() => startEditing(d.id, d.summary)}
                                   className="text-[9px] font-mono text-zinc-400 hover:text-purple-400 flex items-center gap-1 uppercase tracking-widest transition-colors"
                                 >
                                   <Edit2 className="w-3 h-3" /> Override
                                 </button>
                                 <div className="text-[8px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">Confidence: {(d.confidence_score * 100).toFixed(0)}%</div>
                             </div>
                           </>
                         )}
                      </motion.div>
                   ))}
                </div>
             </section>

             <section className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-white/5 bg-black/40">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Target className="w-24 h-24 text-green-400" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-green-400 mb-6 border-b border-white/10 pb-3">
                 <Target className="w-4 h-4" /> Tactical Objectives
                </div>
                <div className="space-y-4 relative z-10">
                   {meeting.action_items.map(a => (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        key={a.id} 
                        className="p-4 bg-black/40 border border-green-500/20 rounded-lg hover:border-green-500 shadow-[inset_0_0_10px_rgba(34,197,94,0.05)]"
                      >
                         <div className="text-[8px] font-mono uppercase tracking-widest text-green-400 mb-2 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Owner: {a.owner}
                         </div>
                         {editingId === a.id ? (
                           <div className="space-y-3">
                             <input 
                               className="w-full bg-black border border-green-500 p-2 text-xs text-white focus:outline-none rounded font-inter"
                               value={editValue}
                               onChange={(e) => setEditValue(e.target.value)}
                               autoFocus
                             />
                             <button className="px-3 py-1.5 rounded border border-green-500 text-green-400 text-[9px] hover:bg-green-500 hover:text-black transition-colors font-mono uppercase" onClick={() => saveEdit('action', a.id)}>
                               <Check className="w-3 h-3 mr-2 inline" /> Assign Objective
                             </button>
                           </div>
                         ) : (
                           <>
                             <p className="text-xs font-bold text-white leading-relaxed mb-4">{a.description}</p>
                             <button 
                               onClick={() => startEditing(a.id, a.description)}
                               className="text-[9px] font-mono text-zinc-400 hover:text-green-400 flex items-center gap-1 uppercase tracking-widest transition-colors"
                              >
                               <Edit2 className="w-3 h-3" /> Override
                             </button>
                           </>
                         )}
                      </motion.div>
                   ))}
                </div>
             </section>

             <ChatWithNotes meetingId={meeting.id} />
          </div>
       </div>
    </div>
  );
};

export default MeetingDetail;