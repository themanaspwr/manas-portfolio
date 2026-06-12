import React, { useState } from 'react';
import { projects } from '../data/projects';
import { DossierCard } from '../components/DossierCard';
import { playClickSound, playHoverSound } from '../components/Header';
import { Cpu, Terminal, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { label: 'ALL FILES', value: 'all' },
    { label: 'CLOUD_OPS', value: 'cloud' },
    { label: 'DEVOPS_ENG', value: 'devops' },
    { label: 'DATA_SCIENCE', value: 'datascience' },
    { label: 'AUTOMATION', value: 'automation' },
    { label: 'PERSONAL_LAB', value: 'personal' }
  ];

  const handleFilterSelect = (val: string) => {
    playClickSound();
    setFilter(val);
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <main className="w-full min-h-screen pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        
        <section className="border-b border-text/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
              <Cpu className="text-accent-lime" /> PROJECT_LABORATORY.BIN
            </h2>
            <p className="font-mono text-xs text-text/50 mt-1">
              Active directory of developed modules, deployment repositories, and neural pipelines.
            </p>
          </div>
          <Link
            to="/projects/infrastructure-builder"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-[10px] text-accent-lime border border-accent-lime bg-accent-lime/10 px-3 py-1.5 rounded flex items-center gap-1.5 self-start md:self-auto hover:bg-accent-lime/20 transition-all font-bold animate-pulse"
          >
            <Compass size={12} />
            <span>OPEN_PIPELINE_BLUEPRINT</span>
          </Link>
        </section>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap gap-2 justify-start border-b border-text/5 pb-4">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterSelect(f.value)}
              onMouseEnter={playHoverSound}
              className={`font-mono text-[9px] px-3 py-1.5 rounded border transition-all ${
                filter === f.value
                  ? 'border-accent-lime bg-accent-lime/10 text-accent-lime font-bold shadow'
                  : 'border-text/10 text-text/45 hover:border-text/30 hover:text-text'
              }`}
            >
              [{f.label}]
            </button>
          ))}
        </div>

        {/* Projects Grid Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="w-full flex"
              >
                <DossierCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-2 p-16 text-center font-mono text-xs text-text/30 border border-dashed border-text/10 rounded">
              <Terminal size={24} className="mx-auto mb-2 text-text/20 animate-pulse" />
              NO REGISTERED BLUEPRINTS MATCHING FILTER PARAMETERS
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
