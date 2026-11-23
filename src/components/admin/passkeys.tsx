'use client';

import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { toast } from 'sonner';

import { FingerprintIcon, LoaderCircleIcon, Trash2Icon } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type Passkey = { id: string; name: string | null; added: string };

/** Passkeys sign in with a fingerprint, face or the device's PIN, without Discord. */
export function Passkeys({ passkeys }: { passkeys: Passkey[] }) {
  const router = useRouter();
  const nameId = useId();
  const [adding, setAdding] = useState(false);

  async function add(formData: FormData) {
    setAdding(true);
    const name = String(formData.get('name')).trim();
    const result = await authClient.passkey.addPasskey({
      name: name || undefined,
    });
    setAdding(false);
    if (result?.error) {
      // Closing the browser's own prompt isn't worth an error.
      if (
        'code' in result.error &&
        result.error.code === 'ERROR_CEREMONY_ABORTED'
      ) {
        return;
      }
      return void toast.error(result.error.message ?? "Couldn't add a passkey");
    }
    toast.success('Passkey added');
    router.refresh();
  }

  async function remove(id: string) {
    const { error } = await authClient.passkey.deletePasskey({ id });
    if (error) return void toast.error(error.message ?? 'Something went wrong');
    toast.success('Passkey removed');
    router.refresh();
  }

  return (
    <div className='flex flex-col gap-4'>
      {passkeys.length > 0 && (
        <ul className='flex flex-col divide-y divide-border rounded-2xl border border-border'>
          {passkeys.map((passkey) => (
            <li key={passkey.id} className='flex items-center gap-3 p-3 pl-4'>
              <FingerprintIcon className='size-4 shrink-0 text-primary' />
              <span className='flex min-w-0 flex-1 flex-col'>
                <span className='truncate text-sm font-medium'>
                  {passkey.name ?? 'Passkey'}
                </span>
                <span className='text-xs text-muted-foreground'>
                  Added {passkey.added}
                </span>
              </span>
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <Button
                      variant='ghost'
                      size='icon-sm'
                      className='text-muted-foreground hover:text-destructive'
                      aria-label={`Remove ${passkey.name ?? 'passkey'}`}
                    />
                  }
                >
                  <Trash2Icon />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this passkey?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You can&apos;t sign in with it anymore. It may still show
                      on your device until you delete it there too.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep it</AlertDialogCancel>
                    <AlertDialogAction
                      variant='destructive'
                      onClick={() => remove(passkey.id)}
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          ))}
        </ul>
      )}
      <form action={add} className='flex flex-wrap items-end gap-2'>
        <div className='flex min-w-48 flex-1 flex-col gap-2'>
          <Label htmlFor={nameId}>Name</Label>
          <Input
            id={nameId}
            name='name'
            placeholder='e.g. Phone or Laptop'
            autoComplete='off'
          />
        </div>
        <Button type='submit' disabled={adding} aria-busy={adding}>
          {adding ? (
            <LoaderCircleIcon className='animate-spin' />
          ) : (
            <FingerprintIcon />
          )}
          Add a passkey
        </Button>
      </form>
    </div>
  );
}
