import type { SectionContent } from '@/lib/content';
import { Icon } from '@/lib/icons';

import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function AboutSection({ about }: { about: SectionContent<'about'> }) {
  return (
    <section aria-labelledby='about-heading' className='space-y-4'>
      <SectionTitle id='about-heading'>{about.title}</SectionTitle>

      <div className='grid gap-4 sm:grid-cols-6'>
        {/* Left column container */}
        <div className='flex flex-col gap-4 sm:col-span-4'>
          {/* Main bio card - flex-1 allows it to grow and fill remaining height */}
          <Card className='flex-1 justify-center gap-4 text-base'>
            <p className='leading-relaxed text-balance text-foreground'>
              {about.intro}
            </p>
            <p className='leading-relaxed text-balance text-muted-foreground'>
              {about.more}
            </p>
            <p className='leading-relaxed text-pretty text-foreground'>
              {about.closing}
            </p>
          </Card>

          {/* Movies & Shows card */}
          <Card variant='soft' className='gap-0'>
            <h3 className='font-display text-lg font-semibold text-accent-foreground'>
              {about.mediaTitle}
            </h3>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {about.media.map(({ label, icon }) => (
                <li key={label}>
                  <Badge variant='pill'>
                    <Icon
                      name={icon}
                      className='size-4 shrink-0 text-primary'
                    />
                    <span>{label}</span>
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column - Things I love */}
        <Card variant='soft' className='gap-0 sm:col-span-2'>
          <h3 className='font-display text-lg font-semibold text-accent-foreground'>
            {about.interestsTitle}
          </h3>
          <ul className='mt-3 flex flex-wrap gap-2 sm:grid sm:grid-cols-1'>
            {about.interests.map(({ icon, label }) => (
              <li key={label}>
                <Badge variant='pill'>
                  <Icon name={icon} className='size-4 shrink-0 text-primary' />
                  <span>{label}</span>
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
