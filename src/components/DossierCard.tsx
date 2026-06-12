import React, { useState } from 'react';
import type { Project } from '../data/projects';
import { playClickSound, playHoverSound } from './Header';
import { Cpu, ExternalLink, ShieldQuestion, HelpCircle, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DossierCardProps {
  project: Project;
}

type TabType = 'overview' | 'dilemma' | 'architecture';

export const DossierCard: React.FC<DossierCardProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const handleTabClick = (tab: TabType) => {
    playClickSound();
    setActiveTab(tab);
  };

  const getCategoryTag = (cat: string) => {
    switch (cat) {
      case 'cloud': return 'AWS Cloud';
      case 'devops': return 'DevOps Pipeline';
      case 'datascience': return 'Data Science';
      case 'automation': return 'Automation Shell';
      case 'personal': return 'Experiments Lab';
      default: return 'Personal';
    }
  };

  return (
    <div className="w-full bg-secondary/35 border border-accent-lime/20 rounded-lg overflow-hidden theme-transition flex flex-col shadow-lg">
      {/* 1. Folder Tabs Titlebar */}
      <div className="flex bg-primary/40 border-b border-accent-lime/10 overflow-x-auto select-none">
        {/* Tab 1: Overview */}
        <button
          onClick={() => handleTabClick('overview')}
          onMouseEnter={playHoverSound}
          className={`font-sans text-[11px] font-semibold px-4 py-2.5 border-r border-accent-lime/15 transition-all relative ${
            activeTab === 'overview'
              ? 'bg-secondary text-accent-lime font-bold border-b border-b-secondary'
              : 'text-text/50 hover:bg-secondary/40 hover:text-text'
          }`}
        >
          {activeTab === 'overview' && (
            <motion.div layoutId={`folder-underline-${project.id}`} className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-lime" />
          )}
          Overview
        </button>

        {/* Tab 2: Problem & Solution */}
        <button
          onClick={() => handleTabClick('dilemma')}
          onMouseEnter={playHoverSound}
          className={`font-sans text-[11px] font-semibold px-4 py-2.5 border-r border-accent-lime/15 transition-all relative ${
            activeTab === 'dilemma'
              ? 'bg-secondary text-accent-lime font-bold border-b border-b-secondary'
              : 'text-text/50 hover:bg-secondary/40 hover:text-text'
          }`}
        >
          {activeTab === 'dilemma' && (
            <motion.div layoutId={`folder-underline-${project.id}`} className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-lime" />
          )}
          Problem & Solution
        </button>

        {/* Tab 3: Tech & Architecture */}
        <button
          onClick={() => handleTabClick('architecture')}
          onMouseEnter={playHoverSound}
          className={`font-sans text-[11px] font-semibold px-4 py-2.5 border-r border-accent-lime/15 transition-all relative ${
            activeTab === 'architecture'
              ? 'bg-secondary text-accent-lime font-bold border-b border-b-secondary'
              : 'text-text/50 hover:bg-secondary/40 hover:text-text'
          }`}
        >
          {activeTab === 'architecture' && (
            <motion.div layoutId={`folder-underline-${project.id}`} className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-lime" />
          )}
          Architecture & Specs
        </button>
      </div>

      {/* 2. Folder Body Contents */}
      <div className="p-5 flex-1 flex flex-col justify-between min-h-[240px]">
        <div>
          {/* Card Meta details */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[8px] bg-accent-lime/10 text-accent-lime border border-accent-lime/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">
              {getCategoryTag(project.category)}
            </span>
            <span className="font-mono text-[8px] text-text/30">REF: {project.id.toUpperCase()}</span>
          </div>

          <h3 className="font-mono text-lg font-bold text-text mb-3 border-b border-text/5 pb-1 flex items-center flex-wrap gap-2">
            <span>{project.title}</span>
            {project.inProgress && (
              <span className="text-[8px] bg-accent-orange/10 text-accent-orange border border-accent-orange/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                IN PROGRESS
              </span>
            )}
          </h3>

          {/* Tab Pages Switch */}
          <div className="font-mono text-xs text-text/80 leading-relaxed min-h-[120px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <p>{project.overview}</p>
                  
                  {/* Skill badges in Overview */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 border border-text/10 bg-primary/20 text-text/60 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'dilemma' && (
                <motion.div
                  key="dilemma"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-3.5"
                >
                  <div>
                    <span className="text-[9px] text-accent-orange font-bold flex items-center gap-1.5 border-b border-accent-orange/10 pb-0.5 mb-1.5">
                      <ShieldQuestion size={11} /> THE PROBLEM:
                    </span>
                    <p className="text-[11px] text-text/75">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-accent-mint font-bold flex items-center gap-1.5 border-b border-accent-mint/10 pb-0.5 mb-1.5">
                      <HelpCircle size={11} /> THE SOLUTION:
                    </span>
                    <p className="text-[11px] text-text/75">{project.solution}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-3.5"
                >
                  <div>
                    <span className="text-[9px] text-accent-lime font-bold flex items-center gap-1.5 border-b border-accent-lime/10 pb-0.5 mb-1.5">
                      <Cpu size={11} /> DEPLOY_PIPELINE:
                    </span>
                    <code className="text-[10px] text-accent-lime/90 block bg-primary/50 p-1.5 border border-text/5 rounded whitespace-pre-line leading-relaxed">
                      {project.architecture}
                    </code>
                  </div>
                  <div>
                    <span className="text-[9px] text-text/45 font-bold flex items-center gap-1.5 border-b border-text/10 pb-0.5 mb-1.5">
                      <FileSpreadsheet size={11} /> RETRO_ANALYSIS:
                    </span>
                    <p className="text-[11px] text-text/70">{project.lessonsLearned}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-text/10 pt-3 mt-4 flex items-center justify-between">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-sans text-[10px] font-semibold text-text/60 hover:text-accent-lime flex items-center gap-1.5 px-3 py-1.5 border border-text/15 hover:border-accent-lime/40 rounded transition-all"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            <span>GitHub Repository</span>
          </a>

          {project.featured && (
            <motion.a
              href="/projects/infrastructure-builder"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="font-sans text-[10px] text-accent-lime bg-accent-lime/10 hover:bg-accent-lime/25 border border-accent-lime/30 px-3 py-1.5 rounded flex items-center gap-1.5 transition-all shadow-inner font-bold cursor-pointer"
            >
              <span>Interactive Blueprint</span>
              <ExternalLink size={10} />
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
};
