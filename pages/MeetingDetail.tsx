import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Activity, Share2, Trash2, Play, Pause, Volume2, Target, CheckSquare, Layers, Maximize2, Edit2, Check } from 'lucide-react';
import { Meeting, ActionItem, Decision } from '../types.ts';
import TranscriptTimeline from '../components/transcript/TranscriptTimeline.tsx';
import { Button } from '../components/ui/Button.tsx';

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
  const playbackIntervalRef = useRef<number | null>(null);

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

  const handleActionJump = (sid: string | undefined) => {
    const seg = meeting.segments.find(s => s.id === sid);
    onJumpToSegment(meeting.id, sid, seg?.start_time);
    if (seg) handleSeek(seg.start_time);
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

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
       <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-10 gap-6">
          <button onClick={onBack} className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-stark transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to List
          </button>
          
          <div className="flex items-center gap-6">
             <div className="hidden sm:flex items-center gap-3 text-zinc-700 font-mono text-[9px] uppercase tracking-widest bg-carbon px-4 py-2 border border-zinc-900">
               ID: {meeting.id.slice(-8)}
             </div>
             <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => window.print()}>
                  <Share2 className="w-3 h-3 mr-2" /> Print/Export
                </Button>
             </div>
          </div>
       </header>

       <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest">Meeting Details</span>
                  <div className="h-px flex-1 bg-zinc-900" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-stark uppercase leading-tight">{meeting.title}</h1>
                <div className="flex items-center gap-10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                   <div className="flex items-center gap-3"><Clock className="w-4 h-4" /> {new Date(meeting.start_time).toLocaleString()}</div>
                   <div className="flex items-center gap-3 text-accent"><Activity className="w-3.5 h-3.5" /> AI Summary Complete</div>
                </div>
             </div>

             <div className="bg-carbon border border-zinc-900 p-10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-20 h-20 bg-stark text-obsidian flex items-center justify-center border-4 border-obsidian group active:scale-95 transition-all shadow-lg"
                >
                   {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>

                <div className="flex-1 w-full space-y-6">
                   <div className="flex justify-between items-end mb-2">
                      <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Playback</div>
                      <div className="font-mono text-2xl text-stark tabular-nums">
                        {Math.floor(currentTime / 60).toString().padStart(2, '0')}:{(currentTime % 60).toString().padStart(2, '0')}
                        <span className="text-zinc-700 mx-2">/</span>
                        <span className="text-zinc-500 font-medium">
                          {Math.floor(maxDuration / 60).toString().padStart(2, '0')}:{(Math.floor(maxDuration) % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                   </div>
                   
                   <div className="h-2 w-full bg-zinc-900 overflow-hidden cursor-pointer relative group/progress" onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     handleSeek((x / rect.width) * maxDuration);
                   }}>
                      <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#fff_2px,#fff_4px)]" />
                      <div 
                        className="h-full bg-accent relative z-10 transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
                        style={{ width: `${(currentTime / (maxDuration || 1)) * 100}%` }} 
                      />
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
                   <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4" />
                      Meeting Transcript
                   </div>
                </div>
                <TranscriptTimeline 
                  segments={meeting.segments} 
                  onSeek={handleSeek} 
                  highlightedSegmentId={highlightedSegmentId} 
                  currentTime={currentTime} 
                />
             </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
             <section className="space-y-8 bg-carbon border border-zinc-900 p-8">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                   <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-stark">
                    <Target className="w-4 h-4 text-accent" /> Key Decisions
                   </div>
                </div>
                <div className="space-y-4">
                   {meeting.decisions.map(d => (
                      <div 
                        key={d.id} 
                        className="p-6 bg-obsidian border border-zinc-900 transition-all group relative overflow-hidden"
                      >
                         {editingId === d.id ? (
                           <div className="space-y-4">
                             <textarea 
                               className="w-full bg-zinc-900 border border-accent p-3 text-sm text-zinc-200 focus:outline-none"
                               value={editValue}
                               onChange={(e) => setEditValue(e.target.value)}
                               autoFocus
                             />
                             <Button size="sm" onClick={() => saveEdit('decision', d.id)}>
                               <Check className="w-3 h-3 mr-2" /> Save
                             </Button>
                           </div>
                         ) : (
                           <>
                             <p className="text-[13px] font-medium leading-relaxed text-zinc-300 italic mb-6">"{d.summary}"</p>
                             <div className="flex items-center justify-between mt-auto">
                                <button 
                                  onClick={() => startEditing(d.id, d.summary)}
                                  className="text-[9px] font-mono text-zinc-600 hover:text-accent flex items-center gap-1 uppercase tracking-widest"
                                >
                                  <Edit2 className="w-3 h-3" /> Edit
                                </button>
                                <div className="text-[9px] font-mono font-black text-accent">Confidence: {(d.confidence_score * 100).toFixed(0)}%</div>
                             </div>
                           </>
                         )}
                      </div>
                   ))}
                </div>
             </section>

             <section className="space-y-8 bg-carbon border border-zinc-900 p-8">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                   <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-stark">
                    <CheckSquare className="w-4 h-4 text-accent" /> Action Items
                   </div>
                </div>
                <div className="space-y-4">
                   {meeting.action_items.map(a => (
                      <div 
                        key={a.id} 
                        className="p-6 bg-obsidian border border-zinc-900 transition-all group"
                      >
                         <div className="text-[8px] font-mono uppercase tracking-widest text-zinc-700 mb-2 italic">Assigned to: {a.owner}</div>
                         {editingId === a.id ? (
                           <div className="space-y-4">
                             <input 
                               className="w-full bg-zinc-900 border border-accent p-2 text-sm text-zinc-200 focus:outline-none"
                               value={editValue}
                               onChange={(e) => setEditValue(e.target.value)}
                               autoFocus
                             />
                             <Button size="sm" onClick={() => saveEdit('action', a.id)}>
                               <Check className="w-3 h-3 mr-2" /> Save
                             </Button>
                           </div>
                         ) : (
                           <>
                             <p className="text-[13px] font-bold text-stark leading-relaxed mb-4">{a.description}</p>
                             <button 
                               onClick={() => startEditing(a.id, a.description)}
                               className="text-[9px] font-mono text-zinc-600 hover:text-accent flex items-center gap-1 uppercase tracking-widest"
                             >
                               <Edit2 className="w-3 h-3" /> Edit
                             </button>
                           </>
                         )}
                      </div>
                   ))}
                </div>
             </section>
          </div>
       </div>
    </div>
  );
};

export default MeetingDetail;