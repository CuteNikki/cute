import Link from 'next/link';

import { HeartIcon, SparklesIcon } from 'lucide-react';

import { footer } from '@/site.config';

export function Footer() {
  return (
    <footer className='mt-4 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl border border-border bg-card p-6 text-center shadow-sm'>
      <p className='flex max-w-full flex-wrap items-center justify-center gap-1 px-2 font-display text-sm leading-tight font-semibold text-primary'>
        <span>{footer.taglineBefore}</span>
        <HeartIcon
          className='size-4 shrink-0 fill-primary text-primary'
          aria-hidden='true'
        />
        <span>{footer.taglineAfter}</span>
      </p>

      <div className='flex max-w-full flex-row items-center justify-center gap-1 px-2 text-xs text-muted-foreground'>
        <p className='leading-normal'>
          &copy;{new Date().getFullYear()} –{' '}
          <Link
            href={footer.sourceUrl}
            target='_blank'
            rel='noreferrer'
            className='underline'
          >
            {footer.copyrightName}
          </Link>
        </p>

        <span aria-hidden='true'>·</span>

        <span className='flex items-center gap-1'>
          <span>{footer.signoff}</span>
          <SparklesIcon className='size-3 shrink-0' aria-hidden='true' />
        </span>
      </div>
    </footer>
  );
}
