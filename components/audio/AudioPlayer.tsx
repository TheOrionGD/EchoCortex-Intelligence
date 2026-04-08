import React from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onReset?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  onReset
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-carbon border border-zinc-900 p-8 flex items-center gap-10">
      <button 
        onClick={onTogglePlay}
        className="w-14 h-14 bg-stark text-obsidian flex items-center justify-center hover:bg-white transition-all active:scale-95 shadow-lg"
      >
        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
      </button>

      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-end">
          <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">Buffer_Active</span>
          <span className="font-mono text-sm text-stark tabular-nums">
            {formatTime(currentTime)} <span className="text-zinc-700">/</span> {formatTime(duration)}
          </span>
        </div>
        
        <div 
          className="h-1.5 w-full bg-zinc-900 cursor-pointer group relative overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onSeek(((e.clientX - rect.left) / rect.width) * duration);
          }}
        >
          <div 
            className="h-full bg-accent shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button onClick={onReset} className="text-zinc-700 hover:text-zinc-400 p-2 transition-colors">
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-zinc-600" />
          <div className="w-16 h-1 bg-zinc-900">
            <div className="h-full bg-zinc-700 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;