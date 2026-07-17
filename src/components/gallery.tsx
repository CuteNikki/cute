'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { HeartIcon, XIcon } from 'lucide-react';

import { SectionTitle } from '@/components/section-title';

type CuteThing = {
  images: string[];
  name: string;
  short: string;
  description: string;
  details: { label: string; value: string }[];
};

const things: CuteThing[] = [
  {
    images: ['/items/plushies.png', '/items/pusheen-together-3.png', '/items/pusheen-together.png'],
    name: 'plush family',
    short: 'my cuddle buddies',
    description:
      'a super squishy plushie family that lives on my bed. they have the sweetest little stitched smiles and come everywhere with me on cozy nights.',
    details: [
      { label: 'softness', value: '10/10 squish' },
      { label: 'cuddly', value: 'always' },
      { label: 'favorite', value: 'goma (gray cat)' },
    ],
  },
  {
    images: ['/items/backpack.png', '/items/backpack-2.png', '/items/backpack-3.png'],
    name: 'display backpack',
    short: 'my soft carryall',
    description: "a pastel pink backpack with a bunch of different metal pins. it's perfect for carrying my essentials on cozy adventures.",
    details: [
      { label: 'style', value: 'ita bag ♡' },
      { label: 'features', value: 'metal pins, keychains' },
      { label: 'use', value: 'cozy adventures' },
    ],
  },
  {
    images: ['/items/pacifier-2.png', '/items/pacifier.png'],
    name: 'pastel pacifier',
    short: 'my comfort chew',
    description:
      'a pastel pink adult pacifier decorated with tiny yellow stars, fluffy little clouds and a sweet center graphic of cuddling kittens.\nit is the perfect cozy companion for winding down, relaxing and feeling safe and small.',
    details: [
      { label: 'color', value: 'pastel pink' },
      { label: 'material', value: 'silicone' },
      { label: 'design', value: 'peach and goma' },
    ],
  },
  // {
  //   images: ['/items/angel-bunny.png', '/items/angel-bunny-2.png', '/items/angel-bunny-3.png'],
  //   name: 'Angel Bunny',
  //   short: 'my little guardian',
  //   description:
  //     'A fluffy pink bunny with tiny angel wings and a gold halo. She sits on my shelf and watches over all my other plushies like a sweet little guardian.',
  //   details: [
  //     { label: 'nickname', value: 'Angel' },
  //     { label: 'vibe', value: 'heavenly & soft' },
  //     { label: 'from', value: 'a birthday gift' },
  //   ],
  // },
  // {
  //   images: ['/items/strawberry-milk.png', '/items/strawberry-milk-2.png', '/items/strawberry-milk-3.png'],
  //   name: 'Strawberry Milk',
  //   short: 'my forever drink',
  //   description:
  //     'Pink strawberry milk is my absolute comfort drink. I always have a bottle in the fridge for sipping while doodling or watching comfort shows.',
  //   details: [
  //     { label: 'flavor', value: 'strawberry ♡' },
  //     { label: 'best with', value: 'a striped straw' },
  //     { label: 'mood', value: 'instant cozy' },
  //   ],
  // },
  // {
  //   images: ['/items/pastel-keyboard.png', '/items/pastel-keyboard-2.png', '/items/pastel-keyboard-3.png'],
  //   name: 'Pastel Keyboard',
  //   short: 'clicky & cute',
  //   description:
  //     'A pastel pink mechanical keyboard with round retro keycaps and little heart keys. It makes the softest clicky sounds and matches my whole setup.',
  //   details: [
  //     { label: 'keycaps', value: 'round & pastel' },
  //     { label: 'sound', value: 'soft & clicky' },
  //     { label: 'extras', value: 'heart keys ♡' },
  //   ],
  // },
  // {
  //   images: ['/items/star-lamp.png', '/items/star-lamp-2.png', '/items/star-lamp-3.png'],
  //   name: 'Star Night Light',
  //   short: 'my cozy glow',
  //   description: 'A glowing star and moon lamp that gives my room the dreamiest warm glow. I turn it on every night before bed for maximum coziness.',
  //   details: [
  //     { label: 'shape', value: 'star & moon' },
  //     { label: 'glow', value: 'warm pink' },
  //     { label: 'used for', value: 'sleepy nights' },
  //   ],
  // },
  // {
  //   images: ['/items/cat-mug.png', '/items/cat-mug-2.png', '/items/cat-mug-3.png'],
  //   name: 'Cat Mug',
  //   short: 'cocoa in style',
  //   description: 'An adorable cat-shaped mug with little ears and blushy cheeks. Perfect for warm cocoa with tiny marshmallows on chilly cozy days.',
  //   details: [
  //     { label: 'shape', value: 'chubby cat' },
  //     { label: 'holds', value: 'cocoa & tea' },
  //     { label: 'topping', value: 'mini marshmallows' },
  //   ],
  // },
];

