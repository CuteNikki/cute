import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { saveGalleryItem } from '@/actions/gallery';
import { getLibrary } from '@/data/photos';

import type { DetailGroup } from '@/lib/content';
import { db } from '@/lib/db';

import { PageHeader } from '@/components/admin/page-header';
import { GalleryItemForm } from '@/components/admin/sections/gallery-item-form';

export const metadata: Metadata = { title: 'Gallery card' };

// Reads the card on each visit
export const instant = false;

export default async function GalleryItemPage({
  params,
}: PageProps<'/admin/gallery/[id]'>) {
  const { id } = await params;
  const [item, library] = await Promise.all([
    db.galleryItem.findUnique({
      where: { id },
      include: { photos: { orderBy: { position: 'asc' } } },
    }),
    getLibrary(),
  ]);
  if (!item) notFound();

  return (
    <>
      <PageHeader title={item.name} description='A card in the gallery.' />
      <GalleryItemForm
        id={item.id}
        initial={{
          name: item.name,
          short: item.short,
          description: item.description,
          details: item.details as DetailGroup[],
          link: item.link as { label: string; href: string } | null,
          photoIds: item.photos.map((photo) => photo.photoId),
        }}
        library={library}
        save={saveGalleryItem.bind(null, item.id)}
      />
    </>
  );
}
