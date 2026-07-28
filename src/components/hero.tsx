'use client';

import Image from 'next/image';

import { BabyIcon, HeartIcon, Sparkles as SparklesIcon, TransgenderIcon } from 'lucide-react';

import { useLanyard } from '@/context/lanyard';

import { Sparkles } from '@/components/sparkles';

const badges = [
  { icon: TransgenderIcon, label: 'transfem' },
  { icon: BabyIcon, label: 'age regressor' },
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
    <section className='relative'>
      <div className='relative h-44 w-full overflow-hidden rounded-3xl border border-border bg-secondary sm:h-56'>
        <Image src={bannerUrl} alt='Cute pastel banner' fill priority fetchPriority='high' className='object-cover' />
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

        <p className='mt-1 font-display text-base text-accent-foreground text-balance sm:text-lg'>{`♡ ${age} years old · she/her ☆`}</p>
        <p className='mt-4 max-w-md leading-relaxed text-muted-foreground whitespace-pre-line text-balance'>
          {
            '♡ an angel who loves plushies, pastel colors & cats ★彡\na soft little corner of the internet where i get to be small & silly, built on respect & kindness only.'
          }
        </p>

        <ul className='mt-6 flex flex-wrap items-center justify-center gap-2'>
          {badges.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className='flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm'
            >
              <Icon className='size-4 text-primary' aria-hidden='true' />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
