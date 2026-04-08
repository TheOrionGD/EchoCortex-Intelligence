
import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, Circle } from 'lucide-react';

interface RecorderProps {
  onRecordingComplete: (audioBase64: string, mimeType: string) => void;
  isProcessing?: boolean;
}

const Recorder: React.FC<RecorderProps> = ({ onRecordingComplete, isProcessing: externalProcessing }) => {
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
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setInternalProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result?.toString().split(',')[1];
          if (base64data) {
            onRecordingComplete(base64data, 'audio/webm');
          }
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
    <div className="flex flex-col items-center justify-center space-y-8">
      {isAnyProcessing ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <Loader2 className="w-12 h-12 text-zinc-500 animate-spin mb-4" />
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">Cortex Synchronizing</p>
        </div>
      ) : isRecording ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 rounded-full border border-red-500/50 flex items-center justify-center bg-zinc-900">
              <Circle className="w-8 h-8 text-red-500 fill-red-500" />
            </div>
          </div>
          <button
            onClick={stopRecording}
            className="px-10 py-4 bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-white transition-all active:scale-95"
          >
            End Session
          </button>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Active Capture</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-24 h-24 rounded-full border border-zinc-700 flex items-center justify-center mb-12 group hover:border-zinc-400 transition-colors">
            <Mic className="w-8 h-8 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
          </div>
          <button
            onClick={startRecording}
            className="px-10 py-4 bg-zinc-800 text-zinc-100 text-xs font-bold uppercase tracking-[0.2em] rounded border border-zinc-700 hover:bg-zinc-700 transition-all active:scale-95"
          >
            Initiate Stream
          </button>
          <p className="mt-6 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Awaiting Command</p>
        </div>
      )}
    </div>
  );
};

export default Recorder;
