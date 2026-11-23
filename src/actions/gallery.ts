'use server';

import { updateTag } from 'next/cache';

import { CONTENT_TAG } from '@/data/content';

import { galleryItemSchema } from '@/lib/content';
import { db } from '@/lib/db';
import { fieldErrors, type SaveResult } from '@/lib/form';
import { Prisma } from '@/lib/generated/prisma/client';
import { requireOwner } from '@/lib/session';

/**
 * Saves a gallery card, a new one when `id` is null (added at the end), with
 * its photos in the order given.
 */
export async function saveGalleryItem(
  id: string | null,
  value: unknown
): Promise<SaveResult & { id?: string }> {
  await requireOwner();
  const parsed = galleryItemSchema.safeParse(value);
  if (!parsed.success) {
    return { ok: false, errors: fieldErrors(parsed.error) };
  }
  const { photoIds, link, ...item } = parsed.data;
  const photos = await db.photo.count({ where: { id: { in: photoIds } } });
  if (photos !== new Set(photoIds).size || photos !== photoIds.length) {
    return {
      ok: false,
      errors: { photoIds: 'A photo is gone from the library. Reload.' },
    };
  }

  const data = {
    ...item,
    // Prisma's way to write SQL NULL into a JSON column
    link: link ?? Prisma.DbNull,
    photos: {
      create: photoIds.map((photoId, position) => ({ photoId, position })),
    },
  };
  const saved = await db.$transaction(async (tx) => {
    if (id) {
      await tx.galleryItemPhoto.deleteMany({ where: { itemId: id } });
      return tx.galleryItem.update({
        where: { id },
        data,
      });
    }
    const last = await tx.galleryItem.aggregate({ _max: { position: true } });
    return tx.galleryItem.create({
      data: { ...data, position: (last._max.position ?? -1) + 1 },
    });
  });
  updateTag(CONTENT_TAG);
  return { ok: true, id: saved.id };
}

export async function deleteGalleryItem(id: string) {
  await requireOwner();
  await db.galleryItem.deleteMany({ where: { id } });
  updateTag(CONTENT_TAG);
}

/** Puts the gallery's cards in this order. */
export async function reorderGalleryItems(ids: string[]) {
  await requireOwner();
  await db.$transaction(
    ids.map((id, position) =>
      db.galleryItem.update({ where: { id }, data: { position } })
    )
  );
  updateTag(CONTENT_TAG);
}
