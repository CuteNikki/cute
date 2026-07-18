'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Gamepad2Icon, MoonIcon, SparklesIcon } from 'lucide-react';

import { LanyardActivity, useLanyard } from '@/context/lanyard';

import { SectionTitle } from '@/components/section-title';

const ACTIVITY_TYPE_LABELS: Record<number, string> = {
  0: 'Playing',
  1: 'Streaming',
  2: 'Listening to',
  3: 'Watching',
  5: 'Competing in',
};

function format(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}

function useActivityTimeline(timestamps?: { start?: number; end?: number }) {
  const [timeline, setTimeline] = useState<{
    current: number;
    total: number | null;
    percent: number;
  }>({ current: 0, total: null, percent: 0 });

  useEffect(() => {
    if (!timestamps?.start) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeline({ current: 0, total: null, percent: 0 });
      return;
    }

    const updateTimeline = () => {
      const now = Date.now();
      const start = timestamps.start!;
      const end = timestamps.end;

      const elapsedMs = now - start;
      const elapsedSec = Math.max(0, Math.floor(elapsedMs / 1000));

      if (end) {
        const totalMs = end - start;
        const totalSec = Math.max(0, Math.floor(totalMs / 1000));
        const progressPercent = totalSec > 0 ? (elapsedSec / totalSec) * 100 : 0;

        setTimeline({
          current: elapsedSec,
          total: totalSec,
          percent: Math.min(100, Math.max(0, progressPercent)),
        });
      } else {
        setTimeline({
          current: elapsedSec,
          total: null,
          percent: 0,
        });
      }
    };

    updateTimeline();
    const intervalId = setInterval(updateTimeline, 1000);
    return () => clearInterval(intervalId);
  }, [timestamps?.start, timestamps?.end]);

  return timeline;
}

