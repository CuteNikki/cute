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
    images: [
      '/items/pusheen.jpg',
      '/items/plushies-3.jpg',
      '/items/pusheen-together-2.jpg',
      '/items/plushies-2.jpg',
      '/items/plushies.png',
      '/items/mayo-tuna.png',
      '/items/nebula-snuggles-stack.png',
      '/items/pusheen-together.png',
      '/items/shark-stack.png',
    ],
    name: 'plush family',
    short: 'my cuddle buddies',
    description:
      'a super squishy plushie family that lives on my bed. they have the sweetest little stitched smiles and come everywhere with me on cozy nights.',
    details: [
      { label: 'softness', value: '10/10 squish' },
      { label: 'cuddly', value: 'always' },
      { label: 'favourite', value: 'goma (gray cat)' },
    ],
  },
  {
    images: ['/items/backpack-3.png', '/items/backpack-2.png', '/items/backpack.png'],
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
    images: ['/items/pacifier.png', '/items/pacifier-2.png'],
    name: 'pastel pacifier',
    short: 'my comfort chew',
    description:
      'a pastel pink adult pacifier decorated with tiny yellow stars, fluffy little clouds and a sweet centre graphic of cuddling kittens.\nit is the perfect cozy companion for winding down, relaxing and feeling safe and small.',
    details: [
      { label: 'colour', value: 'pastel pink' },
      { label: 'material', value: 'silicone' },
      { label: 'design', value: 'peach and goma' },
    ],
  },
  {
    images: ['/items/onesie.jpg', '/items/onesie-goma.jpg'],
    name: 'cozy onesie',
    short: 'my snuggly outfit',
    description: "a blue shark onesie. perfect for lounging around and feeling cozy when it's cold.",
    details: [
      { label: 'material', value: 'soft cotton' },
      { label: 'comfort', value: 'extremely cozy' },
      { label: 'approved by', value: 'goma (gray cat)' },
    ],
  },
  {
    images: ['/items/dress.jpg', '/items/selfie.jpg', '/items/selfie-2.jpg', '/items/selfie-3.jpg', '/items/selfie-4.jpg'],
    name: 'selfie collection',
    short: 'my cozy memories',
    description:
      'a collection of selfies and photos of me. i like to take photos of myself when i feel cozy and happy, and they remind me of those moments when i look back at them.',
    details: [
      { label: 'type', value: 'selfies & photos' },
      { label: 'mood', value: 'cozy & happy' },
      { label: 'frequency', value: 'whenever i feel like it' },
    ],
  },
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
        <div className='grid grid-cols-1 gap-4 xxs:grid-cols-2 sm:grid-cols-3'>
          {things.map((thing, index) => (
            <Dialog.Trigger key={thing.name} asChild>
              <button
                type='button'
                onClick={(event) => openThing(thing, event)}
                className='group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              >
                <div className='relative aspect-square w-full overflow-hidden bg-background'>
                  <Image
                    src={thing.images[0]}
                    alt={thing.name}
                    fill
                    sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px'
                    priority={index < 3}
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
          <Dialog.Overlay className='fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-background/40' />
          <Dialog.Content
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              triggerRef.current?.focus({ preventScroll: true });
            }}
            className='fixed left-1/2 top-1/2 z-50 flex max-h-[98vh] w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl focus:outline-none'
          >
            {selected && (
              <div className='flex min-h-0 flex-col overflow-y-auto'>
                {/* Main Image Viewport with responsive aspect ratio */}
                <div className='relative aspect-square sm:aspect-4/3 w-full shrink-0 overflow-hidden bg-secondary'>
                  <Image
                    key={`bg-${activePhoto}`}
                    src={selected.images[activePhoto]}
                    alt=''
                    role='none'
                    fill
                    className='scale-105 select-none object-cover opacity-40 blur-md dark:opacity-20'
                    unoptimized
                  />

                  <Image
                    key={`main-${activePhoto}`}
                    src={selected.images[activePhoto]}
                    alt={`${selected.name} photo ${activePhoto + 1}`}
                    fill
                    priority
                    className='z-10 object-contain'
                  />

                  <Dialog.Close className='fixed right-3 top-3 z-30 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
                    <XIcon className='size-4' aria-hidden='true' />
                    <span className='sr-only'>Close</span>
                  </Dialog.Close>
                </div>

                {/* Rigid Single-row Horizontal Scrolling Thumbnails */}
                {selected.images.length > 1 && (
                  <div className='flex gap-2 px-4 pt-4 flex-wrap pb-2'>
                    {selected.images.map((image, index) => (
                      <button
                        key={`${selected.name}-thumb-${index}`}
                        type='button'
                        onClick={() => setActivePhoto(index)}
                        aria-label={`View ${selected.name} photo ${index + 1}`}
                        aria-current={index === activePhoto}
                        className={`relative size-12 shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-14 ${
                          index === activePhoto ? 'scale-105 border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={image} alt='' fill sizes='56px' className='object-cover' />
                      </button>
                    ))}
                  </div>
                )}

                {/* Description Block */}
                <div className='max-w-md p-6 pt-2'>
                  <Dialog.Title className='flex items-center gap-2 font-display text-xl font-bold text-primary'>
                    <HeartIcon className='size-5 shrink-0' aria-hidden='true' />
                    {selected.name}
                  </Dialog.Title>
                  <Dialog.Description className='mt-2 text-pretty leading-relaxed text-muted-foreground whitespace-pre-line'>
                    {selected.description}
                  </Dialog.Description>

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
