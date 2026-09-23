'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

// The outline variant sets dark:bg-transparent and dark:hover:bg-input/30, which are more
// specific than our plain bg-card/hover:bg-card overrides - without matching dark: versions,
// dark mode would show a transparent button (page background bleeding through) instead of
// bg-card, and a muted-gray hover instead of the intended tint.
const TOGGLE_CLASS =
  'fixed right-4 top-4 z-50 size-11 rounded-full border border-border bg-card text-primary shadow-md transition-transform hover:scale-110 hover:bg-card active:scale-95 dark:bg-card dark:hover:bg-card sm:right-6 sm:top-6';

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
      <Button type='button' variant='outline' size='icon' aria-label='Toggle theme' className={TOGGLE_CLASS}>
        <Sun className='size-5' aria-hidden='true' />
      </Button>
    );
  }

  return (
    <Button
      type='button'
      variant='outline'
      size='icon'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={TOGGLE_CLASS}
    >
      {isDark ? <Moon className='size-5' aria-hidden='true' /> : <Sun className='size-5' aria-hidden='true' />}
    </Button>
  );
}
