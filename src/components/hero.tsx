'use client';

import Image from 'next/image';
import { useState } from 'react';

import { BabyIcon, HeartIcon, InfoIcon, Sparkles as SparklesIcon, TransgenderIcon, type LucideIcon } from 'lucide-react';

import { useLanyard } from '@/context/lanyard';

import { Sparkles } from '@/components/sparkles';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ProfileBadge {
  icon: LucideIcon;
  label: string;
  explanation?: string;
  // `date` is YYYY-MM-DD, or YYYY-MM when the exact day doesn't matter.
  milestones?: { label: string; date: string }[];
}

const badges: ProfileBadge[] = [
  {
    icon: TransgenderIcon,
    label: 'transgender',
    explanation:
      'transgender is a term used to describe someone whose gender identity differs from the sex they were assigned at birth. i was born male but identify as female.',
    milestones: [
      { label: 'realization', date: '2015-01' },
      { label: 'document change', date: '2025-02-02' },
      { label: 'hormone therapy', date: '2026-03-17' },
    ],
  },
  {
    icon: BabyIcon,
    label: 'age regressor',
    explanation:
      'an age regressor is someone who mentally shifts to a younger mindset; often as a coping mechanism for stress, trauma or anxiety. it provides a safe, non-sexual space to relax, process emotions or experience a sense of comfort and care that may have been missing in the past.',
  },
  { icon: HeartIcon, label: 'kindness first' },
  { icon: SparklesIcon, label: 'plushie collector' },
];
const dateOfBirth = '2004-09-26';

// Parses YYYY-MM or YYYY-MM-DD as a local calendar date. `new Date(string)` parses these as UTC
// midnight and is lenient in some engines (Chrome accepts 'around 2015', Safari doesn't), so
// browsers could disagree on the result.
function parseDate(dateString: string) {
  const [year, month = 1, day = 1] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Whole calendar years elapsed, so birthdays/anniversaries tick over on the actual day
// (dividing by 365.25 days is off by one on the day itself).
function yearsSince(date: Date, now = new Date()) {
  const years = now.getFullYear() - date.getFullYear();
  const beforeAnniversary = now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());
  return beforeAnniversary ? years - 1 : years;
}

const age = yearsSince(parseDate(dateOfBirth));

function formatMilestoneDate(dateString: string) {
  const date = parseDate(dateString);

  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = yearsSince(date, now);

  const absolute = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(date);

  let relative = '';
  if (diffYears > 0) relative = `${diffYears}y ago`;
  else if (diffMonths > 0) relative = `${diffMonths}mo ago`;
  else if (diffDays > 0) relative = `${diffDays}d ago`;
  else relative = 'recently';

  return `${absolute} (${relative})`;
}

function BadgeTooltip(badge: ProfileBadge) {
  const [open, setOpen] = useState(false);

  function handlePointerEnter(event: React.PointerEvent) {
    if (event.pointerType === 'mouse') setOpen(true);
  }
  function handlePointerLeave(event: React.PointerEvent) {
    if (event.pointerType === 'mouse') setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton={false}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        render={
          <Badge
            variant='pill'
            className='group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          />
        }
      >
        <badge.icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
        {badge.label}
        <InfoIcon className='size-4 text-muted-foreground transition-colors group-hover:text-primary' aria-hidden='true' />
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='center'
        sideOffset={6}
        initialFocus={false}
        finalFocus={false}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className='w-80 max-w-[calc(100vw-2rem)] gap-3 rounded-lg p-4 leading-relaxed'
      >
        <span className='text-muted-foreground'>{badge.explanation}</span>

        {badge.milestones && badge.milestones.length > 0 && (
          <div className='mt-1 flex flex-col gap-1.5 border-t border-border pt-3'>
            {badge.milestones.map((milestone) => (
              <div key={milestone.label} className='flex items-center justify-between text-xs'>
                <span className='font-medium text-foreground'>{milestone.label}</span>
                <span className='text-muted-foreground'>{formatMilestoneDate(milestone.date)}</span>
              </div>
            ))}
          </div>
        )}

        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}

export function Hero() {
  const { presence } = useLanyard();

  // dstn.to's banner URL has no hash/version in it (unlike the avatar URL below), so
  // browsers happily cache it indefinitely and never notice when the banner changes.
  // Busting the query string once a day forces a fresh fetch without relying on
  // visitors manually clearing site data.
  const cacheBust = new Date().toISOString().slice(0, 10);
  const bannerUrl = `https://dcdn.dstn.to/banners/${presence?.discord_user?.id}?size=1024&cb=${cacheBust}`;

  const isAnimated = presence?.discord_user?.avatar?.startsWith('a_') || false;
  const extension = isAnimated ? 'gif' : 'webp';
  const avatarUrl = presence?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.${extension}`
    : '/avatar.gif';

  return (
    <section className='relative'>
      <div className='relative h-44 w-full overflow-hidden rounded-3xl border border-border bg-secondary sm:h-56'>
        <Image
          src={presence?.discord_user?.id ? bannerUrl : '/transparent.png'}
          alt='Cute pastel banner'
          fill
          sizes='(min-width: 1024px) 400px, 100vw'
          priority
          unoptimized
          fetchPriority='high'
          className='object-cover'
        />
      </div>
      <Sparkles />

      <div className='relative sm:-mt-10 -mt-8 flex flex-col items-center text-center'>
        <div className='animate-float-soft rounded-full border-4 border-transparent bg-card'>
          {/* Uses next/image directly (not the generated AvatarImage) so the LCP-critical
              avatar keeps Next's optimization, priority hint and unoptimized-when-animated
              handling - AvatarImage is a plain <img> gated behind its own load-state, which
              would both drop those and add a load flicker. Avatar here is just the sizing/
              clipping/ring container. */}
          <Avatar className='size-20 overflow-hidden sm:size-24'>
            <Image
              src={avatarUrl}
              alt='dynamic avatar'
              width={128}
              height={128}
              priority
              unoptimized={isAnimated || avatarUrl.includes('.gif') || avatarUrl.startsWith('/api')}
              className='size-full object-cover'
            />
          </Avatar>
        </div>

        <h1 className='flex flex-wrap items-center justify-center gap-x-2 font-display text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl'>
          <span>Nikki Sophie</span>
          <span className='mt-2 inline-block animate-wiggle'>🌸</span>
        </h1>

        <p className='font-display text-base text-accent-foreground text-balance sm:text-lg'>{`☆ ${age} years old · german · she/her ♡`}</p>
        <p className='mt-2 max-w-md text-base leading-relaxed text-muted-foreground whitespace-pre-line text-balance'>
          {
            '♡ an angel who loves plushies, pastel colors & cats ★彡\nwelcome to my soft little corner of the internet where i get to be small & silly, built on respect & kindness.'
          }
        </p>

        <ul className='mt-2 flex flex-wrap items-center justify-center gap-2'>
          {badges.map((badge) => {
            if (!badge.explanation) {
              return (
                <li key={badge.label}>
                  <Badge variant='pill'>
                    <badge.icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
                    {badge.label}
                  </Badge>
                </li>
              );
            }

            return <BadgeTooltip key={badge.label} {...badge} />;
          })}
        </ul>
      </div>
    </section>
  );
}
