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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className='fixed inset-x-0 bottom-5 z-40 mx-auto flex w-fit items-center gap-1.5 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold text-foreground shadow-md backdrop-blur-sm lg:hidden'
        >
          <span>take a look at the gallery</span>
          <ChevronDownIcon className='size-4 text-primary' aria-hidden='true' />
          <span className='sr-only'>Scroll down to see the gallery</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
