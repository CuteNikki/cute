import type { ReactNode } from 'react';

/** A page's title in /admin, with a line on what it changes. */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className='flex flex-wrap items-end justify-between gap-3'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-display text-xl font-bold text-foreground'>
          {title}
        </h1>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      {children}
    </div>
  );
}
