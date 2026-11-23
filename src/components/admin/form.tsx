'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  use,
  useEffect,
  useId,
  useState,
  useTransition,
  type ReactNode,
} from 'react';
import { toast } from 'sonner';

import type { SaveResult } from '@/lib/form';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

/** Where a field's value is in the form's value: keys and list indexes. */
export type Path = (string | number)[];

type FormState = {
  get: (path: Path) => unknown;
  set: (path: Path, value: unknown) => void;
  error: (path: Path) => string | undefined;
};

const FormContext = createContext<FormState | null>(null);

function useForm() {
  const form = use(FormContext);
  if (!form) throw new Error('Fields go inside an AdminForm');
  return form;
}

function getAt(value: unknown, path: Path): unknown {
  return path.reduce<unknown>(
    (current, key) =>
      current == null ? undefined : (current as Record<string, unknown>)[key],
    value
  );
}

/** `value` with the part at `path` replaced, leaving `value` itself as it was. */
function setAt(value: unknown, path: Path, next: unknown): unknown {
  if (path.length === 0) return next;
  const [key, ...rest] = path;
  const copy = Array.isArray(value)
    ? [...value]
    : { ...(value as Record<string, unknown>) };
  (copy as Record<string | number, unknown>)[key] = setAt(
    (value as Record<string | number, unknown>)?.[key],
    rest,
    next
  );
  return copy;
}

/** The field's value and a setter, for fields of its own kind. */
export function useField<T>(path: Path) {
  const form = useForm();
  return {
    value: form.get(path) as T,
    set: (value: T) => form.set(path, value),
    error: form.error(path),
  };
}

/**
 * A form in /admin that saves its whole value at once with `save`, a server
 * action that checks it and answers with errors by field. A bar at the bottom
 * says when there are unsaved changes.
 */
export function AdminForm<T>({
  initial,
  save,
  onSaved,
  children,
}: {
  initial: T;
  save: (value: T) => Promise<SaveResult>;
  /** After a save went through, e.g. to go back to a list. */
  onSaved?: () => void;
  children: ReactNode;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(value) !== JSON.stringify(saved);

  // Asks before leaving the page with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const form: FormState = {
    get: (path) => getAt(value, path),
    set: (path, next) => setValue((current) => setAt(current, path, next) as T),
    error: (path) => errors[path.join('.')],
  };

  function submit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await save(value);
      if (result.ok) {
        setSaved(value);
        setErrors({});
        toast.success('Saved, the site shows it now');
        if (onSaved) onSaved();
        else router.refresh();
      } else {
        setErrors(result.errors);
        toast.error('Some fields need a look');
      }
    });
  }

  return (
    <FormContext value={form}>
      <form onSubmit={submit} noValidate className='flex flex-col gap-6'>
        {children}
        <div className='sticky bottom-0 z-10 -mx-4 flex items-center justify-end gap-3 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6'>
          <p
            className='text-sm text-muted-foreground data-[dirty=false]:invisible'
            data-dirty={dirty}
            aria-live='polite'
          >
            Unsaved changes
          </p>
          <Button
            type='button'
            variant='ghost'
            disabled={!dirty || pending}
            onClick={() => {
              setValue(saved);
              setErrors({});
            }}
          >
            Undo
          </Button>
          <Button type='submit' disabled={!dirty || pending}>
            Save
          </Button>
        </div>
      </form>
    </FormContext>
  );
}

/** A labelled field with its description and error. */
export function FieldShell({
  id,
  label,
  description,
  error,
  children,
}: {
  id: string;
  label: string;
  description?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}

/** A line of text, or several with `multiline`. */
export function TextField({
  path,
  label,
  description,
  multiline,
  placeholder,
}: {
  path: Path;
  label: string;
  description?: ReactNode;
  multiline?: boolean;
  placeholder?: string;
}) {
  const id = useId();
  const field = useField<string>(path);
  const props = {
    id,
    value: field.value ?? '',
    placeholder,
    'aria-invalid': field.error ? true : undefined,
  };
  return (
    <FieldShell
      id={id}
      label={label}
      description={description}
      error={field.error}
    >
      {multiline ? (
        <Textarea
          {...props}
          rows={4}
          onChange={(event) => field.set(event.target.value)}
        />
      ) : (
        <Input {...props} onChange={(event) => field.set(event.target.value)} />
      )}
    </FieldShell>
  );
}

/** On or off. */
export function SwitchField({
  path,
  label,
  description,
}: {
  path: Path;
  label: string;
  description?: ReactNode;
}) {
  const id = useId();
  const field = useField<boolean>(path);
  return (
    <Field orientation='horizontal'>
      <Switch
        id={id}
        checked={field.value ?? false}
        onCheckedChange={(checked) => field.set(checked)}
      />
      <div className='flex flex-col gap-1'>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </div>
    </Field>
  );
}

/** A group of fields under a heading, like a card on the page. */
export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className='flex flex-col gap-5 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-display text-lg font-semibold text-foreground'>
          {title}
        </h2>
        {description && (
          <p className='text-sm text-muted-foreground'>{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
