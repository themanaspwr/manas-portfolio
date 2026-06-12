import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import type { ThemeMode } from '../context/ThemeContext';
import { Terminal, BookOpen, Compass, Cpu, FileText, Send, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sound generators silenced
export const playHoverSound = () => {};
export const playClickSound = () => {};

const navItems = [
  { name: 'Projects', path: '/projects', icon: Cpu },
  { name: 'Experiments', path: '/experiments', icon: Compass },
  { name: 'Blog', path: '/blog', icon: BookOpen },
  { name: 'Journey', path: '/journey', icon: Terminal },
  { name: 'Resume', path: '/resume', icon: FileText },
  { name: 'Contact', path: '/contact', icon: Send },
];

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as ThemeMode);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
      <div className="bg-secondary/80 backdrop-blur-md border border-accent-lime/20 rounded-md py-2 px-4 flex items-center justify-between shadow-lg theme-transition">
        {/* Core ID */}
        <NavLink 
          to="/" 
          className="font-sans text-accent-lime font-extrabold text-base tracking-tight flex items-center gap-1.5"
        >
          Manas Pawar
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `font-sans font-medium text-xs px-3 py-1.5 rounded transition-all flex items-center gap-1 ${
                  isActive 
                    ? 'text-accent-lime border border-accent-lime/25 bg-accent-lime/5' 
                    : 'text-text/70 hover:text-text hover:bg-primary/40'
                }`
              }
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Global Control Widgets */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <div className="relative">
            <select
              value={theme}
              onChange={handleThemeChange}
              className="appearance-none font-mono text-[10px] bg-primary border border-text/20 rounded py-1 pl-2.5 pr-6 text-text/85 focus:outline-none focus:border-accent-lime hover:border-text/40 transition-all cursor-pointer"
            >
              <option value="laboratory">ATELIER (DARK)</option>
              <option value="scientific-notebook">BLUEPRINT (LIGHT)</option>
              <option value="midnight-terminal">MONOCHROME</option>
            </select>
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-text/50">
              <Eye size={10} />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => { setMenuOpen(!menuOpen); playClickSound(); }}
            onMouseEnter={playHoverSound}
            className="md:hidden p-1.5 border border-accent-lime/30 rounded text-accent-lime hover:bg-accent-lime/10"
          >
            <span className="font-mono text-xs">[SYS]</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-14 left-0 right-0 bg-secondary border border-accent-lime/20 rounded shadow-2xl p-4 md:hidden flex flex-col gap-2.5 z-40 theme-transition"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => { setMenuOpen(false); playClickSound(); }}
                className={({ isActive }) => 
                  `font-sans font-medium text-xs p-2.5 rounded flex items-center justify-between transition-all ${
                    isActive 
                      ? 'text-accent-lime bg-accent-lime/5 border border-accent-lime/20' 
                      : 'text-text/70 hover:text-text hover:bg-primary/55'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <item.icon size={13} />
                  {item.name}
                </span>
                <span className="text-[10px] text-text/40">View</span>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
