'use client';

import { useTheme } from '@/lib/theme-context';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-50 p-3 rounded-full backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun
            className="w-6 h-6 text-yellow-400 transition-all duration-500 ease-out"
            strokeWidth={1.5}
          />
        ) : (
          <Moon
            className="w-6 h-6 text-slate-700 transition-all duration-500 ease-out"
            strokeWidth={1.5}
          />
        )}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/0 to-purple-600/0 group-hover:from-cyan-400/20 group-hover:to-purple-600/20 transition-all duration-300" />
    </button>
  );
}