export function StatusSection() {
  const { presence, loading } = useLanyard();

  const realActivities = presence?.activities.filter((activity) => activity.type !== 4) || [];
  const customStatusActivity = presence?.activities.find((activity) => activity.type === 4);

  return (
    <section aria-labelledby='now-heading' className='space-y-4'>
      <SectionTitle id='now-heading'>what i&apos;m up to</SectionTitle>

      {loading ? (
        <div className='grid gap-4 sm:grid-cols-2 min-w-0 w-full overflow-hidden'>
          <div className='space-y-4 min-w-0 w-full overflow-hidden'>
            <ActivityCardSkeleton />
          </div>

          {/* Status List Skeleton */}
          <div className='rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm flex flex-col justify-between min-h-48 min-w-0 w-full overflow-hidden'>
            <div className='min-w-0 w-full'>
              <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Current status</p>
              <ul className='mt-3 space-y-2.5 min-w-0 w-full'>
                <StatusRowSkeleton />
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2 min-w-0 w-full overflow-hidden'>
          <div className='space-y-4 min-w-0 w-full overflow-hidden'>
            {realActivities.length > 0 ? (
              realActivities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)
            ) : (
              <div className='rounded-3xl border border-border bg-card p-6 shadow-sm min-w-0 w-full overflow-hidden'>
                <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Current Mood</p>
                <div className='mt-3 flex items-center gap-4'>
                  <div className='flex size-20 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent-foreground'>
                    <SparklesIcon className='size-8 text-primary animate-pulse' aria-hidden='true' />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='font-display text-base font-semibold text-foreground'>cozy & relaxing</p>
                    <p className='text-sm text-muted-foreground truncate'>taking a small break</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm flex flex-col justify-between min-h-48 min-w-0 w-full overflow-hidden'>
            <div className='min-w-0 w-full'>
              <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Current status</p>
              <ul className='mt-3 space-y-2.5 min-w-0 w-full'>
                {customStatusActivity?.state ? (
                  <>
                    <StatusRow icon={SparklesIcon} text={customStatusActivity.state} />
                    <StatusRow icon={MoonIcon} text='feeling a little sleepy (yawn~)' />
                  </>
                ) : (
                  <StatusRow icon={MoonIcon} text='feeling a little sleepy (yawn~)' />
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function getActivityImages(activity: LanyardActivity) {
  const largeImageUrl = activity.assets?.large_image?.startsWith('mp:external')
    ? `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`
    : activity.assets?.large_image
      ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
      : `https://dcdn.dstn.to/app-icons/${activity.application_id}`;

  const smallImageUrl = activity.assets?.small_image
    ? activity.assets.small_image.startsWith('mp:external')
      ? `https://media.discordapp.net/${activity.assets.small_image.replace('mp:', '')}`
      : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`
    : null;

  return { largeImageUrl, smallImageUrl };
}

function ActivityCard({ activity }: { activity: LanyardActivity }) {
  const { current, total, percent } = useActivityTimeline(activity.timestamps);

  const { largeImageUrl, smallImageUrl } = getActivityImages(activity);
  const hasProgressBar = total !== null;

  return (
    <div className='w-full min-w-0 rounded-3xl border border-border bg-card p-6 shadow-sm overflow-hidden flex flex-col'>
      <div className='flex flex-row items-baseline gap-2 min-w-0 max-w-full mb-3 overflow-hidden'>
        <p className='text-xs font-bold uppercase tracking-wider text-muted-foreground leading-none shrink-0'>
          {ACTIVITY_TYPE_LABELS[activity.type] || 'Active App'}
        </p>
        <p className='truncate font-display text-base font-semibold text-foreground leading-none min-w-0 flex-1'>{activity.name}</p>
      </div>

      <div className='flex items-center gap-4 min-w-0 w-full max-w-full'>
        <div className='relative size-20 shrink-0'>
          <div className='relative flex size-full items-center justify-center rounded-lg bg-secondary text-primary overflow-hidden'>
            {largeImageUrl ? (
              <Image src={largeImageUrl} alt={activity.assets?.large_text || activity.name} width={80} height={80} className='object-cover' />
            ) : (
              <Gamepad2Icon className='size-8' aria-hidden='true' />
            )}
          </div>

          {smallImageUrl && (
            <div className='absolute -bottom-1 -right-1 size-7 rounded-full bg-card p-0.5 overflow-hidden' title={activity.assets?.small_text}>
              <div className='relative size-full'>
                <Image src={smallImageUrl} alt={activity.assets?.small_text || 'Status icon'} width={28} height={28} className='rounded-full object-cover' />
              </div>
            </div>
          )}
        </div>

        <div className='min-w-0 flex-1 w-full flex flex-col overflow-hidden'>
          <div className='min-w-0 w-full max-w-full overflow-hidden'>
            {activity.details && <p className='truncate text-sm text-muted-foreground w-full block max-w-full'>{activity.details}</p>}
            {activity.state && <p className='truncate text-sm text-muted-foreground w-full block max-w-full'>{activity.state}</p>}
          </div>

          <div className='mt-2 min-w-0 w-full' aria-live='off'>
            {hasProgressBar ? (
              <div className='space-y-1 min-w-0 w-full'>
                <div className='relative h-1 w-full rounded-full bg-accent/60 overflow-hidden'>
                  <div
                    className='absolute top-0 left-0 h-full rounded-full bg-primary transition-all duration-1000 ease-linear'
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className='flex justify-between font-mono text-[10px] font-semibold text-muted-foreground min-w-0 w-full'>
                  <span className='shrink-0'>{format(current)}</span>
                  <span className='shrink-0'>{format(total)}</span>
                </div>
              </div>
            ) : (
              current > 0 && <p className='font-mono text-xs font-semibold text-primary truncate'>{format(current)} elapsed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityCardSkeleton() {
  return (
    <div className='w-full min-w-0 rounded-3xl border border-border bg-card p-6 shadow-sm overflow-hidden flex flex-col animate-pulse'>
      <div className='flex flex-row items-baseline gap-2 min-w-0 max-w-full mb-3 overflow-hidden'>
        <div className='h-3 w-16 rounded bg-muted shrink-0' />
        <div className='h-4 w-32 rounded bg-muted min-w-0 flex-1' />
      </div>
      <div className='flex items-center gap-4 min-w-0 w-full max-w-full'>
        <div className='relative size-20 shrink-0'>
          <div className='relative flex size-full items-center justify-center rounded-lg bg-muted text-muted-foreground overflow-hidden' />
        </div>
        <div className='min-w-0 flex-1 w-full flex flex-col overflow-hidden'>
          <div className='min-w-0 w-full max-w-full overflow-hidden space-y-2'>
            <div className='h-3.5 w-3/4 rounded bg-muted block max-w-full' />
            <div className='h-3.5 w-1/2 rounded bg-muted block max-w-full' />
          </div>
          <div className='mt-3 min-w-0 w-full'>
            <div className='h-3.5 w-1/4 rounded bg-muted' />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRowSkeleton() {
  return (
    <li className='flex items-center gap-3 rounded-2xl bg-card/50 px-3 py-2.5 animate-pulse'>
      <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-muted' />
      <div className='h-3.5 w-2/3 rounded bg-muted' />
    </li>
  );
}

function StatusRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <li className='flex items-center gap-3 rounded-2xl bg-card px-3 py-2.5'>
      <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary'>
        <Icon className='size-4' aria-hidden='true' />
      </span>
      <span className='text-sm font-medium text-foreground'>{text}</span>
    </li>
  );
}
