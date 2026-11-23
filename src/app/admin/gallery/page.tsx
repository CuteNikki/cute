import type { Metadata } from 'next';
import Link from 'next/link';

import { PlusIcon } from 'lucide-react';

import { saveSection } from '@/actions/content';
import { getContent, getGalleryItems } from '@/data/content';

import { GalleryList } from '@/components/admin/gallery-list';
import { PageHeader } from '@/components/admin/page-header';
import { GallerySectionForm } from '@/components/admin/sections/gallery-section-form';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Gallery' };

// Behind the session check, like the layout
export const instant = false;

export default async function GalleryPage() {
  const [content, items] = await Promise.all([getContent(), getGalleryItems()]);
  return (
    <>
      <PageHeader
        title='Gallery'
        description='The photo cards. Drag to reorder; the first is shown extra wide on big screens.'
      >
        <Button
          render={<Link href='/admin/gallery/new' />}
          nativeButton={false}
        >
          <PlusIcon />
          New card
        </Button>
      </PageHeader>
      <GalleryList
        items={items.map((item) => ({
          id: item.id,
          name: item.name,
          short: item.short,
          cover: item.images[0],
          photos: item.images.length,
        }))}
      />
      <GallerySectionForm
        initial={content.gallery}
        save={saveSection.bind(null, 'gallery')}
      />
    </>
  );
}
