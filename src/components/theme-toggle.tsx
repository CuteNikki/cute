'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return (
      <button
        type='button'
        aria-label='Toggle theme'
        className='fixed right-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md transition-transform hover:scale-110 active:scale-95 sm:right-6 sm:top-6'
      >
        <Sun className='size-5' aria-hidden='true' />
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='fixed right-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md transition-transform hover:scale-110 active:scale-95 sm:right-6 sm:top-6'
    >
      {isDark ? <Moon className='size-5' aria-hidden='true' /> : <Sun className='size-5' aria-hidden='true' />}
    </button>
  );
}
