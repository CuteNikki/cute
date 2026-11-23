import 'server-only';

import { db } from '@/lib/db';
import { photoUrl, type LibraryPhoto } from '@/lib/photos';

/** Every photo, newest first, with how many gallery cards each is on. */
export async function getLibrary() {
  const photos = await db.photo.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { items: true } } },
  });
  return photos.map((photo) => ({
    id: photo.id,
    url: photoUrl(photo.key),
    cards: photo._count.items,
  })) satisfies (LibraryPhoto & { cards: number })[];
}
