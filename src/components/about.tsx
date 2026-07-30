import {
  CatIcon,
  Code2Icon,
  CompassIcon,
  DogIcon,
  HeartHandshakeIcon,
  HeartIcon,
  IceCreamIcon,
  MedalIcon,
  MusicIcon,
  PaletteIcon,
  PopcornIcon,
  SparklesIcon,
  StarIcon,
  SwordsIcon,
} from 'lucide-react';

import { SectionTitle } from '@/components/section-title';

const favouriteThings = [
  { icon: CatIcon, label: 'cats/kittens' },
  { icon: HeartIcon, label: 'plushies' },
  { icon: PaletteIcon, label: 'pastel colours' },
  { icon: IceCreamIcon, label: 'strawberry milk' },
  { icon: MusicIcon, label: 'music' },
  { icon: SparklesIcon, label: 'being silly' },
  { icon: HeartHandshakeIcon, label: 'being kind' },
  { icon: PopcornIcon, label: 'eating snacks' },
  { icon: Code2Icon, label: 'programming' },
];
const favouriteMoviesShows = [
  { icon: DogIcon, label: 'bluey' },
  { icon: StarIcon, label: 'how to train your dragon' },
  { icon: SwordsIcon, label: 'star wars' },
  { icon: MedalIcon, label: 'marvel' },
  { icon: CompassIcon, label: 'gravity falls' },
  { icon: SparklesIcon, label: 'studio ghibli' },
];

export function AboutSection() {
  return (
    <section aria-labelledby='about-heading' className='space-y-4'>
      <SectionTitle id='about-heading'>a little about me</SectionTitle>

      <div className='grid gap-4 sm:grid-cols-6'>
        {/* Left column container */}
        <div className='flex flex-col gap-4 sm:col-span-4'>
          {/* Main bio card - flex-1 allows it to grow and fill remaining height */}
          <div className='flex flex-1 flex-col justify-center rounded-3xl border border-border bg-card p-6 shadow-sm'>
            <p className='leading-relaxed text-balance text-foreground'>
              {
                "hewwo! am nikki sophie – a pastel loving, cat obsessed little bean who spends way too much time surrounded by plushies. i believe the internet is nicer when everyone's kind, so this is my soft space to share the things i love."
              }
            </p>
            <p className='mt-4 leading-relaxed text-balance text-muted-foreground'>
              {
                "when i'm not online you'll find me doodling, programming, listening to music, rewatching comfort movies/shows, or reorganising my plushies for the hundredth time. thank you very much for stopping by! ✿"
              }
            </p>
          </div>

          {/* Movies & Shows card */}
          <div className='rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm'>
            <h3 className='font-display text-lg font-semibold text-accent-foreground'>favourite movies & shows ♡</h3>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {favouriteMoviesShows.map(({ label, icon: Icon }) => (
                <li key={label} className='flex items-center gap-2 rounded-full bg-card px-3 py-2 text-sm font-medium text-foreground'>
                  <Icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column - Things I love */}
        <div className='rounded-3xl border border-border bg-secondary/60 p-6 shadow-sm sm:col-span-2'>
          <h3 className='font-display text-lg font-semibold text-accent-foreground'>things i love ♡</h3>
          <ul className='mt-3 flex flex-wrap gap-2'>
            {favouriteThings.map(({ icon: Icon, label }) => (
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
