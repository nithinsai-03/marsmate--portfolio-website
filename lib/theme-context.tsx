'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {mounted ? children : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export const themeColors = {
  dark: {
    background: '#050505',
    surface: 'rgba(15, 15, 20, 0.8)',
    surfaceLight: 'rgba(30, 30, 40, 0.6)',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    accent: '#00d9ff',
    accentGlow: '#ff6b00',
    glassBlur: 'backdrop-filter: blur(12px)',
    fogColor: 0x050505,
    fogDensity: 0.08,
  },
  light: {
    background: '#f5f5f7',
    surface: 'rgba(255, 255, 255, 0.8)',
    surfaceLight: 'rgba(245, 245, 250, 0.6)',
    text: '#1a1a1a',
    textSecondary: '#666666',
    accent: '#007aff',
    accentGlow: '#ff9500',
    glassBlur: 'backdrop-filter: blur(12px)',
    fogColor: 0xf5f5f7,
    fogDensity: 0.05,
  },
};
