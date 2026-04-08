import React, { useState, useRef } from 'react';
import { Mic, Loader2, Square, Activity } from 'lucide-react';

interface RecorderProps {
  onRecordingComplete: (audioBase64: string, mimeType: string) => void;
  isProcessing?: boolean;
}

const AudioRecorder: React.FC<RecorderProps> = ({ onRecordingComplete, isProcessing: externalProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [internalProcessing, setInternalProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const isAnyProcessing = externalProcessing || internalProcessing;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setInternalProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(',')[1];
          if (base64data) onRecordingComplete(base64data, 'audio/webm');
          setInternalProcessing(false);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      {isAnyProcessing ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-12">
            <Loader2 className="w-16 h-16 text-accent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-6 h-6 text-accent animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-stark font-bold text-sm tracking-widest uppercase">Neural Processing</p>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em] animate-pulse">Extracting Knowledge Graph...</p>
          </div>
        </div>
      ) : isRecording ? (
        <div className="flex flex-col items-center justify-center">
          <div className="relative mb-16 h-24 flex items-center gap-1">
             {[...Array(12)].map((_, i) => (
               <div 
                 key={i} 
                 className="w-1.5 bg-accent/60 animate-wave" 
                 style={{ 
                   height: `${Math.random() * 80 + 20}%`,
                   animationDelay: `${i * 0.1}s`,
                   animationDuration: '0.6s'
                 }} 
               />
             ))}
          </div>
          
          <button 
            onClick={stopRecording} 
            className="group relative px-12 py-5 bg-red-600 text-stark text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-red-500 hover:scale-105 active:scale-95"
          >
            <div className="absolute -inset-2 border border-red-600/30 group-hover:-inset-3 transition-all duration-300" />
            <span className="flex items-center gap-3"><Square className="w-4 h-4 fill-current" /> Terminate Stream</span>
          </button>
          
          <div className="mt-8 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-red-600 animate-pulse rounded-full" />
            <span className="text-zinc-700 font-mono text-[9px] uppercase tracking-widest">Insecure_Link_Active</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-32 h-32 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-16 group transition-all duration-500 hover:border-accent hover:shadow-[0_0_40px_rgba(79,70,229,0.1)]">
            <Mic className="w-10 h-10 text-zinc-700 group-hover:text-accent transition-colors" />
          </div>
          <button 
            onClick={startRecording} 
            className="group relative px-12 py-5 bg-stark text-obsidian text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute -inset-2 border border-stark/20 group-hover:-inset-3 transition-all duration-300" />
            Initialize Record
          </button>
          <p className="mt-10 text-zinc-800 font-mono text-[9px] uppercase tracking-[0.4em]">Awaiting Authorization</p>
        </div>
      )}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1.2); }
        }
        .animate-wave {
          animation: wave linear infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder;