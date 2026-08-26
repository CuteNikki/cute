'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import Image from 'next/image';
import { useState } from 'react';

import { BabyIcon, HeartIcon, InfoIcon, Sparkles as SparklesIcon, TransgenderIcon, type LucideIcon } from 'lucide-react';

import { useLanyard } from '@/context/lanyard';

import { Sparkles } from '@/components/sparkles';

interface Badge {
  icon: LucideIcon;
  label: string;
  explanation?: string;
  milestones?: { label: string; date: string }[];
}

const badges: Badge[] = [
  {
    icon: TransgenderIcon,
    label: 'transgender',
    explanation:
      'transgender is a term used to describe someone whose gender identity differs from the sex they were assigned at birth. i was born male but identify as female.',
    milestones: [
      { label: 'realization', date: 'around 2015' },
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
const dateOfBirth = new Date('2004-09-26');
const age = Math.floor((Date.now() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

function formatMilestoneDate(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

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

function BadgeTooltip(badge: Badge) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Trigger asChild>
        <button
          type='button'
          onClick={() => setOpen((prev) => !prev)}
          className='group flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          <badge.icon className='size-4 text-primary' aria-hidden='true' />
          {badge.label}
          <InfoIcon className='size-4 text-muted-foreground transition-colors group-hover:text-primary' aria-hidden='true' />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side='top'
          align='center'
          sideOffset={6}
          onPointerDownOutside={() => setOpen(false)}
          className='z-50 max-w-[calc(100vw-2rem)] w-80 rounded-lg border border-border bg-popover p-4 text-sm leading-relaxed text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        >
          <div className='flex flex-col gap-3'>
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
          </div>

          <Tooltip.Arrow className='fill-popover' />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function Hero() {
  const { presence } = useLanyard();

  const bannerUrl = `https://dcdn.dstn.to/banners/${presence?.discord_user?.id}?size=1024`;

  const isAnimated = presence?.discord_user?.avatar?.startsWith('a_') || false;
  const extension = isAnimated ? 'gif' : 'webp';
  const avatarUrl = presence?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.${extension}`
    : '/avatar.gif';

  return (
    <Tooltip.Provider delayDuration={200}>
      <section className='relative'>
        <div className='relative h-44 w-full overflow-hidden rounded-3xl border border-border bg-secondary sm:h-56'>
          <Image
            src={presence?.discord_user?.id ? bannerUrl : '/transparent.png'}
            alt='Cute pastel banner'
            fill
            priority
            unoptimized
            fetchPriority='high'
            className='object-cover'
          />
        </div>
        <Sparkles />

        <div className='relative sm:-mt-10 -mt-8 flex flex-col items-center text-center'>
          <div className='animate-float-soft rounded-full border-4 border-transparent bg-card'>
            <div className='relative size-20 sm:size-24 overflow-hidden rounded-full'>
              <Image
                src={avatarUrl}
                alt='dynamic avatar'
                width={128}
                height={128}
                priority
                unoptimized={isAnimated || avatarUrl.includes('.gif') || avatarUrl.startsWith('/api')}
                className='object-cover'
              />
            </div>
          </div>

          
          <h1 className='flex flex-wrap items-center justify-center gap-x-2 font-display text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl'>
            <span>Nikki Sophie</span>
            <span className='mt-2 inline-block animate-wiggle'>🌸</span>
          </h1>

          <p className='font-display text-base text-accent-foreground text-balance sm:text-lg'>{`☆ ${age} years old · german · she/her ♡`}</p>
          <p className='mt-2 max-w-md leading-relaxed text-muted-foreground whitespace-pre-line text-balance'>
            {
              '♡ an angel who loves plushies, pastel colors & cats ★彡\nwelcome to my soft little corner of the internet where i get to be small & silly, built on respect & kindness.'
            }
          </p>

          <ul className='mt-2 flex flex-wrap items-center justify-center gap-2'>
            {badges.map((badge) => {
              if (!badge.explanation) {
                return (
                  <li
                    key={badge.label}
                    className='flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm'
                  >
                    <badge.icon className='size-4 text-primary' aria-hidden='true' />
                    {badge.label}
                  </li>
                );
              }

              return <BadgeTooltip key={badge.label} {...badge} />;
            })}
          </ul>
        </div>
      </section>
    </Tooltip.Provider>
  );
}
