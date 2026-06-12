import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'laboratory' | 'scientific-notebook' | 'midnight-terminal';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('manas-portfolio-theme');
    if (saved === 'scientific-notebook' || saved === 'laboratory' || saved === 'midnight-terminal') {
      return saved;
    }
    return 'laboratory'; // Default theme
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('manas-portfolio-theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.removeAttribute('data-theme');
    root.setAttribute('data-theme', theme);

    // Clean, modern layout without CRT scanlines overlay to preserve high-readability business style.
    root.classList.remove('crt-scanlines');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
