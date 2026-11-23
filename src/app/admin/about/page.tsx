import type { Metadata } from 'next';

import { saveSection } from '@/actions/content';
import { getContent } from '@/data/content';

import { PageHeader } from '@/components/admin/page-header';
import { AboutForm } from '@/components/admin/sections/about-form';

export const metadata: Metadata = { title: 'About' };

// Behind the session check, like the layout
export const instant = false;

export default async function AboutPage() {
  const content = await getContent();
  return (
    <>
      <PageHeader
        title='About'
        description='The about card, favourite shows and things you love.'
      />
      <AboutForm
        initial={content.about}
        save={saveSection.bind(null, 'about')}
      />
    </>
  );
}
