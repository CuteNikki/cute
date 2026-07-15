import { HeartIcon, SparklesIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className='mt-4 rounded-3xl border border-border bg-card p-6 text-center shadow-sm flex flex-col items-center justify-center gap-2 overflow-hidden'>
      <p className='flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 font-display text-sm font-semibold text-primary leading-tight max-w-full px-2'>
        <span>made with</span>
        <HeartIcon className='size-4 fill-primary text-primary shrink-0' aria-hidden='true' />
        <span>and lots of pastel dreams</span>
      </p>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground max-w-full px-2'>
        <p className='leading-normal'>&copy;{new Date().getFullYear()} – Nikki Sophie</p>

        <span className='hidden sm:inline' aria-hidden='true'>
          ·
        </span>

        <span className='flex items-center gap-1'>
          <span>keep on dreaming</span>
          <SparklesIcon className='size-3 shrink-0' aria-hidden='true' />
        </span>
      </div>
    </footer>
  );
}
