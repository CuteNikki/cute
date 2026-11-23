import type { Metadata } from 'next';

import { saveSection } from '@/actions/content';
import { getContent } from '@/data/content';

import { PageHeader } from '@/components/admin/page-header';
import { SocialsForm } from '@/components/admin/sections/socials-form';

export const metadata: Metadata = { title: 'Socials' };

// Behind the session check, like the layout
export const instant = false;

export default async function SocialsPage() {
  const content = await getContent();
  return (
    <>
      <PageHeader title='Socials' description='Where people can find you.' />
      <SocialsForm
        initial={content.socials}
        save={saveSection.bind(null, 'socials')}
      />
    </>
  );
}
