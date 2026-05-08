import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, FileText } from 'lucide-react';
import AudioRecorder from '../components/audio/AudioRecorder.tsx';

interface CreateMeetingProps {
  onRecordingComplete: (audioBase64: string, mimeType: string) => void;
  onReportComplete?: (reportText: string) => void;
  isProcessing: boolean;
}

const CreateMeeting: React.FC<CreateMeetingProps> = ({ onRecordingComplete, onReportComplete, isProcessing }) => {
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
    <div className="space-y-16 relative z-10 text-crystal font-inter pb-24">
       <header className="border-b border-slate/50 pb-10">
          <div className="flex items-center gap-3 text-[#00FF41] mb-2">
            <Cpu className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Multi-Ingestion Pipeline Initialization</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-crystal to-silver uppercase">
            Data Ingestion
          </h2>
       </header>

       <div className="grid lg:grid-cols-3 gap-8">
          {/* Method A: Live Audio Feed with Actual Microphones */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group border-[#00FF41]/20 hover:border-[#00FF41]/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.05)] min-h-[420px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-[#00FF41] mb-8 flex items-center gap-2">
              Live Feed
            </h3>
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
               <AudioRecorder onRecordingComplete={onRecordingComplete} isProcessing={isProcessing} />
            </div>
          </motion.div>

          {/* Method B: Payload File Upload */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group border-slate/50 hover:border-[#8B5CF6]/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.05)] min-h-[420px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-[#8B5CF6] mb-8">
              Payload Upload
            </h3>
            <input type="file" id="file-upload" className="hidden" accept="audio/*" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="w-full h-full min-h-[220px] flex flex-col items-center justify-center border border-dashed border-white/10 bg-black/40 rounded-xl p-6 group-hover:border-[#8B5CF6]/50 transition-colors cursor-pointer relative z-10">
               <Upload className="w-10 h-10 text-zinc-500 group-hover:text-[#8B5CF6] mb-6 transition-colors" />
               <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">Select Encrypted Audio</p>
            </label>
          </motion.div>

          {/* Method C: Report Text Ingestion */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-panel p-8 rounded-2xl flex flex-col items-stretch justify-start relative overflow-hidden group border-slate/50 hover:border-[#00e5ff]/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.05)] min-h-[420px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-[#00e5ff] mb-8 text-center flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-[#00e5ff]" /> Report Ingestion
            </h3>
            <textarea 
              placeholder="Paste or type meeting report content..." 
              className="w-full h-44 p-4 bg-black/40 border border-white/10 rounded-xl text-[11px] text-white placeholder-zinc-600 focus:outline-none focus:border-[#00e5ff]/50 no-scrollbar resize-none relative z-10 font-mono"
              id="report-input"
            />
            <button 
              onClick={() => {
                const text = (document.getElementById('report-input') as HTMLTextAreaElement)?.value;
                if (text && text.trim() && onReportComplete) {
                  onReportComplete(text);
                } else {
                  alert("Please enter some report text first.");
                }
              }}
              disabled={isProcessing}
              className="mt-4 w-full py-3.5 bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 border border-[#00e5ff]/30 hover:border-[#00e5ff] text-[#00e5ff] rounded-xl text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all relative z-10 disabled:opacity-50"
            >
              Analyze Report Text
            </button>
          </motion.div>
       </div>
    </div>
  );
};

export default CreateMeeting;
