import type { Metadata } from 'next';

import { saveSection } from '@/actions/content';
import { getContent } from '@/data/content';

import { PageHeader } from '@/components/admin/page-header';
import { SiteForm } from '@/components/admin/sections/site-form';

export const metadata: Metadata = { title: 'Site' };

// Behind the session check, like the layout
export const instant = false;

export default async function SitePage() {
  const content = await getContent();
  return (
    <>
      <PageHeader
        title='Site'
        description='The browser tab, link previews and your Discord account.'
      />
      <SiteForm initial={content.site} save={saveSection.bind(null, 'site')} />
    </>
  );
}
