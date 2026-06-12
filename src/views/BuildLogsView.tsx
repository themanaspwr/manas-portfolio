import React, { useState } from 'react';
import { buildLogs } from '../data/buildLogs';
import { playClickSound, playHoverSound } from '../components/Header';
import { Terminal, ShieldAlert, Cpu, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export const BuildLogsView: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string | null) => {
    playClickSound();
    setSelectedTag(tag);
  };

  const allTags = Array.from(
    new Set(buildLogs.flatMap((log) => log.tags))
  );

  const filteredLogs = selectedTag
    ? buildLogs.filter((log) => log.tags.includes(selectedTag))
    : buildLogs;

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        {/* Header */}
        <section className="border-b border-text/10 pb-4">
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
            <Terminal className="text-accent-orange" /> BUILD_LOGS.LOG
          </h2>
          <p className="font-mono text-xs text-text/50 mt-1">
            Raw stream of debugging telemetry, hardware faults, software corrections, and next-action pipelines.
          </p>
        </section>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 justify-start border-b border-text/5 pb-4">
          <button
            onClick={() => handleTagClick(null)}
            onMouseEnter={playHoverSound}
            className={`font-mono text-[9px] px-2.5 py-1.5 rounded border transition-all ${
              !selectedTag
                ? 'border-accent-orange bg-accent-orange/10 text-accent-orange font-bold'
                : 'border-text/10 text-text/45 hover:border-text/20'
            }`}
          >
            [ALL LOGS]
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              onMouseEnter={playHoverSound}
              className={`font-mono text-[9px] px-2.5 py-1.5 rounded border transition-all ${
                selectedTag === tag
                  ? 'border-accent-orange bg-accent-orange/10 text-accent-orange font-bold'
                  : 'border-text/10 text-text/45 hover:border-text/20'
              }`}
            >
              [#{tag.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* Build log list */}
        <section className="flex flex-col gap-6">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-secondary/35 border border-text/10 rounded-lg p-5 theme-transition flex flex-col gap-4 font-mono text-[10px] leading-relaxed shadow"
            >
              {/* Header metadata bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-text/10 pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-accent-orange font-bold flex items-center gap-1">
                    <Calendar size={11} /> {log.date}
                  </span>
                  <span className="text-accent-lime font-bold">
                    CODE: {log.id}
                  </span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.2 rounded border border-text/10 bg-primary/45 text-[8px] text-text/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Log Topic */}
              <h3 className="text-xs font-bold text-text flex items-center gap-1.5 border-b border-text/5 pb-1">
                <Cpu size={12} className="text-accent-lime" /> TOPIC: {log.topic.toUpperCase()}
              </h3>

              {/* Log fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                {/* 1. What I learned */}
                <div className="p-3 bg-primary/25 border border-text/5 rounded">
                  <span className="text-accent-lime font-bold block mb-1">
                    [01.WHAT I LEARNED]
                  </span>
                  <p className="text-text/75">{log.learned}</p>
                </div>

                {/* 2. What broke (Red glow alert) */}
                <div className="p-3 bg-red-500/5 border border-red-500/15 rounded">
                  <span className="text-accent-orange font-bold block mb-1 flex items-center gap-1">
                    <ShieldAlert size={11} className="text-accent-orange" /> [02.WHAT BROKE]
                  </span>
                  <p className="text-text/75">{log.broke}</p>
                </div>

                {/* 3. How I fixed it (Green success check) */}
                <div className="p-3 bg-accent-mint/5 border border-accent-mint/15 rounded">
                  <span className="text-accent-mint font-bold block mb-1 flex items-center gap-1">
                    <ShieldCheck size={11} className="text-accent-mint" /> [03.HOW I FIXED IT]
                  </span>
                  <p className="text-text/75">{log.fixed}</p>
                </div>

                {/* 4. What's next */}
                <div className="p-3 bg-primary/25 border border-text/5 rounded">
                  <span className="text-text/45 font-bold block mb-1 flex items-center gap-1">
                    <ArrowRight size={11} className="text-text/45" /> [04.NEXT PIPELINE TARGET]
                  </span>
                  <p className="text-text/75">{log.next}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="p-16 text-center font-mono text-xs text-text/30 border border-dashed border-text/10 rounded">
              NO ENGINEERING BUILD RECORDS CONFORM TO SELECTED TAGS
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
