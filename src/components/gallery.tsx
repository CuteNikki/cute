'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';

import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, HeartIcon, Maximize2Icon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { gallery, type GalleryItem } from '@/site.config';

import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Pan/zoom state (fvScale, fvPos, etc.) used to live on Gallery itself, but that meant every
// pointermove while dragging or wheel event while zooming re-rendered the *entire* gallery -
// the full grid of trigger buttons, thumbnails, and detail/spec lists - none of which visually
// changes during a pan/zoom gesture. Isolating it here means only this small subtree re-renders
// at drag/zoom frequency.
function FullViewImage({ src, alt, onRequestClose }: { src: string; alt: string; onRequestClose: () => void }) {
  const [fvScale, setFvScale] = useState(1);
  const [fvPos, setFvPos] = useState({ x: 0, y: 0 });
  const [fvDragging, setFvDragging] = useState(false);
  const fvContainerRef = useRef<HTMLDivElement | null>(null);
  const fvPanRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number; moved: boolean } | null>(null);

  const FV_MIN_SCALE = 1;
  const FV_MAX_SCALE = 5;

  function resetZoom() {
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
    if (!node) return;

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
  }, [fvScale, fvPos]);

  // Touch skips all of this: phones already have native pinch-zoom and pan, and our tap-to-zoom
  // and drag-to-pan fight with it (a pinch's two fingers each look like a tap or drag to us).
  function handleFvPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
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
      if (fvScale > FV_MIN_SCALE) resetZoom();
      else zoomAtPoint(event.clientX, event.clientY, 1.5);
    }
    fvPanRef.current = null;
    setFvDragging(false);
  }

  return (
    <>
      <Button
        type='button'
        variant='ghost'
        size='icon-lg'
        onClick={onRequestClose}
        aria-label='Close full view'
        className='absolute right-3 top-3 z-20 rounded-full bg-background/10 text-background hover:bg-background/20 dark:text-foreground dark:hover:bg-background/20'
      >
        <XIcon aria-hidden='true' />
      </Button>

      <div
        ref={fvContainerRef}
        className={cn(
          // manipulation (not pinch-zoom) so one finger can still pan around the natively zoomed page
          'relative h-full w-full touch-manipulation overflow-hidden select-none',
          fvScale > FV_MIN_SCALE ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in',
        )}
        onPointerDown={handleFvPointerDown}
        onPointerMove={handleFvPointerMove}
        onPointerUp={handleFvPointerUp}
        onPointerCancel={handleFvPointerUp}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes='100vw'
          loading='eager'
          draggable={false}
          className={cn('object-contain', fvDragging ? '' : 'transition-transform duration-200 ease-out')}
          style={{ transform: `translate(${fvPos.x}px, ${fvPos.y}px) scale(${fvScale})`, transformOrigin: '0 0' }}
        />
      </div>
    </>
  );
}

