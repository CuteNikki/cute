import { cn } from 'cn';
import Image from 'next/image';

/** A photo as a square, for the library and the gallery cards' photo lists. */
export function PhotoThumb({
  url,
  alt = '',
  className,
}: {
  url: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden rounded-lg border border-border bg-secondary',
        className
      )}
    >
      <Image
        src={url}
        alt={alt}
        fill
        sizes='160px'
        className='object-cover'
        draggable={false}
      />
    </div>
  );
}
