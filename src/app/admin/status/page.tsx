import type { Metadata } from 'next';

import { saveSection } from '@/actions/content';
import { getContent } from '@/data/content';

import { PageHeader } from '@/components/admin/page-header';
import { StatusForm } from '@/components/admin/sections/status-form';

export const metadata: Metadata = { title: 'Status' };

// Behind the session check, like the layout
export const instant = false;

export default async function StatusPage() {
  const content = await getContent();
  return (
    <>
      <PageHeader
        title='Status'
        description='The words around your live Discord status.'
      />
      <StatusForm
        initial={content.status}
        save={saveSection.bind(null, 'status')}
      />
    </>
  );
}
