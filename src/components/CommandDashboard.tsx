import React, { useState, useEffect, useRef } from 'react';
import { quotes } from '../data/quotes';
import { Activity, Clock, Users, Cpu, HardDrive, ShieldCheck } from 'lucide-react';

export const CommandDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [visitorCount, setVisitorCount] = useState(1337);
  const [ramUsage, setRamUsage] = useState(48.2);
  const [uptime, setUptime] = useState(3600); // 1 hour baseline
  const cpuCanvasRef = useRef<HTMLCanvasElement>(null);

  // UTC clock update
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const dateStr = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
      const timeStr = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
      setCurrentTime(`UTC ${dateStr} ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quotes ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuating values (Telemetry simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      setRamUsage((prev) => {
        const delta = (Math.random() - 0.5) * 0.6;
        return parseFloat(Math.min(Math.max(prev + delta, 45.0), 55.0).toFixed(2));
      });
      setVisitorCount((prev) => prev + (Math.random() > 0.85 ? 1 : 0));
      setUptime((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // CPU Sine Wave Canvas drawing
  useEffect(() => {
    const canvas = cpuCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 150);
    let height = (canvas.height = 40);
    let offset = 0;
    let animationId: number;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Draw gridlines in widget
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 10) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Sine wave calculations
      ctx.strokeStyle = 'var(--accent-lime)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const frequency = 0.05;
        const amplitude = 12 + Math.sin(offset * 0.1) * 3;
        const y = height / 2 + Math.sin(x * frequency + offset) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      offset += 0.08;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const activeQuote = quotes[quoteIndex];

  // Format uptime to hh:mm:ss
  const formatUptime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {/* 1. System Telemetry Widget */}
      <div className="bg-secondary/45 border border-accent-lime/20 rounded p-4 flex flex-col justify-between h-[150px] theme-transition shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-1.5 opacity-10">
          <Activity size={80} />
        </div>
        <div className="flex items-center justify-between border-b border-accent-lime/10 pb-2">
          <span className="font-mono text-[10px] text-accent-lime tracking-widest flex items-center gap-1.5 uppercase font-bold">
            <Cpu size={12} /> Live telemetry
          </span>
          <span className="font-mono text-[8px] bg-accent-lime/10 px-1 text-accent-lime rounded">
            STABLE
          </span>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-text/40">CPU UTILS (ANALOG)</span>
            <canvas ref={cpuCanvasRef} className="mt-1 h-9 rounded" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-mono text-[9px] text-text/40 flex items-center justify-end gap-1">
              <HardDrive size={10} /> RAM ALLOC
            </span>
            <span className="font-mono text-lg font-bold text-text mt-1">{ramUsage}%</span>
            <span className="font-mono text-[8px] text-text/30">MAX: 16.00 GB</span>
          </div>
        </div>
      </div>

      {/* 2. Rotational quote Widget */}
      <div className="bg-secondary/45 border border-accent-lime/20 rounded p-4 flex flex-col justify-between h-[150px] theme-transition relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-accent-lime/10 pb-2">
          <span className="font-mono text-[10px] text-accent-lime tracking-widest flex items-center gap-1.5 uppercase font-bold">
            <ShieldCheck size={12} /> SYSTEM_QUOTES.LOG
          </span>
          <span className="font-mono text-[8px] text-text/30">
            {activeQuote.timestamp}
          </span>
        </div>
        <div className="my-2 flex-1 flex flex-col justify-center">
          <p className="font-mono text-[10px] text-text/90 leading-relaxed italic">
            "{activeQuote.text}"
          </p>
          <p className="font-mono text-[8px] text-accent-orange text-right mt-1.5">
            — {activeQuote.author}
          </p>
        </div>
      </div>

      {/* 3. Server Node Info Widget */}
      <div className="bg-secondary/45 border border-accent-lime/20 rounded p-4 flex flex-col justify-between h-[150px] theme-transition sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between border-b border-accent-lime/10 pb-2">
          <span className="font-mono text-[10px] text-accent-lime tracking-widest flex items-center gap-1.5 uppercase font-bold">
            <Clock size={12} /> Diagnostic Stats
          </span>
          <span className="w-2 h-2 rounded-full bg-accent-mint animate-pulse" />
        </div>
        <div className="flex flex-col gap-1.5 py-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-text/40">SYSTEM TIME:</span>
            <span className="font-mono text-[10px] text-text font-semibold">{currentTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-text/40">ENGINE UP-TIME:</span>
            <span className="font-mono text-[10px] text-accent-orange font-semibold">{formatUptime(uptime)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-text/40 flex items-center gap-1">
              <Users size={10} /> VISITOR TELEMETRY:
            </span>
            <span className="font-mono text-[11px] text-accent-mint font-bold">{visitorCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
