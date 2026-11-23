'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { LoaderCircleIcon, UploadIcon } from 'lucide-react';

import { addPhoto, requestPhotoUpload } from '@/actions/photos';

import type { LibraryPhoto } from '@/lib/photos';
import { shrinkPhoto } from '@/lib/shrink-photo';

import { Button } from '@/components/ui/button';

/** Uploads one photo: smaller first, then straight to storage, then into the library. */
async function uploadPhoto(file: File) {
  const { type, blob } = await shrinkPhoto(file);
  const link = await requestPhotoUpload(type, blob.size);
  if (!link.ok) throw new Error(link.error);
  const response = await fetch(link.value.url, {
    method: 'PUT',
    headers: { 'content-type': type },
    body: blob,
  });
  if (!response.ok) throw new Error(`${file.name} couldn't be uploaded.`);
  const added = await addPhoto(link.value.key);
  if (!added.ok) throw new Error(added.error);
  return added.value;
}

/** Picks photos and uploads them one after another, handing each over as it's in. */
export function UploadButton({
  onAdded,
  variant = 'default',
}: {
  onAdded: (photo: LibraryPhoto) => void;
  variant?: 'default' | 'outline';
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function upload(files: File[]) {
    setBusy(true);
    let done = 0;
    for (const file of files) {
      try {
        onAdded(await uploadPhoto(file));
        done++;
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Uploading failed.'
        );
      }
    }
    setBusy(false);
    if (done > 0) {
      toast.success(done === 1 ? 'Photo uploaded' : `${done} photos uploaded`);
    }
  }

  return (
    <>
      <input
        ref={input}
        type='file'
        accept='image/*'
        multiple
        hidden
        onChange={(event) => {
          const files = [...(event.target.files ?? [])];
          event.target.value = '';
          if (files.length > 0) void upload(files);
        }}
      />
      <Button
        type='button'
        variant={variant}
        disabled={busy}
        aria-busy={busy}
        onClick={() => input.current?.click()}
      >
        {busy ? <LoaderCircleIcon className='animate-spin' /> : <UploadIcon />}
        Upload photos
      </Button>
    </>
  );
}
