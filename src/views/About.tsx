import React, { useState } from 'react';
import { systemLogs } from '../data/logs';
import { playClickSound, playHoverSound } from '../components/Header';
import { Terminal, Calendar, Award, GraduationCap, Target, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const About: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const categories = ['all', 'SYSTEM', 'EDUCATION', 'CERTIFICATION', 'MILESTONE', 'GOAL'];

  const handleCategoryChange = (cat: string) => {
    playClickSound();
    setActiveCategory(cat);
    setExpandedLog(null); // Reset expansions
  };

  const handleLogClick = (idx: number) => {
    playClickSound();
    setExpandedLog((prev) => (prev === idx ? null : idx));
  };

  const filteredLogs = activeCategory === 'all'
    ? systemLogs
    : systemLogs.filter((log) => log.category === activeCategory);

  const getLogIcon = (cat: string) => {
    switch (cat) {
      case 'EDUCATION': return <GraduationCap size={14} className="text-accent-orange" />;
      case 'CERTIFICATION': return <Award size={14} className="text-accent-mint" />;
      case 'GOAL': return <Target size={14} className="text-accent-lime" />;
      case 'MILESTONE': return <Cpu size={14} className="text-accent-lime" />;
      case 'SYSTEM':
      default: return <Terminal size={14} className="text-text/75" />;
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'SUCCESS': return 'text-accent-mint border-accent-mint/30 bg-accent-mint/5';
      case 'WARNING': return 'text-accent-orange border-accent-orange/30 bg-accent-orange/5';
      case 'TARGET': return 'text-accent-lime border-accent-lime/30 bg-accent-lime/5';
      case 'MILESTONE': return 'text-accent-lime border-accent-lime/30 bg-accent-lime/5';
      case 'INFO':
      default: return 'text-text/60 border-text/10 bg-primary/45';
    }
  };

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* About Header */}
        <section className="border-b border-text/10 pb-4">
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
            <Terminal className="text-accent-lime" /> SYSTEM_LOGS.EXE
          </h2>
          <p className="font-mono text-xs text-text/50 mt-1">
            Running core biography analysis. Filtering career nodes and certification footprints.
          </p>
        </section>

        {/* Bio Pitch widget */}
        <section className="bg-secondary/45 border border-text/10 rounded p-5 theme-transition flex flex-col sm:flex-row gap-5 items-center sm:items-start">

          <div className="flex-1">
            <h3 className="font-mono text-xs font-bold text-accent-lime tracking-wider mb-2">
              [SYS_OVERVIEW.DAT]
            </h3>
            <p className="font-mono text-xs text-text/80 leading-relaxed">
              I am Manas Pawar, an aspiring developer and M.Sc. Computer Applications student specializing in Data Science. I focus on learning by building, experimenting with machine learning workflows, data analysis pipelines, and cloud automation protocols. I treat this website as a builder's journal to log my technical journey and growth.
            </p>
          </div>
        </section>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2.5 justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              onMouseEnter={playHoverSound}
              className={`font-mono text-[9px] px-2.5 py-1.5 rounded border transition-all ${
                activeCategory === cat
                  ? 'border-accent-lime bg-accent-lime/10 text-accent-lime font-bold'
                  : 'border-text/10 text-text/40 hover:border-text/30 hover:text-text'
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        {/* Timeline Log Streams */}
        <section className="flex flex-col gap-3 relative">
          {/* Vertical timeline guide wire */}
          <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-text/10 pointer-events-none" />

          <AnimatePresence mode="popLayout">
            {filteredLogs.map((log, idx) => {
              const isExpanded = expandedLog === idx;
              return (
                <motion.div
                  key={log.timestamp + log.message}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="pl-12 relative flex flex-col w-full"
                >
                  {/* Floating timeline dot */}
                  <div className="absolute left-[11px] top-3.5 w-4.5 h-4.5 rounded-full bg-secondary border border-text/10 flex items-center justify-center z-10 p-0.5 shadow">
                    {getLogIcon(log.category)}
                  </div>

                  {/* Log Card Box */}
                  <div
                    onClick={() => handleLogClick(idx)}
                    className={`p-3.5 bg-secondary/35 border border-text/5 hover:border-accent-lime/30 rounded cursor-pointer transition-all flex flex-col justify-between select-none ${
                      isExpanded ? 'border-accent-lime/20 bg-secondary/60 shadow-lg' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      {/* Log stamp */}
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-accent-orange font-bold flex items-center gap-1">
                          <Calendar size={11} /> {log.timestamp}
                        </span>
                        <span className={`px-1.5 py-0.2 rounded border text-[8px] font-bold ${getLogLevelColor(log.level)}`}>
                          [{log.level}]
                        </span>
                        <span className="text-text/30">|</span>
                        <span className="text-text/50 uppercase text-[8px] tracking-wide bg-primary/40 px-1 border border-text/5 rounded">
                          {log.category}
                        </span>
                      </div>

                      {/* Expanding indicators */}
                      <div className="text-text/40 self-end sm:self-center">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>

                    <h4 className="font-mono text-xs font-semibold text-text mt-2 leading-relaxed">
                      {log.message}
                    </h4>

                    {/* Expandable info logs */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="font-mono text-[10px] text-text/70 mt-3 pt-3 border-t border-text/15 leading-relaxed bg-primary/30 p-2.5 rounded border border-text/5">
                            <span className="text-accent-lime font-bold block mb-1">LOG DIAGNOSTICS:</span>
                            {log.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center font-mono text-xs text-text/30 border border-dashed border-text/10 rounded">
              NO TIMELINE RECORDS MATCHING SELECTION
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
