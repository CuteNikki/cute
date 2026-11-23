'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import { AdminForm, FormSection, TextField } from '@/components/admin/form';

type Gallery = SectionContent<'gallery'>;

export function GallerySectionForm({
  initial,
  save,
}: {
  initial: Gallery;
  save: (value: Gallery) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection title='Around the cards'>
        <TextField path={['title']} label='Heading' />
        <TextField
          path={['scrollHint']}
          label='Scroll hint'
          description='The "keep scrolling" button that shows on phones.'
        />
      </FormSection>
    </AdminForm>
  );
}
