import {
  CatIcon,
  Code2Icon,
  CompassIcon,
  DogIcon,
  Gamepad2Icon,
  HeartHandshakeIcon,
  HeartIcon,
  MedalIcon,
  MusicIcon,
  PaletteIcon,
  PopcornIcon,
  SparklesIcon,
  StarIcon,
  SwordsIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionTitle } from '@/components/section-title';

const interestsList = [
  { icon: CatIcon, label: 'kitties' },
  { icon: HeartIcon, label: 'plushies' },
  { icon: PaletteIcon, label: 'pastels' },
  { icon: Gamepad2Icon, label: 'gaming' },
  { icon: MusicIcon, label: 'music' },
  { icon: SparklesIcon, label: 'being silly' },
  { icon: HeartHandshakeIcon, label: 'being kind' },
  { icon: PopcornIcon, label: 'snacking' },
  { icon: Code2Icon, label: 'coding' },
  { icon: CompassIcon, label: 'adventures' },
];

const favouriteMedia = [
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
          <Card className='flex-1 justify-center gap-4 text-base'>
            <p className='leading-relaxed text-balance text-foreground'>
              {
                "hewwo! am nikki sophie – a pastel loving, cat obsessed little bean who spends way too much time surrounded by plushies. i believe the internet is nicer when everyone's kind, so this is my soft space to share the things i love."
              }
            </p>
            <p className='leading-relaxed text-balance text-muted-foreground'>
              {
                "when i'm not online you'll find me doodling, programming, listening to music, rewatching comfort movies/shows, or reorganising my plushies for the hundredth time. thank you very much for stopping by! ✿"
              }
            </p>
            <p className='leading-relaxed text-pretty text-foreground'>{'i love my partner christian more than anything 💖'}</p>
          </Card>

          {/* Movies & Shows card */}
          <Card variant='soft' className='gap-0'>
            <h3 className='font-display text-lg font-semibold text-accent-foreground'>favourite movies & shows ♡</h3>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {favouriteMedia.map(({ label, icon: Icon }) => (
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
          <h3 className='font-display text-lg font-semibold text-accent-foreground'>things i love ♡</h3>
          <ul className='mt-3 flex flex-wrap sm:grid sm:grid-cols-1 gap-2'>
            {interestsList.map(({ icon: Icon, label }) => (
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
