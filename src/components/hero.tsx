'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import Image from 'next/image';

import { BabyIcon, HeartIcon, InfoIcon, Sparkles as SparklesIcon, TransgenderIcon } from 'lucide-react';

import { Sparkles } from '@/components/sparkles';
import { useLanyard } from '@/context/lanyard';

const badges = [
  {
    icon: TransgenderIcon,
    label: 'transfem',
    explanation: 'transfem is a term used to describe someone who was assigned male at birth but identifies and presents themselves in a feminine way.',
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

        <div className='relative -mt-16 flex flex-col items-center text-center sm:-mt-16'>
          <div className='animate-float-soft rounded-full border-4 border-card bg-card p-1 shadow-[0_10px_30px_-10px_oklch(0.72_0.16_350/0.6)]'>
            <div className='relative size-28 overflow-hidden rounded-full sm:size-32'>
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

          <h1 className='mt-4 flex flex-wrap items-center justify-center gap-x-2 font-display text-3xl font-bold tracking-tight text-primary text-balance sm:text-4xl'>
            <span>Nikki Sophie</span>
            <span className='inline-block animate-wiggle'>🌸</span>
          </h1>

          <p className='mt-1 font-display text-base text-accent-foreground text-balance sm:text-lg'>{`☆ ${age} years old · german · she/her ♡`}</p>
          <p className='mt-4 max-w-md leading-relaxed text-muted-foreground whitespace-pre-line text-balance'>
            {
              '♡ an angel who loves plushies, pastel colors & cats ★彡\na soft little corner of the internet where i get to be small & silly, built on respect & kindness only.'
            }
          </p>

          <ul className='mt-6 flex flex-wrap items-center justify-center gap-2'>
            {badges.map(({ icon: Icon, label, explanation }) => {
              if (!explanation) {
                return (
                  <li
                    key={label}
                    className='flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm'
                  >
                    <Icon className='size-4 text-primary' aria-hidden='true' />
                    {label}
                  </li>
                );
              }

              return (
                <Tooltip.Root key={label}>
                  <Tooltip.Trigger asChild>
                    <button
                      type='button'
                      className='group flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    >
                      <Icon className='size-4 text-primary' aria-hidden='true' />
                      {label}
                      <InfoIcon className='size-4 text-muted-foreground transition-colors group-hover:text-primary' aria-hidden='true' />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side='top'
                      align='center'
                      sideOffset={6}
                      className='z-50 max-w-sm rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 leading-relaxed'
                    >
                      {explanation}
                      <Tooltip.Arrow className='fill-popover' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              );
            })}
          </ul>
        </div>
      </section>
    </Tooltip.Provider>
  );
}
