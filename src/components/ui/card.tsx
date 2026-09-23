import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

// Every Card usage in this project overrode the stock look the same way (a real border instead
// of the default ring, rounded-3xl instead of the ring-capped radius token, full p-6 padding
// instead of CardContent-only horizontal padding). Baking that in as the default here means call
// sites stop repeating it, and `soft` covers the one recurring background variant (bg-secondary/60).
const cardVariants = cva(
  'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-3xl border border-border bg-card p-(--card-spacing) text-sm text-card-foreground shadow-sm [--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)]',
  {
    variants: {
      variant: {
        default: '',
        soft: 'bg-secondary/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Card({
  className,
  variant,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof cardVariants> & { size?: 'default' | 'sm' }) {
  return <div data-slot='card' data-size={size} className={cn(cardVariants({ variant }), className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        'group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-title' className={cn('text-base font-medium', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-description' className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-action' className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={className} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='card-footer' className={cn('flex items-center [.border-t]:pt-(--card-spacing)', className)} {...props} />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
