import type { Metadata } from 'next';

import { getLibrary } from '@/data/photos';

import { PageHeader } from '@/components/admin/page-header';
import { PhotoLibrary } from '@/components/admin/photo-library';

export const metadata: Metadata = { title: 'Photos' };

// Reads the library on each visit
export const instant = false;

export default async function PhotosPage() {
  return (
    <>
      <PageHeader
        title='Photos'
        description='Every photo the gallery cards can use. A photo can only be deleted once no card has it.'
      />
      <PhotoLibrary photos={await getLibrary()} />
    </>
  );
}