export function Gallery() {
  const [selected, setSelected] = useState<CuteThing | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function openThing(thing: CuteThing, event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSelected(thing);
    setActivePhoto(0);
  }

  return (
    <section aria-labelledby='gallery-heading' className='space-y-4'>
      <SectionTitle id='gallery-heading'>photo gallery</SectionTitle>

      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <div className='grid grid-cols-1 xxs:grid-cols-2 gap-4 sm:grid-cols-3'>
          {things.map((thing) => (
            <Dialog.Trigger key={thing.name} asChild>
              <button
                type='button'
                onClick={(event) => openThing(thing, event)}
                className='group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              >
                <div className='relative aspect-square w-full overflow-hidden bg-background'>
                  <Image
                    src={thing.images[0]}
                    alt={thing.name}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px'
                    priority={things.indexOf(thing) < 3}
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  {thing.images.length > 1 && (
                    <span className='absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-0.5 text-[0.7rem] font-medium text-foreground backdrop-blur'>
                      {thing.images.length} photos
                    </span>
                  )}
                </div>
                <div className='p-6'>
                  <h3 className='font-display text-sm font-semibold text-foreground'>{thing.name}</h3>
                  <p className='mt-0.5 text-xs leading-relaxed text-muted-foreground'>{thing.short}</p>
                </div>
              </button>
            </Dialog.Trigger>
          ))}
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 z-50 bg-foreground/40 dark:bg-background/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
          <Dialog.Content
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              triggerRef.current?.focus({ preventScroll: true });
            }}
            className='fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
          >
            {selected && (
              <div className='flex min-h-0 flex-col overflow-y-auto'>
                <div className='relative aspect-4/3 w-full shrink-0 bg-secondary'>
                  <Image
                    key={selected.images[activePhoto]}
                    src={selected.images[activePhoto]}
                    fill
                    alt={`${selected.name} photo ${activePhoto + 1}`}
                    className='object-contain'
                  />
                  <Dialog.Close className='absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
                    <XIcon className='size-4' aria-hidden='true' />
                    <span className='sr-only'>Close</span>
                  </Dialog.Close>
                </div>

                {selected.images.length > 1 && (
                  <div className='flex gap-2 px-6 pt-4'>
                    {selected.images.map((image, index) => (
                      <button
                        key={`${selected.name}-thumb-${index}`}
                        type='button'
                        onClick={() => setActivePhoto(index)}
                        aria-label={`View ${selected.name} photo ${index + 1}`}
                        aria-current={index === activePhoto}
                        className={`relative size-14 shrink-0 overflow-hidden rounded-xl border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          index === activePhoto ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={image} alt='' fill sizes='56px' className='object-cover' />
                      </button>
                    ))}
                  </div>
                )}

                <div className='p-6'>
                  <Dialog.Title className='flex items-center gap-2 font-display text-xl font-bold text-primary'>
                    <HeartIcon className='size-5 shrink-0' aria-hidden='true' />
                    {selected.name}
                  </Dialog.Title>
                  <Dialog.Description className='mt-2 leading-relaxed text-muted-foreground whitespace-pre-line'>{selected.description}</Dialog.Description>

                  <dl className='mt-4 space-y-2'>
                    {selected.details.map((detail) => (
                      <div key={detail.label} className='flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-2 text-sm'>
                        <dt className='font-medium text-muted-foreground'>{detail.label}</dt>
                        <dd className='font-semibold text-foreground'>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