export function Gallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [fullView, setFullView] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const draggingRef = useRef(false);
  const fullViewRef = useRef<HTMLDivElement | null>(null);

  function openThing(thing: GalleryItem, event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSelected(thing);
    setActivePhoto(0);
    setFullView(false);
  }

  function goToPhoto(index: number) {
    if (!selected) return;
    const total = selected.images.length;
    setActivePhoto(((index % total) + total) % total);
  }

  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (fullView) return; // Escape here is handled by the Dialog's onOpenChange below
      if (event.key === 'ArrowRight') goToPhoto(activePhoto + 1);
      else if (event.key === 'ArrowLeft') goToPhoto(activePhoto - 1);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, activePhoto, fullView]);

  // The dialog skips Base UI's scroll lock (see modal='trap-focus' below), so full view locks it
  // itself: otherwise a one-finger drag on the overlay invisibly scrolls the page behind it.
  // Native pinch-zoom panning moves the visual viewport, not the document, so it still works.
  useEffect(() => {
    if (!fullView) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [fullView]);

  return (
    <section id='gallery' aria-labelledby='gallery-heading' className='space-y-4 scroll-mt-6'>
      <SectionTitle id='gallery-heading'>{gallery.title}</SectionTitle>

      <Dialog
        open={selected !== null}
        // 'trap-focus' keeps keyboard focus trapped (still correct a11y) but skips modal
        // scroll-locking, which otherwise has to inspect every wheel/touchmove event on the page
        // (including our own zoom/pan gestures below) to decide whether to block it - a real,
        // well-known source of jank for exactly those gesture types. The overlay already covers
        // the full viewport, so there's no visible difference from losing the scroll lock.
        modal='trap-focus'
        onOpenChange={(open, eventDetails) => {
          if (open) return;
          // The full-view zoom overlay below lives in its own portal, outside the dialog's own
          // popup, so a press anywhere inside it (including its own close button) looks like an
          // "outside" press to the dialog. Base UI funnels every dismissal reason through this
          // one callback (unlike Radix's separate outside/escape/focus callbacks), so both cases
          // below are handled right here instead of needing a second suppression flag.
          if (eventDetails.reason === 'outside-press' && fullViewRef.current?.contains(eventDetails.event.target as Node)) {
            eventDetails.cancel();
            return;
          }
          if (eventDetails.reason === 'escape-key' && fullView) {
            eventDetails.cancel();
            setFullView(false);
            return;
          }
          setSelected(null);
        }}
      >
        <div className='grid grid-cols-1 gap-4 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
          {gallery.items.map((thing, index) => (
            <DialogTrigger
              key={thing.name}
              render={
                <button
                  type='button'
                  onClick={(event) => openThing(thing, event)}
                  className={cn(
                    'group flex flex-col rounded-3xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    index === 0 && 'lg:col-span-2',
                  )}
                />
              }
            >
              {/* Lift the inner card, not the button, so the hover area stays put and can't flicker at the edges */}
              <div className='relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform duration-200 group-hover:-translate-y-1'>
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
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  {thing.images.length > 1 && (
                    <Badge className='absolute bottom-2 right-2 h-auto rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur'>
                      {thing.images.length} photos
                    </Badge>
                  )}
                </div>
                <div className='p-6'>
                  <h3 className='font-display text-sm font-semibold text-foreground'>{thing.name}</h3>
                  <p className='mt-0.5 text-xs leading-relaxed text-muted-foreground'>{thing.short}</p>
                </div>
              </div>
            </DialogTrigger>
          ))}
        </div>

        <DialogContent
          showCloseButton={false}
          finalFocus={() => {
            triggerRef.current?.focus({ preventScroll: true });
            return false;
          }}
          className='fixed left-1/2 top-1/2 z-50 flex max-h-[98vh] w-[calc(100%-1rem)] max-w-3xl sm:max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-card p-0 shadow-2xl focus:outline-none'
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
                  sizes='(min-width: 768px) 768px, 100vw'
                  className='scale-105 select-none object-cover opacity-40 blur-md dark:opacity-20'
                  quality={10}
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
                    setFullView(true);
                  }}
                >
                  <Image
                    src={selected.images[activePhoto]}
                    alt={`${selected.name} photo ${activePhoto + 1}`}
                    fill
                    sizes='(min-width: 768px) 768px, 100vw'
                    loading='eager'
                    draggable={false}
                    className='object-contain'
                  />
                </motion.div>

                {selected.images.length > 1 && (
                  <>
                    {/* Button's own active state fights any translate-based vertical centering
                        (both live on the single native `translate` property in Tailwind v4, and
                        trying to out-order/out-specificity its built-in press effect proved
                        unreliable). Centering via inset+margin instead of translate sidesteps the
                        conflict entirely - there's no transform left for the press effect to clobber. */}
                    <Button
                      type='button'
                      variant='frosted'
                      size='icon'
                      onClick={() => goToPhoto(activePhoto - 1)}
                      aria-label='Previous photo'
                      className='absolute inset-y-0 left-2 z-20 my-auto sm:size-9'
                    >
                      <ChevronLeftIcon aria-hidden='true' />
                    </Button>
                    <Button
                      type='button'
                      variant='frosted'
                      size='icon'
                      onClick={() => goToPhoto(activePhoto + 1)}
                      aria-label='Next photo'
                      className='absolute inset-y-0 right-2 z-20 my-auto sm:size-9'
                    >
                      <ChevronRightIcon aria-hidden='true' />
                    </Button>
                  </>
                )}

                <Button
                  type='button'
                  variant='frosted'
                  size='icon'
                  onClick={() => setFullView(true)}
                  aria-label='View full size'
                  className='absolute bottom-3 left-3 z-20 sm:size-9'
                >
                  <Maximize2Icon aria-hidden='true' />
                </Button>

                <DialogClose render={<Button type='button' variant='frosted' size='icon' aria-label='Close' className='fixed right-3 top-3 z-30' />}>
                  <XIcon aria-hidden='true' />
                </DialogClose>
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
                      className={cn(
                        'relative size-12 shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-14',
                        index === activePhoto ? 'scale-105 border-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100',
                      )}
                    >
                      <Image src={image} alt='' fill sizes='56px' className='object-cover' />
                    </button>
                  ))}
                </div>
              )}

              {/* Description Block */}
              <div className='max-w-xl p-6 pt-2'>
                <DialogTitle className='flex items-center gap-2 font-display text-xl font-bold text-primary'>
                  <HeartIcon className='size-5 shrink-0' aria-hidden='true' />
                  {selected.name}
                </DialogTitle>
                <DialogDescription className='mt-2 text-pretty leading-relaxed text-muted-foreground whitespace-pre-line'>
                  {selected.description}
                </DialogDescription>

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
                        <dt className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>{spec.label}</dt>
                        <dd className='mt-1 text-sm font-semibold leading-snug text-foreground'>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {selected.link && (
                  // Styled as one more details row (not a solid button) so it sits quietly with the
                  // rows above it instead of shouting over them.
                  <a
                    href={selected.link.href}
                    target='_blank'
                    rel='noreferrer'
                    className='group mt-2 flex items-center justify-between gap-4 rounded-2xl bg-secondary/60 px-4 py-2 text-sm transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  >
                    <span className='font-medium text-muted-foreground'>{selected.link.label}</span>
                    <span className='flex min-w-0 items-center gap-1.5 font-semibold text-primary'>
                      <span className='truncate group-hover:underline underline-offset-4'>{new URL(selected.link.href).host}</span>
                      <ExternalLinkIcon className='size-3.5 shrink-0' aria-hidden='true' />
                    </span>
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>

        {selected && fullView && (
          <DialogPortal>
            <div ref={fullViewRef} className='pointer-events-auto fixed inset-0 z-60 bg-foreground/95 dark:bg-background/95'>
              <FullViewImage
                src={selected.images[activePhoto]}
                alt={`${selected.name} photo ${activePhoto + 1}, full size`}
                onRequestClose={() => setFullView(false)}
              />
            </div>
          </DialogPortal>
        )}
      </Dialog>
    </section>
  );
}
