'use client';

import { MotionConfig } from 'motion/react';

/**
 * Wraps the app in a shared motion config so every animation respects the
 * user's OS-level "reduce motion" preference automatically.
 */
export function AnimationRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
