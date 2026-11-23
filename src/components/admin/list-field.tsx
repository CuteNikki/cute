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
import { cn } from 'cn';
import { useId, useState, type ReactNode } from 'react';

import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react';

import { useField, type Path } from '@/components/admin/form';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';

let nextKey = 0;
const newKey = () => `item-${nextKey++}`;

/**
 * A list in the form: drag the handle (or focus it and use the arrow keys)
 * to reorder, add at the bottom, remove each with its bin. `children` draws
 * one item's fields from its path.
 */
export function ListField<T>({
  path,
  label,
  description,
  addLabel,
  newItem,
  inline,
  children,
}: {
  path: Path;
  label: string;
  description?: ReactNode;
  addLabel: string;
  newItem: () => T;
  /** Items on one line with their handle and bin, for short ones. */
  inline?: boolean;
  children: (itemPath: Path, index: number) => ReactNode;
}) {
  const dndId = useId();
  const field = useField<T[]>(path);
  const items = field.value ?? [];

  // Keys that stay with each item as it moves, which the values themselves
  // can't give. Made again when the list changes length from outside (undo).
  const [keys, setKeys] = useState(() => items.map(newKey));
  if (keys.length !== items.length) setKeys(items.map(newKey));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function move({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;
    const from = keys.indexOf(String(active.id));
    const to = keys.indexOf(String(over.id));
    setKeys(arrayMove(keys, from, to));
    field.set(arrayMove(items, from, to));
  }

  return (
    <div className='flex flex-col gap-3' role='group' aria-label={label}>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-medium text-foreground'>{label}</p>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>

      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={move}
      >
        <SortableContext items={keys} strategy={verticalListSortingStrategy}>
          <ul className='flex flex-col gap-2'>
            {keys.map((key, index) => (
              <SortableItem
                key={key}
                id={key}
                inline={inline}
                label={`${label} ${index + 1}`}
                onRemove={() => {
                  setKeys(keys.filter((_, i) => i !== index));
                  field.set(items.filter((_, i) => i !== index));
                }}
              >
                {children([...path, index], index)}
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {field.error && <FieldError>{field.error}</FieldError>}

      <Button
        type='button'
        variant='outline'
        className='self-start'
        onClick={() => {
          setKeys([...keys, newKey()]);
          field.set([...items, newItem()]);
        }}
      >
        <PlusIcon />
        {addLabel}
      </Button>
    </div>
  );
}

function SortableItem({
  id,
  label,
  inline,
  onRemove,
  children,
}: {
  id: string;
  label: string;
  inline?: boolean;
  onRemove: () => void;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      className='flex flex-wrap items-start gap-2 rounded-2xl border border-border bg-background p-2 data-[dragging=true]:z-10 data-[dragging=true]:shadow-md sm:flex-nowrap sm:p-3'
      data-dragging={isDragging}
    >
      <Button
        ref={setActivatorNodeRef}
        type='button'
        variant='ghost'
        size='icon'
        className='cursor-grab touch-none text-muted-foreground'
        aria-label={`Move ${label}`}
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon />
      </Button>
      <div
        // On phones the handle and bin sit on a row of their own above the
        // fields, so the fields get the whole width
        className={cn(
          'order-3 flex min-w-0 basis-full sm:order-2 sm:flex-1 sm:basis-0',
          inline
            ? 'flex-wrap items-start gap-2 *:min-w-40 *:flex-1'
            : 'flex-col gap-4'
        )}
      >
        {children}
      </div>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='order-2 ml-auto text-muted-foreground hover:text-destructive sm:order-3'
        aria-label={`Remove ${label}`}
        onClick={onRemove}
      >
        <Trash2Icon />
      </Button>
    </li>
  );
}
