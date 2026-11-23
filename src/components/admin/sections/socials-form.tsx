'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import { AdminForm, FormSection, TextField } from '@/components/admin/form';
import { IconField } from '@/components/admin/icon-field';
import { ListField } from '@/components/admin/list-field';

type Socials = SectionContent<'socials'>;

export function SocialsForm({
  initial,
  save,
}: {
  initial: Socials;
  save: (value: Socials) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection title='Socials' description='Under the profile.'>
        <TextField path={['title']} label='Heading' />
        <ListField
          path={['links']}
          label='Links'
          addLabel='Add a link'
          newItem={() => ({ icon: 'link', label: '', handle: '', href: '' })}
        >
          {(path) => (
            <div className='grid gap-5 sm:grid-cols-2'>
              <IconField path={[...path, 'icon']} label='Icon' />
              <TextField path={[...path, 'label']} label='Name' />
              <TextField path={[...path, 'handle']} label='Handle' />
              <TextField
                path={[...path, 'href']}
                label='Link'
                placeholder='https://'
              />
            </div>
          )}
        </ListField>
      </FormSection>
    </AdminForm>
  );
}
