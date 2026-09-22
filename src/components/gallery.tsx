'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';

import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, Maximize2Icon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { SectionTitle } from '@/components/section-title';

type CuteThing = {
  images: string[];
  name: string;
  short: string;
  description: string;
  details: { label: string; value: string }[];
  /** Optional larger grid of stats, for things with more going on than `details` comfortably fits (e.g. pc specs). */
  specs?: { label: string; value: string }[];
};

const things: CuteThing[] = [
  {
    images: [
      '/items/plushies-3.jpg',
      '/items/plushies-8.jpg',
      '/items/plushies-2.jpg',
      '/items/plushies-4.jpg',
      '/items/pusheen.jpg',
      '/items/pusheen-together-2.jpg',
      '/items/plushies-5.jpg',
      '/items/plushies-6.jpg',
      '/items/nebula-snuggles-stack.png',
      '/items/pusheen-together.png',
      '/items/shark-stack.png',
      '/items/mayo-tuna.png',
      '/items/plushies.png',
    ],
    name: 'plush family',
    short: 'my cuddle buddies',
    description: 'a super squishy plushie family that lives on my bed. they come everywhere with me on cozy nights.',
    details: [
      { label: 'softness', value: '10/10 squish' },
      { label: 'cuddly', value: 'always' },
      { label: 'favourite', value: 'goma (gray cat)' },
    ],
  },
  {
    images: ['/items/backpack-7.jpg', '/items/backpack-6.jpg', '/items/backpack-4.jpg', '/items/backpack-5.jpg'],
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
    images: ['/items/desk-setup.jpg', '/items/desk-setup-2.jpg'],
    name: 'my desk setup',
    short: 'where the magic happens',
    description:
      'my cozy little battlestation - soft pastel lighting, a glowing pc build, and way too many plushies crowding the desk. full specs below, for the curious ✨',
    details: [
      { label: 'vibe', value: 'cozy & glowy' },
      { label: 'plushies on desk', value: 'too many to count' },
      { label: 'main character', value: 'the ugly mouse' },
    ],
    specs: [
      { label: 'cpu', value: 'AMD Ryzen 7 9800X3D' },
      { label: 'motherboard', value: 'Gigabyte B850 AORUS ELITE WIFI7 ICE' },
      { label: 'ram', value: 'T-Create Expert 32GB DDR5-6000 CL30' },
      { label: 'gpu', value: 'Gigabyte AERO OC RTX 5070 Ti 16GB' },
      { label: 'case', value: 'Lian Li O11 Vision' },
      { label: 'case fans', value: 'Lian Li UNI FAN SL-INF' },
      { label: 'psu', value: 'Corsair RM850x SHIFT 850W' },
      { label: 'storage', value: 'Samsung 970 EVO Plus 1TB' },
      { label: 'main monitor', value: 'XG27ACDNG · 1440p OLED 360Hz' },
      { label: 'second monitor', value: 'G24F 2 · 1080p 180Hz' },
      { label: 'keyboard', value: 'Wooting 80HE (White Zinc)' },
      { label: 'mouse', value: 'Razer Viper V4 Pro / zeromouse blade' },
      { label: 'mousepad', value: 'Wallhack SP-004 (glass)' },
      { label: 'microphone', value: 'SteelSeries Alias Pro' },
      { label: 'headphones', value: 'Sony WH-1000XM6' },
      { label: 'webcam', value: 'OBSBOT Meet 2' },
      { label: 'desk', value: 'Flexispot E7 Pro' },
    ],
  },
  {
    images: ['/items/onesie.jpg', '/items/onesie-goma.jpg', '/items/kaomoji-tee.jpg', '/items/kaomoji-tee-2.jpg', '/items/selfie-6.jpg', '/items/selfie-5.jpg'],
    name: 'comfy outfits',
    short: 'my cozy at home fits',
    description: 'a peek at my comfiest loungewear - a cozy shark onesie, my favourite kaomoji tee, and the pajama sets i basically live in on lazy days.',
    details: [
      { label: 'style', value: 'cozy & comfy' },
      { label: 'approved by', value: 'goma (gray cat)' },
    ],
  },
  {
    images: ['/items/dress.jpg', '/items/selfie-7.jpg', '/items/selfie-8.jpg', '/items/selfie-2.jpg', '/items/selfie-10.jpg'],
    name: 'selfie collection',
    short: 'a better look at me',
    description:
      'a collection of selfies and photos of me. i like to take photos of myself when i feel cozy and happy, and they remind me of those moments when i look back at them.',
    details: [
      { label: 'type', value: 'selfies & photos' },
      { label: 'mood', value: 'cozy & happy' },
      { label: 'frequency', value: 'whenever i feel like it' },
    ],
  },
  {
    images: ['/items/bottle.jpg', '/items/bottle-2.jpg', '/items/bottle-3.jpg', '/items/bottle-4.jpg'],
    name: 'pastel bottle',
    short: 'my little sippy',
    description: 'my pastel baby bottles, covered in unicorns and rainbows. they make bedtime feel extra soft and safe.',
    details: [
      { label: 'colour', value: 'pastel pink' },
      { label: 'material', value: 'silicone teat' },
      { label: 'use', value: 'bedtime comfort' },
    ],
  },
  {
    images: ['/items/pacifier.png', '/items/pacifier-2.png'],
    name: 'pastel pacifier',
    short: 'my comfort chew',
    description:
      'a pastel pink adult pacifier decorated with tiny yellow stars, fluffy little clouds and a sweet centre graphic of cuddling kittens.\nit is the perfect cozy companion for winding down, relaxing and feeling safe and small.\nyes, i actually use it regularly.',
    details: [
      { label: 'colour', value: 'pastel pink' },
      { label: 'material', value: 'silicone' },
      { label: 'design', value: 'peach & goma' },
    ],
  },
  {
    images: [
      '/items/necklace.jpg',
      '/items/necklace-2.jpg',
      '/items/necklace-3.jpg',
      '/items/necklace-4.jpg',
      '/items/necklace-5.jpg',
      '/items/necklace-6.jpg',
    ],
    name: 'necklaces',
    short: 'matching with my love',
    description: 'a matching pair of cat pendant necklaces - one for me and one for christian.\nthey catch such different colours depending on the light.',
    details: [
      { label: 'worn with', value: 'christian ♡' },
      { label: 'material', value: 'stainless steel' },
      { label: 'design', value: 'peach & goma' },
    ],
  },
  {
    images: ['/items/flowers.jpg', '/items/flowers-3.jpg'],
    name: 'flower bouquet',
    short: 'a gift from christian',
    description: 'a beautiful bouquet christian surprised me with, plus the sweetest little card to go with it.',
    details: [
      { label: 'from', value: 'christian 💖' },
      { label: 'flowers', value: "roses & baby's breath" },
      { label: 'mood', value: 'butterflies' },
    ],
  },
];

