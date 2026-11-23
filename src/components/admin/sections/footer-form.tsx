'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import { AdminForm, FormSection, TextField } from '@/components/admin/form';

type Footer = SectionContent<'footer'>;

export function FooterForm({
  initial,
  save,
}: {
  initial: Footer;
  save: (value: Footer) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection
        title='Footer'
        description='"made with love ♥ and lots of pastel dreams", the copyright line and a sign-off.'
      >
        <div className='grid gap-5 sm:grid-cols-2'>
          <TextField path={['taglineBefore']} label='Before the heart' />
          <TextField path={['taglineAfter']} label='After the heart' />
        </div>
        <TextField path={['copyrightName']} label='Copyright name' />
        <TextField
          path={['sourceUrl']}
          label='Copyright link'
          description='Where the name links to, e.g. the source code.'
        />
        <TextField path={['signoff']} label='Sign-off' />
      </FormSection>
    </AdminForm>
  );
}
