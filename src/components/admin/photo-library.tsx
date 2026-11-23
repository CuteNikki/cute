'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Trash2Icon } from 'lucide-react';

import { deletePhoto } from '@/actions/photos';

import type { LibraryPhoto } from '@/lib/photos';

import { PhotoThumb } from '@/components/admin/photo-thumb';
import { UploadButton } from '@/components/admin/photo-upload';
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

type Photo = LibraryPhoto & { cards: number };

/** Every photo, to upload new ones and delete the ones no card uses. */
export function PhotoLibrary({ photos: initial }: { photos: Photo[] }) {
  const [photos, setPhotos] = useState(initial);
  return (
    <div className='flex flex-col gap-4'>
      <UploadButton
        onAdded={(photo) =>
          setPhotos((current) => [{ ...photo, cards: 0 }, ...current])
        }
      />
      <ul className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {photos.map((photo) => (
          <li key={photo.id} className='flex flex-col gap-1.5'>
            <PhotoThumb url={photo.url} />
            <div className='flex min-h-8 items-center justify-between gap-1 px-1'>
              <span className='text-xs text-muted-foreground'>
                {photo.cards === 0
                  ? 'On no card'
                  : `On ${photo.cards} ${photo.cards === 1 ? 'card' : 'cards'}`}
              </span>
              {photo.cards === 0 && (
                <DeleteButton
                  onDeleted={() =>
                    setPhotos((current) =>
                      current.filter((other) => other.id !== photo.id)
                    )
                  }
                  id={photo.id}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeleteButton({
  id,
  onDeleted,
}: {
  id: string;
  onDeleted: () => void;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant='ghost'
            size='icon-sm'
            className='text-muted-foreground hover:text-destructive'
            aria-label='Delete photo'
          />
        }
      >
        <Trash2Icon />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
          <AlertDialogDescription>
            It&apos;s deleted from the storage too, for good.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep it</AlertDialogCancel>
          <AlertDialogAction
            variant='destructive'
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                const result = await deletePhoto(id);
                if (result.ok) {
                  onDeleted();
                  toast.success('Photo deleted');
                } else {
                  toast.error(result.error);
                }
              })
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
