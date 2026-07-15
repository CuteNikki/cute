import { CatIcon, CloudyIcon, HeartIcon, IceCreamIcon, MusicIcon, PaletteIcon, SparklesIcon } from 'lucide-react';

import { SectionTitle } from '@/components/section-title';

const favourites = [
  { icon: CatIcon, label: 'cats & kitties' },
  { icon: HeartIcon, label: 'plushies' },
  { icon: PaletteIcon, label: 'pastel colours' },
  { icon: IceCreamIcon, label: 'strawberry milk' },
  { icon: CloudyIcon, label: 'cozy days' },
  { icon: MusicIcon, label: 'music' },
  { icon: SparklesIcon, label: 'being silly' },
];

export function AboutSection() {
  return (
    <section aria-labelledby='about-heading' className='space-y-4'>
      <SectionTitle id='about-heading'>a little about me</SectionTitle>

      <div className='grid gap-4 sm:grid-cols-5'>
        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm sm:col-span-3'>
          <p className='leading-relaxed text-foreground'>
            {
              "hewwo! am nikki sophie – a pastel loving, cat obsessed little bean who spends way too much time surrounded by plushies. i believe the internet is nicer when everyone's kind, so this is my soft space to share the things i love."
            }
          </p>
          <p className='mt-4 leading-relaxed text-muted-foreground'>
            {
              "when i'm not online you'll find me doodling, rewatching comfort shows, or reorganising my plushies for the hundredth time. thank you for stopping by! ✿"
            }
          </p>
        </div>

        <div className='rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm sm:col-span-2'>
          <h3 className='font-display text-lg font-semibold text-accent-foreground'>things i love ♡</h3>
          <ul className='mt-3 flex flex-wrap gap-2'>
            {favourites.map(({ icon: Icon, label }) => (
              <li key={label} className='flex items-center gap-2 rounded-full bg-card px-3 py-2 text-sm font-medium text-foreground'>
                <Icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
