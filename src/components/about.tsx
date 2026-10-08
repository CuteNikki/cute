import { about } from '@/site.config';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/section-title';

export function AboutSection() {
  return (
    <section aria-labelledby='about-heading' className='space-y-4'>
      <SectionTitle id='about-heading'>{about.title}</SectionTitle>

      <div className='grid gap-4 sm:grid-cols-6'>
        {/* Left column container */}
        <div className='flex flex-col gap-4 sm:col-span-4'>
          {/* Main bio card - flex-1 allows it to grow and fill remaining height */}
          <Card className='flex-1 justify-center gap-4 text-base'>
            <p className='leading-relaxed text-balance text-foreground'>{about.intro}</p>
            <p className='leading-relaxed text-balance text-muted-foreground'>{about.more}</p>
            <p className='leading-relaxed text-pretty text-foreground'>{about.closing}</p>
          </Card>

          {/* Movies & Shows card */}
          <Card variant='soft' className='gap-0'>
            <h3 className='font-display text-lg font-semibold text-accent-foreground'>{about.mediaTitle}</h3>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {about.media.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Badge variant='pill'>
                    <Icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
                    <span>{label}</span>
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column - Things I love */}
        <Card variant='soft' className='gap-0 sm:col-span-2'>
          <h3 className='font-display text-lg font-semibold text-accent-foreground'>{about.interestsTitle}</h3>
          <ul className='mt-3 flex flex-wrap sm:grid sm:grid-cols-1 gap-2'>
            {about.interests.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Badge variant='pill'>
                  <Icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
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
