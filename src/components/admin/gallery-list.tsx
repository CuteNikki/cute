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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import { useId, useState } from 'react';
import { toast } from 'sonner';

import { ChevronRightIcon, GripVerticalIcon } from 'lucide-react';

import { reorderGalleryItems } from '@/actions/gallery';

import { PhotoThumb } from '@/components/admin/photo-thumb';
import { Button } from '@/components/ui/button';

export type GalleryRow = {
  id: string;
  name: string;
  short: string;
  cover?: string;
  photos: number;
};

/** The gallery's cards; dragging one saves the new order straight away. */
export function GalleryList({ items: initial }: { items: GalleryRow[] }) {
  const dndId = useId();
  const [items, setItems] = useState(initial);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function move({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const ids = items.map((item) => item.id);
    const next = arrayMove(
      items,
      ids.indexOf(String(active.id)),
      ids.indexOf(String(over.id))
    );
    setItems(next);
    try {
      await reorderGalleryItems(next.map((item) => item.id));
      toast.success('New order saved');
    } catch {
      setItems(items);
      toast.error("The order couldn't be saved.");
    }
  }

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={move}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className='flex flex-col gap-2'>
          {items.map((item, index) => (
            <Row key={item.id} item={item} wide={index === 0} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function Row({ item, wide }: { item: GalleryRow; wide: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className='flex items-center gap-2 rounded-3xl border border-border bg-card p-2 shadow-sm data-[dragging=true]:z-10 data-[dragging=true]:shadow-md'
      data-dragging={isDragging}
    >
      <Button
        ref={setActivatorNodeRef}
        type='button'
        variant='ghost'
        size='icon'
        className='cursor-grab touch-none text-muted-foreground'
        aria-label={`Move ${item.name}`}
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon />
      </Button>
      <Link
        href={`/admin/gallery/${item.id}`}
        className='flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-1 outline-none hover:bg-secondary/60 focus-visible:ring-3 focus-visible:ring-ring/30'
      >
        {item.cover ? (
          <PhotoThumb url={item.cover} className='size-14 shrink-0' />
        ) : (
          <div className='size-14 shrink-0 rounded-lg bg-secondary' />
        )}
        <span className='flex min-w-0 flex-1 flex-col'>
          <span className='truncate font-display font-semibold text-foreground'>
            {item.name}
          </span>
          <span className='truncate text-sm text-muted-foreground'>
            {item.short} · {item.photos}{' '}
            {item.photos === 1 ? 'photo' : 'photos'}
            {wide && ' · shown wide'}
          </span>
        </span>
        <ChevronRightIcon className='size-4 shrink-0 text-muted-foreground' />
      </Link>
    </li>
  );
}
