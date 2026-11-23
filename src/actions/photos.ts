'use server';

import { randomUUID } from 'node:crypto';

import { db } from '@/lib/db';
import {
  MAX_PHOTO_BYTES,
  PHOTO_TYPES,
  photoUrl,
  UPLOAD_KEY,
  type LibraryPhoto,
} from '@/lib/photos';
import { requireOwner } from '@/lib/session';
import { deleteObject, objectExists, signUpload } from '@/lib/storage';

/** An action's answer: what it made, or why it couldn't (shown as is). */
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

/** Where the browser uploads a new photo to, and its key to add it by after. */
export async function requestPhotoUpload(
  type: string,
  size: number
): Promise<Result<{ key: string; url: string }>> {
  await requireOwner();
  if (!Object.hasOwn(PHOTO_TYPES, type)) {
    return { ok: false, error: 'That is not a photo.' };
  }
  if (!Number.isInteger(size) || size <= 0 || size > MAX_PHOTO_BYTES) {
    return { ok: false, error: 'That photo is too big.' };
  }
  const extension = PHOTO_TYPES[type as keyof typeof PHOTO_TYPES];
  const key = `photos/${randomUUID()}.${extension}`;
  return { ok: true, value: { key, url: await signUpload(key, type, size) } };
}

/** Adds an uploaded photo to the library, once it's in storage. */
export async function addPhoto(key: string): Promise<Result<LibraryPhoto>> {
  await requireOwner();
  if (!UPLOAD_KEY.test(key) || !(await objectExists(key))) {
    return { ok: false, error: "The upload didn't arrive. Try again." };
  }
  const photo = await db.photo.create({ data: { key } });
  return { ok: true, value: { id: photo.id, url: photoUrl(key) } };
}

/** Deletes a photo from the library and storage, if no gallery card has it. */
export async function deletePhoto(id: string): Promise<Result<null>> {
  await requireOwner();
  const photo = await db.photo.findUnique({
    where: { id },
    include: { _count: { select: { items: true } } },
  });
  if (!photo) return { ok: true, value: null };
  if (photo._count.items > 0) {
    return { ok: false, error: 'Take it off its gallery cards first.' };
  }
  await db.photo.delete({ where: { id } });
  try {
    await deleteObject(photo.key);
  } catch (error) {
    // It's gone from the site either way; the file just stays in the bucket.
    console.error(`Failed to delete ${photo.key} from storage`, error);
  }
  return { ok: true, value: null };
}
