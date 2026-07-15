import { BirdIcon, CameraIcon, ClapperboardIcon, Code2Icon, Gamepad2Icon, PlayIcon } from 'lucide-react';

import { SectionTitle } from '@/components/section-title';

const socials = [
  { icon: Gamepad2Icon, label: 'Discord', handle: '@cutenikki', href: 'https://discord.com/users/303142922780672013' },
  { icon: CameraIcon, label: 'Instagram', handle: '@BlushingNikki', href: 'https://instagram.com/blushingnikki' },
  { icon: BirdIcon, label: 'Twitter', handle: '@BlushingNikki', href: 'https://twitter.com/blushingnikki' },
  { icon: PlayIcon, label: 'YouTube', handle: '@BlushingNikki', href: 'https://www.youtube.com/@BlushingNikki' },
  { icon: ClapperboardIcon, label: 'Twitch', handle: '/CuteNikki', href: 'https://www.twitch.tv/cutenikki' },
  { icon: Code2Icon, label: 'GitHub', handle: '/CuteNikki', href: 'https://github.com/CuteNikki' },
];

export function Socials() {
  return (
    <section aria-labelledby='socials-heading' className='space-y-4'>
      <SectionTitle id='socials-heading'>let&apos;s be friends ♡</SectionTitle>

      <div className='grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2'>
        {socials.map(({ icon: Icon, label, handle, href }) => (
          <a
            key={label}
            href={href}
            className='group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-secondary'
          >
            <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
              <Icon className='size-5' aria-hidden='true' />
            </span>
            <span className='min-w-0'>
              <span className='block truncate font-display text-sm font-semibold text-foreground'>{label}</span>
              <span className='block truncate text-xs text-muted-foreground'>{handle}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
