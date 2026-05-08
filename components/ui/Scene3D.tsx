import React, { useEffect, useRef } from 'react';

// ─── Cortex 3D Neural Network Canvas ────────────────────────────────────────
const CortexVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes
    const nodeCount = 55;
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.5 + Math.random() * 2.5,
      color: i % 5 === 0 ? '#00FF41' : i % 3 === 0 ? '#8B5CF6' : '#00e5ff',
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const isGreen = nodes[i].color === '#00FF41' || nodes[j].color === '#00FF41';
            const isViolet = nodes[i].color === '#8B5CF6' || nodes[j].color === '#8B5CF6';
            ctx.strokeStyle = isGreen
              ? `rgba(0,255,65,${alpha})`
              : isViolet
              ? `rgba(139,92,246,${alpha})`
              : `rgba(0,229,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = 0.7 + Math.sin(n.pulse) * 0.3;

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 8);
        const colorR = n.color === '#00FF41' ? '0,255,65' : n.color === '#8B5CF6' ? '139,92,246' : '0,229,255';
        grd.addColorStop(0, `rgba(${colorR},${0.3 * pulse})`);
        grd.addColorStop(1, `rgba(${colorR},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

// ─── Hexagonal Background Grid ───────────────────────────────────────────────
const HexGrid: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity: 0.035 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="hex-pattern" x="0" y="0" width="80" height="92" patternUnits="userSpaceOnUse">
        <polygon
          points="40,4 76,24 76,68 40,88 4,68 4,24"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex-pattern)" />
  </svg>
);

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Core radial ambient base */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 30%, #060a22 0%, #030511 60%, #010207 100%)' }} />
      
      {/* Repeating Hex Grid */}
      <HexGrid />
      
      {/* Moving Cortex 3D Particles */}
      <div className="absolute inset-0 opacity-[0.45]">
        <CortexVisualization />
      </div>
      
      {/* Dynamic ambient pulse glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#8B5CF6]/8 rounded-full blur-[180px]" />
        <div className="absolute top-[40%] right-[10%] w-[650px] h-[650px] bg-[#00FF41]/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[25%] w-[700px] h-[500px] bg-[#00e5ff]/6 rounded-full blur-[200px]" />
      </div>
    </div>
  );
};

export default Scene3D;
