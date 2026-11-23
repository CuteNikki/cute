import type { SectionContent } from '@/lib/content';
import { Icon } from '@/lib/icons';

import { SectionTitle } from '@/components/section-title';

export function Socials({ socials }: { socials: SectionContent<'socials'> }) {
  return (
    <section aria-labelledby='socials-heading' className='space-y-4'>
      <SectionTitle id='socials-heading'>{socials.title}</SectionTitle>

      <div className='grid grid-cols-1 gap-2 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2'>
        {socials.links.map(({ icon, label, handle, href }) => (
          <a
            key={label}
            href={href}
            className='group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-secondary'
          >
            <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
              <Icon name={icon} className='size-5' />
            </span>
            <span className='min-w-0'>
              <span className='block truncate font-display text-sm font-semibold text-foreground'>
                {label}
              </span>
              <span className='block truncate text-xs text-muted-foreground'>
                {handle}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
