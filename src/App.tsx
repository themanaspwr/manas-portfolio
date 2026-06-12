import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { AnimatedGrid } from './components/AnimatedGrid';
import { CommandPalette } from './components/CommandPalette';
import { Home } from './views/Home';
import { About } from './views/About';
import { Projects } from './views/Projects';
import { FeaturedProject } from './views/FeaturedProject';
import { SkillsView } from './views/SkillsView';
import { BlogView } from './views/Blog';
import { BuildLogsView } from './views/BuildLogsView';
import { ResumeView } from './views/ResumeView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { playClickSound } from './components/Header';

export const App: React.FC = () => {
  // Konami Code Easter Egg Listener
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerKonamiCode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerKonamiCode = () => {
    playClickSound();
    alert("SYSTEM OVERRIDE DETECTED.\nKONAMI CODE VALIDATED.\n[EASTER EGG LOADED]");
    // Turn the background matrix overlay on briefly
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = 'rgba(196, 255, 14, 0.1)';
    overlay.style.zIndex = '9999';
    overlay.style.pointerEvents = 'none';
    overlay.style.border = '20px double var(--accent-lime)';
    overlay.style.boxShadow = 'inset 0 0 100px rgba(0, 225, 181, 0.5)';
    overlay.className = 'flicker-overlay';
    document.body.appendChild(overlay);

    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Grid Particles Background */}
      <AnimatedGrid />

      {/* Floating Brackets Navigation Navbar */}
      <Header />

      {/* Command prompt palette (Ctrl+K overlay) */}
      <CommandPalette />

      {/* Router Viewports */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/infrastructure-builder" element={<FeaturedProject />} />
        <Route path="/experiments" element={<SkillsView />} />
        <Route path="/blog" element={<BlogView />} />
        <Route path="/build-logs" element={<BuildLogsView />} />
        <Route path="/resume" element={<ResumeView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </div>
  );
};

export default App;
