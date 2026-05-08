import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader2, Square, Activity } from 'lucide-react';

interface RecorderProps {
  onRecordingComplete: (audioBase64: string, mimeType: string) => void;
  isProcessing?: boolean;
}

const AudioRecorder: React.FC<RecorderProps> = ({ onRecordingComplete, isProcessing: externalProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [internalProcessing, setInternalProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const isAnyProcessing = externalProcessing || internalProcessing;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio visualizer
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

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
        
        // Cleanup visualizer
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (audioContextRef.current) audioContextRef.current.close();
      };

      mediaRecorder.start();
      setIsRecording(true);
      updateVisualizer();
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Microphone access is required to record meetings.");
    }
  };

  const updateVisualizer = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average volume
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average);
    
    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full">
      {isAnyProcessing ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative mb-8">
            <Loader2 className="w-12 h-12 text-[#00FF41] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#00FF41] animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-white font-mono font-bold text-[11px] tracking-widest uppercase">Analyzing Meeting</p>
            <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-[0.4em] animate-pulse">Building your summary...</p>
          </div>
        </div>
      ) : isRecording ? (
        <div className="flex flex-col items-center justify-center w-full">
          {/* Animated visualizer */}
          <div className="relative mb-10 h-16 flex items-center justify-center gap-1 w-full max-w-xs">
             {[...Array(16)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#00FF41]/60 rounded-full transition-all duration-75" 
                  style={{ 
                    height: `${Math.min(100, (audioLevel / 128) * 100 * (0.3 + Math.random() * 0.7))}%`,
                    opacity: 0.3 + (audioLevel / 255)
                  }} 
                />
             ))}
          </div>
          
          <button 
            onClick={stopRecording} 
            className="group relative px-8 py-4 bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-[0.4em] transition-all hover:bg-red-500 hover:scale-105 active:scale-95 rounded-full"
          >
            <div className="absolute -inset-1.5 border border-red-600/30 rounded-full group-hover:-inset-2.5 transition-all duration-300" />
            <span className="flex items-center gap-2.5 relative z-10"><Square className="w-3.5 h-3.5 fill-current" /> Stop Recording</span>
          </button>
          
          <div className="mt-6 flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 bg-red-600 animate-pulse rounded-full" />
            <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">Recording in progress</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-20 h-20 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-8 group transition-all duration-500 hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.1)]">
            <Mic className="w-8 h-8 text-zinc-500 group-hover:text-[#00FF41] transition-colors" />
          </div>
          <button 
            onClick={startRecording} 
            className="group relative px-8 py-4 bg-[#00FF41] text-black text-[10px] font-mono font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 rounded-full"
            style={{
              boxShadow: '0 0 20px rgba(0,255,65,0.3)',
            }}
          >
            <div className="absolute -inset-1.5 border border-[#00FF41]/20 rounded-full group-hover:-inset-2.5 transition-all duration-300 pointer-events-none" />
            <span className="relative z-10">Start Meeting</span>
          </button>
          <p className="mt-6 text-zinc-500 font-mono text-[9px] uppercase tracking-[0.3em] text-center">Click to start capturing audio</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;