'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'motion/react';

import { ChevronDownIcon } from 'lucide-react';

/**
 * A mobile-only nudge that appears above the fold to encourage visitors to
 * keep scrolling instead of bouncing after the first screen. Shows as soon
 * as it mounts (no timer to get delayed by other work on the page), and
 * hides for good once the visitor has scrolled a bit.
 */
export function ScrollHint() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 120) {
        setDismissed(true);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToGallery() {
    setDismissed(true);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.button
          type='button'
          onClick={scrollToGallery}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: [0.9, 1.06, 1] }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className='fixed inset-x-0 bottom-5 z-40 mx-auto flex w-fit items-center gap-2 rounded-full border-2 border-primary-foreground/30 bg-primary px-5 py-3 text-base font-bold text-primary-foreground shadow-xl shadow-primary/50 lg:hidden'
        >
          <span>take a look at the gallery</span>
          <ChevronDownIcon className='size-5' aria-hidden='true' />
          <span className='sr-only'>Scroll down to see the gallery</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
