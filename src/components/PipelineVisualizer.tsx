import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldAlert } from 'lucide-react';

interface PipelineVisualizerProps {
  status: 'idle' | 'sending' | 'success' | 'error';
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ status }) => {
  return (
    <div className="w-full bg-secondary/45 border border-accent-lime/20 rounded-lg p-4 flex flex-col justify-between theme-transition relative overflow-hidden h-[180px]">
      <div className="flex border-b border-text/10 pb-2 mb-2 items-center justify-between">
        <span className="font-mono text-[9px] text-accent-lime tracking-widest uppercase font-bold flex items-center gap-1.5">
          <Terminal size={12} /> TRANSMISSION PIPELINE
        </span>
        <span className="font-mono text-[8px] text-text/30">PORT: SSL_993</span>
      </div>

      {/* SVG Pipeline Animation */}
      <div className="flex-1 flex items-center justify-center py-2 relative">
        <svg viewBox="0 0 100 20" className="w-full h-full">
          {/* Base pipeline track */}
          <path
            d="M 5,10 H 95"
            stroke="var(--bg-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 5,10 H 95"
            stroke="var(--text-primary)"
            strokeWidth="0.5"
            opacity="0.15"
            strokeLinecap="round"
          />

          {/* Pulse path glow during send */}
          {status === 'sending' && (
            <motion.path
              d="M 5,10 H 95"
              stroke="var(--accent-lime)"
              strokeWidth="0.75"
              strokeLinecap="round"
              initial={{ strokeDasharray: "2, 15", strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
            />
          )}

          {/* Source node (Client form) */}
          <circle
            cx="5"
            cy="10"
            r="2"
            fill={status === 'sending' ? 'var(--accent-orange)' : status === 'success' ? 'var(--accent-mint)' : 'var(--text-primary)'}
            opacity="0.8"
          />
          <text x="5" y="16" textAnchor="middle" fill="var(--text-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.4">CLIENT</text>

          {/* Animated data packet traveling */}
          {status === 'sending' && (
            <motion.circle
              cx="5"
              cy="10"
              r="1.5"
              fill="var(--accent-lime)"
              initial={{ cx: 5 }}
              animate={{ cx: 95 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          )}

          {/* Destination node (Server Core) */}
          <circle
            cx="95"
            cy="10"
            r={status === 'success' ? 3.5 : 2}
            fill={status === 'success' ? 'var(--accent-mint)' : status === 'sending' ? 'var(--accent-lime)' : 'var(--text-primary)'}
            opacity="0.8"
            className={status === 'success' ? 'animate-ping' : ''}
          />
          <circle
            cx="95"
            cy="10"
            r="2"
            fill={status === 'success' ? 'var(--accent-mint)' : status === 'sending' ? 'var(--accent-lime)' : 'var(--text-primary)'}
            opacity="1"
          />
          <text x="95" y="16" textAnchor="middle" fill="var(--text-primary)" fontSize="1.8" fontFamily="monospace" opacity="0.4">SERVER</text>
        </svg>

        {/* Text descriptions overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-mono text-[9px]">
          {status === 'idle' && (
            <span className="text-text/30 tracking-wider">AWAITING INPUT DATA STREAM</span>
          )}
          {status === 'sending' && (
            <span className="text-accent-orange animate-pulse">COMPILING PACKETS AND TRANSMITTING...</span>
          )}
          {status === 'success' && (
            <span className="text-accent-mint font-bold flex items-center gap-1">
              [DELIVERED] PROTOCOL COMPLETE (ACK_200)
            </span>
          )}
          {status === 'error' && (
            <span className="text-red-500 font-bold flex items-center gap-1">
              <ShieldAlert size={10} /> ACCESS RESTRICTED / TIMEOUT
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-text/10 pt-2 flex items-center justify-between font-mono text-[8px] text-text/30">
        <span>ENCRYPTION: SH256</span>
        <span>GATEWAY_STATUS: ACTIVE</span>
      </div>
    </div>
  );
};
