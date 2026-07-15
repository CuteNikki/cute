import { Sparkle } from 'lucide-react';

import { cn } from '@/lib/utils';

type SparkleSpec = {
  top: string;
  left: string;
  size: number;
  delay: string;
  className?: string;
};

const DEFAULT_SPARKLES: SparkleSpec[] = [
  { top: '8%', left: '6%', size: 22, delay: '0s' },
  { top: '18%', left: '90%', size: 16, delay: '0.6s' },
  { top: '52%', left: '3%', size: 18, delay: '1.2s' },
  { top: '70%', left: '94%', size: 24, delay: '0.3s' },
  { top: '88%', left: '12%', size: 14, delay: '1.8s' },
  { top: '40%', left: '82%', size: 12, delay: '2.2s' },
];

export function Sparkles({ sparkles = DEFAULT_SPARKLES, className }: { sparkles?: SparkleSpec[]; className?: string }) {
  return (
    <div aria-hidden='true' className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {sparkles.map((s, i) => (
        <Sparkle
          key={i}
          className={cn('absolute animate-twinkle fill-accent text-accent', s.className)}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
