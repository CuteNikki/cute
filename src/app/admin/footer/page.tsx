import type { Metadata } from 'next';

import { saveSection } from '@/actions/content';
import { getContent } from '@/data/content';

import { PageHeader } from '@/components/admin/page-header';
import { FooterForm } from '@/components/admin/sections/footer-form';

export const metadata: Metadata = { title: 'Footer' };

// Behind the session check, like the layout
export const instant = false;

export default async function FooterPage() {
  const content = await getContent();
  return (
    <>
      <PageHeader title='Footer' description='The bottom of the page.' />
      <FooterForm
        initial={content.footer}
        save={saveSection.bind(null, 'footer')}
      />
    </>
  );
}
