
import React from 'react';
import { Upload } from 'lucide-react';
import Recorder from '../components/audio/AudioRecorder';

interface CreateMeetingProps {
  onRecordingComplete: (audioBase64: string, mimeType: string) => void;
  isProcessing: boolean;
}

const CreateMeeting: React.FC<CreateMeetingProps> = ({ onRecordingComplete, isProcessing }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result?.toString().split(',')[1];
        if (base64) onRecordingComplete(base64, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-4xl">
       <header className="border-b border-zinc-800 pb-10">
          <h2 className="text-4xl font-semibold tracking-tighter text-zinc-100">New Memory Ingestion</h2>
          <p className="text-zinc-500 mt-4 font-serif italic text-base leading-relaxed">Designate a new session for structural recording. Artifacts are vectorized immediately upon commit.</p>
       </header>
       <div className="grid md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden">
          <div className="p-16 bg-[#09090b] flex flex-col items-center">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-16">Method A: Live Stream</h3>
            <Recorder onRecordingComplete={onRecordingComplete} isProcessing={isProcessing} />
          </div>
          <div className="p-16 bg-[#09090b] flex flex-col items-center justify-center text-center">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 mb-16">Method B: Payload Upload</h3>
            <input type="file" id="file-upload" className="hidden" accept="audio/*" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="w-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-900 bg-zinc-900/10 rounded-sm p-16 group hover:border-zinc-700 transition-colors cursor-pointer">
               <Upload className="w-12 h-12 text-zinc-800 group-hover:text-zinc-600 mb-8" />
               <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500">Commit Pre-recorded Artifact</p>
            </label>
          </div>
       </div>
    </div>
  );
};

export default CreateMeeting;
