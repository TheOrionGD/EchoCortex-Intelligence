import React from 'react';

interface TimestampProps {
  seconds: number;
  className?: string;
}

export const Timestamp: React.FC<TimestampProps> = ({ seconds, className = '' }) => {
  const format = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <span className={`font-mono text-[10px] tracking-tight tabular-nums ${className}`}>
      {format(seconds)}
    </span>
  );
};

export default Timestamp;