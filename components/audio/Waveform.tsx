import React from 'react';

interface WaveformProps {
  isActive?: boolean;
  barCount?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ isActive = false, barCount = 16 }) => {
  return (
    <div className="flex items-center gap-1 h-12">
      {[...Array(barCount)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-accent/40 rounded-full transition-all duration-500 ${isActive ? 'animate-pulse' : 'h-1'}`}
          style={{
            height: isActive ? `${Math.random() * 80 + 20}%` : '4px',
            animationDelay: `${i * 0.05}s`
          }}
        />
      ))}
    </div>
  );
};

export default Waveform;