export function Gallery() {
  const [selected, setSelected] = useState<CuteThing | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [fullView, setFullView] = useState(false);
  const [fvScale, setFvScale] = useState(1);
  const [fvPos, setFvPos] = useState({ x: 0, y: 0 });
  const [fvDragging, setFvDragging] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const draggingRef = useRef(false);
  const fullViewRef = useRef<HTMLDivElement | null>(null);
  const fvContainerRef = useRef<HTMLDivElement | null>(null);
  const fvPanRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number; moved: boolean } | null>(null);
  const suppressNextOutsideRef = useRef(false);

  const FV_MIN_SCALE = 1;
  const FV_MAX_SCALE = 5;

  function openThing(thing: CuteThing, event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSelected(thing);
    setActivePhoto(0);
    setFullView(false);
    resetFullViewZoom();
  }

  function goToPhoto(index: number) {
    if (!selected) return;
    const total = selected.images.length;
    setActivePhoto(((index % total) + total) % total);
    resetFullViewZoom();
  }

  function resetFullViewZoom() {
    setFvScale(1);
    setFvPos({ x: 0, y: 0 });
  }

  // With transform-origin 0 0, translate(x,y) scale(S) anchors the content's top-left at the
  // container's top-left before shifting. So the valid pan range isn't symmetric around 0: it
  // runs from 0 (content's top-left showing) down to width*(1-S) (content's bottom-right showing).
  function clampPan(x: number, y: number, scale: number, rect: DOMRect) {
    const minX = rect.width * (1 - scale);
    const minY = rect.height * (1 - scale);
    return {
      x: Math.min(0, Math.max(minX, x)),
      y: Math.min(0, Math.max(minY, y)),
    };
  }

  // Reads fvScale/fvPos directly rather than via functional updaters, so it must only be called
  // somewhere that's guaranteed a fresh closure (a per-render handler, or an effect that
  // re-registers whenever these values change) - never nest a setFvPos call inside a setFvScale
  // updater (or vice versa): React's dev Strict Mode double-invokes updater functions to check
  // they're pure, and a nested setState call is a side effect that then fires twice, silently
  // compounding the result.
  function zoomAtPoint(clientX: number, clientY: number, deltaScale: number) {
    const rect = fvContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    const newScale = Math.min(FV_MAX_SCALE, Math.max(FV_MIN_SCALE, fvScale + deltaScale));
    if (newScale === FV_MIN_SCALE) {
      setFvScale(newScale);
      setFvPos({ x: 0, y: 0 });
      return;
    }
    const lx = (cx - fvPos.x) / fvScale;
    const ly = (cy - fvPos.y) / fvScale;
    const nx = cx - lx * newScale;
    const ny = cy - ly * newScale;
    setFvScale(newScale);
    setFvPos(clampPan(nx, ny, newScale, rect));
  }

  // Wheel: plain scroll zooms toward the cursor, shift+scroll pans horizontally. Needs a
  // non-passive native listener since React's onWheel can't preventDefault the page scroll.
  // Re-registered whenever fvScale/fvPos change so handleWheel's closure never goes stale.
  useEffect(() => {
    const node = fvContainerRef.current;
    if (!fullView || !node) return;

    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (event.shiftKey) {
        if (fvScale <= FV_MIN_SCALE) return;
        const amount = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        const rect = node!.getBoundingClientRect();
        setFvPos(clampPan(fvPos.x - amount, fvPos.y, fvScale, rect));
      } else {
        zoomAtPoint(event.clientX, event.clientY, -event.deltaY * 0.0018);
      }
    }

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullView, fvScale, fvPos]);

  function handleFvPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    fvPanRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: fvPos.x, originY: fvPos.y, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleFvPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const pan = fvPanRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    const dx = event.clientX - pan.startX;
    const dy = event.clientY - pan.startY;
    if (!pan.moved && Math.hypot(dx, dy) < 4) return;
    pan.moved = true;
    setFvDragging(true);
    if (fvScale <= FV_MIN_SCALE) return;
    const rect = fvContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setFvPos(clampPan(pan.originX + dx, pan.originY + dy, fvScale, rect));
  }

  function handleFvPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const pan = fvPanRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    if (!pan.moved) {
      // a real click/tap, no drag: zoom in toward it, or back out if already zoomed
      if (fvScale > FV_MIN_SCALE) resetFullViewZoom();
      else zoomAtPoint(event.clientX, event.clientY, 1.5);
    }
    fvPanRef.current = null;
    setFvDragging(false);
  }

  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (fullView) return; // Escape here is handled by Dialog.Content's onEscapeKeyDown
      if (event.key === 'ArrowRight') goToPhoto(activePhoto + 1);
      else if (event.key === 'ArrowLeft') goToPhoto(activePhoto - 1);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, activePhoto, fullView]);

  return (
    <section id='gallery' aria-labelledby='gallery-heading' className='space-y-4 scroll-mt-6'>
      <SectionTitle id='gallery-heading'>photo gallery</SectionTitle>

      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <div className='grid grid-cols-1 gap-4 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {things.map((thing, index) => (
            <Dialog.Trigger key={thing.name} asChild>
              <button
                type='button'
                onClick={(event) => openThing(thing, event)}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  index === 0 && 'lg:col-span-2',
                )}
              >
                <div className={cn('relative w-full overflow-hidden bg-background', index === 0 ? 'aspect-square lg:aspect-2/1' : 'aspect-square')}>
                  <Image
                    src={thing.images[0]}
                    alt={thing.name}
                    fill
                    sizes={
                      index === 0
                        ? '(max-width: 480px) 92vw, (max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1280px) 46vw, 620px'
                        : '(max-width: 480px) 92vw, (max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1280px) 23vw, 300px'
                    }
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
            onInteractOutside={(event) => {
              // Closing full view (e.g. its own close button) unmounts fullViewRef's node and can
              // shift focus, which triggers Radix's *separate* focus-outside detection a moment
              // later - by then fullViewRef.current is already null, so that check alone can't
              // catch it. suppressNextOutsideRef covers that one follow-up interaction.
              if (suppressNextOutsideRef.current) {
                suppressNextOutsideRef.current = false;
                event.preventDefault();
                return;
              }
              if (fullViewRef.current?.contains(event.target as Node)) {
                event.preventDefault();
              }
            }}
            onEscapeKeyDown={(event) => {
              if (fullView) {
                event.preventDefault();
                setFullView(false);
                resetFullViewZoom();
              }
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

                  <motion.div
                    key={`main-${activePhoto}`}
                    className='absolute inset-0 z-10 cursor-zoom-in touch-pan-y'
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    dragMomentum={false}
                    onDragStart={() => {
                      draggingRef.current = true;
                    }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60 || info.velocity.x < -500) goToPhoto(activePhoto + 1);
                      else if (info.offset.x > 60 || info.velocity.x > 500) goToPhoto(activePhoto - 1);
                      requestAnimationFrame(() => {
                        draggingRef.current = false;
                      });
                    }}
                    onClick={() => {
                      if (draggingRef.current) return;
                      resetFullViewZoom();
                      setFullView(true);
                    }}
                  >
                    <Image
                      src={selected.images[activePhoto]}
                      alt={`${selected.name} photo ${activePhoto + 1}`}
                      fill
                      priority
                      draggable={false}
                      className='object-contain'
                    />
                  </motion.div>

                  {selected.images.length > 1 && (
                    <>
                      <button
                        type='button'
                        onClick={() => goToPhoto(activePhoto - 1)}
                        aria-label='Previous photo'
                        className='absolute left-2 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-9'
                      >
                        <ChevronLeftIcon className='size-4' aria-hidden='true' />
                      </button>
                      <button
                        type='button'
                        onClick={() => goToPhoto(activePhoto + 1)}
                        aria-label='Next photo'
                        className='absolute right-2 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-9'
                      >
                        <ChevronRightIcon className='size-4' aria-hidden='true' />
                      </button>
                    </>
                  )}

                  <button
                    type='button'
                    onClick={() => {
                      resetFullViewZoom();
                      setFullView(true);
                    }}
                    aria-label='View full size'
                    className='absolute bottom-3 left-3 z-20 flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-9'
                  >
                    <Maximize2Icon className='size-4' aria-hidden='true' />
                  </button>

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
                        onClick={() => goToPhoto(index)}
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
                <div className='max-w-xl p-6 pt-2'>
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

                  {selected.specs && selected.specs.length > 0 && (
                    <dl className='mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3'>
                      {selected.specs.map((spec) => (
                        <div key={spec.label} className='rounded-2xl bg-secondary/60 p-4'>
                          <dt className='text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground'>{spec.label}</dt>
                          <dd className='mt-1 text-sm font-semibold leading-snug text-foreground'>{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            )}
          </Dialog.Content>

          {selected && fullView && (
            <div ref={fullViewRef} className='pointer-events-auto fixed inset-0 z-60 bg-foreground/95 dark:bg-background/95'>
              <button
                type='button'
                onClick={() => {
                  suppressNextOutsideRef.current = true;
                  setFullView(false);
                  resetFullViewZoom();
                }}
                aria-label='Close full view'
                className='absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-foreground'
              >
                <XIcon className='size-4' aria-hidden='true' />
              </button>

              <div
                ref={fvContainerRef}
                className={cn(
                  'relative h-full w-full touch-pinch-zoom overflow-hidden select-none',
                  fvScale > FV_MIN_SCALE ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in',
                )}
                onPointerDown={handleFvPointerDown}
                onPointerMove={handleFvPointerMove}
                onPointerUp={handleFvPointerUp}
                onPointerCancel={handleFvPointerUp}
              >
                <Image
                  src={selected.images[activePhoto]}
                  alt={`${selected.name} photo ${activePhoto + 1}, full size`}
                  fill
                  priority
                  draggable={false}
                  className={cn('object-contain', fvDragging ? '' : 'transition-transform duration-200 ease-out')}
                  style={{ transform: `translate(${fvPos.x}px, ${fvPos.y}px) scale(${fvScale})`, transformOrigin: '0 0' }}
                />
              </div>
            </div>
          )}
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
