'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useId, useState } from 'react';

import { CheckIcon, ImagePlusIcon, XIcon } from 'lucide-react';

import type { LibraryPhoto } from '@/lib/photos';

import { useField, type Path } from '@/components/admin/form';
import { PhotoThumb } from '@/components/admin/photo-thumb';
import { UploadButton } from '@/components/admin/photo-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field';

/**
 * A gallery card's photos, from the library: drag to reorder (the first is
 * the cover), remove with the cross, add more or upload new ones from the
 * picker.
 */
export function PhotosField({
  path,
  library: initialLibrary,
}: {
  path: Path;
  library: LibraryPhoto[];
}) {
  const dndId = useId();
  const field = useField<string[]>(path);
  const ids = field.value ?? [];
  const [library, setLibrary] = useState(initialLibrary);
  const [open, setOpen] = useState(false);
  const urls = new Map(library.map((photo) => [photo.id, photo.url]));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function move({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    field.set(
      arrayMove(
        ids,
        ids.indexOf(String(active.id)),
        ids.indexOf(String(over.id))
      )
    );
  }

  function toggle(id: string) {
    field.set(
      ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id]
    );
  }

  return (
    <div className='flex flex-col gap-3' role='group' aria-label='Photos'>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-medium text-foreground'>Photos</p>
        <p className='text-sm text-muted-foreground'>
          Drag to reorder. The first is the card&apos;s cover.
        </p>
      </div>

      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={move}
      >
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <ul className='grid grid-cols-3 gap-2 sm:grid-cols-5'>
            {ids.map((id, index) => (
              <SortablePhoto
                key={id}
                id={id}
                url={urls.get(id)}
                cover={index === 0}
                label={`Photo ${index + 1}`}
                onRemove={() => toggle(id)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {field.error && <FieldError>{field.error}</FieldError>}

      <Button
        type='button'
        variant='outline'
        className='self-start'
        onClick={() => setOpen(true)}
      >
        <ImagePlusIcon />
        Add photos
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Pick photos</DialogTitle>
            <DialogDescription>
              Tap a photo to add it to the card, again to take it off.
            </DialogDescription>
          </DialogHeader>
          {/* Padded inside, and pulled out as much, so a picked photo's outline
              isn't cut off where the list scrolls */}
          <ul className='-m-1 grid max-h-[60vh] grid-cols-3 gap-2 overflow-y-auto p-1 sm:grid-cols-5'>
            {library.map((photo) => {
              const picked = ids.includes(photo.id);
              return (
                <li key={photo.id}>
                  <button
                    type='button'
                    aria-pressed={picked}
                    aria-label={
                      picked ? 'Take off the card' : 'Add to the card'
                    }
                    onClick={() => toggle(photo.id)}
                    className='group relative block w-full rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
                  >
                    <PhotoThumb
                      url={photo.url}
                      className='transition-opacity group-aria-pressed:ring-3 group-aria-pressed:ring-primary'
                    />
                    <span className='absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full border border-border bg-background/90 text-primary group-aria-[pressed=false]:text-transparent'>
                      <CheckIcon className='size-4' />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <DialogFooter className='sm:justify-between'>
            <UploadButton
              variant='outline'
              onAdded={(photo) => {
                setLibrary((current) => [photo, ...current]);
                field.set([...(field.value ?? []), photo.id]);
              }}
            />
            <Button type='button' onClick={() => setOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SortablePhoto({
  id,
  url,
  cover,
  label,
  onRemove,
}: {
  id: string;
  url?: string;
  cover: boolean;
  label: string;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className='relative data-[dragging=true]:z-10'
      data-dragging={isDragging}
    >
      <div
        className='cursor-grab touch-none rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
        aria-label={`Move ${label}`}
        {...attributes}
        {...listeners}
      >
        {url ? (
          <PhotoThumb url={url} />
        ) : (
          <div className='aspect-square rounded-lg border border-border bg-secondary' />
        )}
      </div>
      {cover && (
        <span className='pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold text-primary'>
          Cover
        </span>
      )}
      <Button
        type='button'
        variant='secondary'
        size='icon-sm'
        className='absolute top-1.5 right-1.5 rounded-full'
        aria-label={`Remove ${label}`}
        onClick={onRemove}
      >
        <XIcon />
      </Button>
    </li>
  );
}
