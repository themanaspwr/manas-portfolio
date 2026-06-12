import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, Cpu, BookOpen, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';
import { skillNodes } from '../data/skills';
import { playClickSound, playHoverSound } from './Header';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  title: string;
  category: 'Pages' | 'Projects' | 'Blogs' | 'Skills';
  path: string;
  subtitle?: string;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle palette open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
        playClickSound();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Index search database
  const getResults = (): SearchResult[] => {
    const defaultPages: SearchResult[] = [
      { title: 'Personal Command Center', category: 'Pages', path: '/' },
      { title: 'Project Laboratory', category: 'Pages', path: '/projects' },
      { title: 'Skills Constellation', category: 'Pages', path: '/experiments' },
      { title: 'Digital Notebook Blog', category: 'Pages', path: '/blog' },
      { title: 'System Logs (Journey)', category: 'Pages', path: '/journey' },
      { title: 'Interactive Resume', category: 'Pages', path: '/resume' },
      { title: 'Futuristic Communication Console', category: 'Pages', path: '/contact' },
    ];

    const projectItems: SearchResult[] = projects.map((p) => ({
      title: p.title,
      category: 'Projects',
      path: p.featured ? '/projects/infrastructure-builder' : '/projects',
      subtitle: p.overview,
    }));

    const blogItems: SearchResult[] = blogs.map((b) => ({
      title: b.title,
      category: 'Blogs',
      path: `/blog?id=${b.id}`,
      subtitle: b.excerpt,
    }));

    const skillItems: SearchResult[] = skillNodes.map((s) => ({
      title: s.name,
      category: 'Skills',
      path: '/experiments',
      subtitle: `${s.notes.substring(0, 50)}...`,
    }));

    const all = [...defaultPages, ...projectItems, ...blogItems, ...skillItems];

    if (!query) return all.slice(0, 7);

    return all.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const results = getResults();

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
      playHoverSound();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      playHoverSound();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (item: SearchResult) => {
    // Sudo Easter Egg handler
    if (query.toLowerCase().trim() === 'sudo matrix') {
      triggerMatrixOverlay();
      setIsOpen(false);
      setQuery('');
      return;
    }

    if (item) {
      playClickSound();
      navigate(item.path);
      setIsOpen(false);
      setQuery('');
    }
  };

  // Easter egg function
  const triggerMatrixOverlay = () => {
    let div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.inset = '0';
    div.style.backgroundColor = 'black';
    div.style.color = '#00E1B5';
    div.style.fontFamily = 'monospace';
    div.style.zIndex = '99999';
    div.style.padding = '20px';
    div.style.overflowY = 'hidden';
    div.style.pointerEvents = 'none';

    let pre = document.createElement('pre');
    div.appendChild(pre);
    document.body.appendChild(div);

    let lines = [
      'SYS.INIT: ACCESSING ROOT DIRECTORY...',
      'CONNECTING TO CENTRAL NETWORK NODE: SECURE_CORE_0...',
      'ALERT: BYPASSING SECURITY BOUNDARIES...',
      'SYSTEM STATUS: ACTIVE',
      'INTRUSION LEVEL: TRACELESS',
      'LAUNCHING PROTOCOL: THE_CONSTELLATION...',
    ];

    let count = 0;
    let interval = setInterval(() => {
      if (count < 25) {
        let line = lines[count % lines.length] + '\n' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 2)).join(' ');
        pre.textContent = line + '\n\n' + pre.textContent;
        count++;
      } else {
        clearInterval(interval);
        pre.textContent = 'ACCESS GRANTED. COMMAND TERMINATED.';
        setTimeout(() => {
          document.body.removeChild(div);
        }, 1500);
      }
    }, 120);
  };

  return (
    <>
      {/* Floating command prompt trigger helper in bottom right */}
      <button
        onClick={() => { setIsOpen(true); playClickSound(); }}
        className="fixed bottom-4 right-4 bg-secondary border border-accent-lime/30 text-accent-lime hover:bg-accent-lime/10 px-3 py-1.5 rounded-md font-mono text-[10px] tracking-wider flex items-center gap-1.5 z-40 transition-all shadow-md theme-transition"
      >
        <Terminal size={11} />
        <span>CMD PANEL</span>
        <kbd className="bg-primary px-1.5 py-0.5 rounded text-[8px] border border-text/10 text-text/60">Ctrl+K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
            />

            {/* Panel Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-xl bg-secondary border border-accent-lime/40 rounded-lg shadow-2xl overflow-hidden flex flex-col theme-transition"
            >
              {/* Search Header */}
              <div className="flex items-center border-b border-accent-lime/20 px-4 py-3 gap-3">
                <Search size={16} className="text-accent-lime" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a page, project, skill or 'sudo matrix'..."
                  className="bg-transparent border-none outline-none font-mono text-xs text-text placeholder-text/30 flex-1"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-[9px] text-text/40 hover:text-accent-lime border border-text/10 hover:border-accent-lime/30 px-1.5 py-0.5 rounded"
                >
                  ESC
                </button>
              </div>

              {/* Search Listings */}
              <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2 flex flex-col gap-1">
                {results.length > 0 ? (
                  results.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.title + item.category}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => { setSelectedIndex(idx); playHoverSound(); }}
                        className={`p-2.5 rounded cursor-pointer font-mono transition-all flex items-start justify-between border ${
                          isSelected
                            ? 'bg-accent-lime/10 border-accent-lime/30 text-accent-lime'
                            : 'border-transparent text-text/80 hover:bg-primary/20'
                        }`}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            {item.category === 'Pages' && <User size={12} />}
                            {item.category === 'Projects' && <Cpu size={12} />}
                            {item.category === 'Blogs' && <BookOpen size={12} />}
                            {item.category === 'Skills' && <Terminal size={12} />}
                            <span>{item.title}</span>
                          </div>
                          {item.subtitle && (
                            <p className="text-[10px] text-text/40 mt-1 truncate">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                            isSelected 
                              ? 'border-accent-lime/30 bg-accent-lime/5 text-accent-lime' 
                              : 'border-text/10 bg-primary/40 text-text/40'
                          }`}>
                            {item.category}
                          </span>
                          {isSelected && <ArrowRight size={10} className="text-accent-lime" />}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-text/30 font-mono text-xs">
                    No diagnostics matching query. System clear.
                  </div>
                )}
              </div>

              {/* Keyboard Help Footer */}
              <div className="border-t border-accent-lime/15 px-4 py-2 bg-primary/45 flex items-center justify-between font-mono text-[9px] text-text/40">
                <span className="flex items-center gap-1">
                  ↑↓ Nav | <CornerDownLeft size={10} /> Enter to execute
                </span>
                <span>SYS LOGS v1.0.3</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
