import type { Metadata } from 'next';

import { saveGalleryItem } from '@/actions/gallery';
import { getLibrary } from '@/data/photos';

import { PageHeader } from '@/components/admin/page-header';
import { GalleryItemForm } from '@/components/admin/sections/gallery-item-form';

export const metadata: Metadata = { title: 'New card' };

// Behind the session check, like the layout
export const instant = false;

export default async function NewGalleryItemPage() {
  const library = await getLibrary();
  return (
    <>
      <PageHeader
        title='New card'
        description='Added at the end of the gallery.'
      />
      <GalleryItemForm
        id={null}
        initial={{
          name: '',
          short: '',
          description: '',
          details: [],
          specs: [],
          link: null,
          photoIds: [],
        }}
        library={library}
        save={saveGalleryItem.bind(null, null)}
      />
    </>
  );
}
