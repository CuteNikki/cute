'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import { ChevronDownIcon } from 'lucide-react';

/**
 * A mobile-only nudge that appears above the fold to encourage visitors to
 * keep scrolling instead of bouncing after the first screen. Hides itself
 * once the visitor has scrolled a bit, and stays gone for the rest of the
 * session (so it never re-appears while scrolling back up).
 */
export function ScrollHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Give the entrance animations a moment to settle before nudging.
    const showTimer = setTimeout(() => setVisible(true), 1200);

    function handleScroll() {
      if (window.scrollY > 120) {
        setDismissed(true);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToNext() {
    setDismissed(true);
    window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.button
          type='button'
          onClick={scrollToNext}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4 }}
          className='fixed inset-x-0 bottom-5 z-40 mx-auto flex w-fit items-center gap-1.5 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold text-foreground shadow-md backdrop-blur-sm lg:hidden'
        >
          <span>there&apos;s more below</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className='flex text-primary'
          >
            <ChevronDownIcon className='size-4' aria-hidden='true' />
          </motion.span>
          <span className='sr-only'>Scroll down for more</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
