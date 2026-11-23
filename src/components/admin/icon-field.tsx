'use client';

import { DynamicIcon, iconNames, type IconName } from 'lucide-react/dynamic';
import { useDeferredValue, useId, useState } from 'react';

import { SearchIcon } from 'lucide-react';

import { FieldShell, useField, type Path } from '@/components/admin/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/** How many matches the picker shows at once; searching narrows them. */
const SHOWN = 96;

/** Picks a lucide icon by searching its name, e.g. "cat" or "heart". */
export function IconField({ path, label }: { path: Path; label: string }) {
  const id = useId();
  const field = useField<string>(path);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const search = useDeferredValue(query.trim().toLowerCase());
  const matches = iconNames
    .filter((name) => name.includes(search))
    .slice(0, SHOWN);
  const known = iconNames.includes(field.value as IconName);

  return (
    <FieldShell id={id} label={label} error={field.error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              type='button'
              variant='outline'
              className='justify-start'
              aria-invalid={field.error ? true : undefined}
            />
          }
        >
          {known ? (
            <DynamicIcon name={field.value as IconName} />
          ) : (
            <span className='size-4' />
          )}
          <span className='truncate'>{field.value || 'Pick an icon'}</span>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-80 max-w-[calc(100vw-2rem)]'>
          <div className='relative'>
            <SearchIcon className='pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search icons'
              aria-label='Search icons'
              className='pl-9'
            />
          </div>
          <div className='grid h-64 grid-cols-6 content-start gap-1 overflow-y-auto'>
            {matches.map((name) => (
              <Button
                key={name}
                type='button'
                variant={name === field.value ? 'secondary' : 'ghost'}
                size='icon-lg'
                title={name}
                aria-label={name}
                aria-pressed={name === field.value}
                onClick={() => {
                  field.set(name);
                  setOpen(false);
                  setQuery('');
                }}
              >
                <DynamicIcon name={name} />
              </Button>
            ))}
            {matches.length === 0 && (
              <p className='col-span-6 py-6 text-center text-sm text-muted-foreground'>
                No icon called that
              </p>
            )}
          </div>
          <a
            href='https://lucide.dev/icons'
            target='_blank'
            rel='noreferrer'
            className='text-xs text-muted-foreground underline'
          >
            Browse all icons on lucide.dev
          </a>
        </PopoverContent>
      </Popover>
    </FieldShell>
  );
}
