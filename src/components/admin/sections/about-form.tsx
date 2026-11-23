'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import {
  AdminForm,
  FormSection,
  TextField,
  type Path,
} from '@/components/admin/form';
import { IconField } from '@/components/admin/icon-field';
import { ListField } from '@/components/admin/list-field';

type About = SectionContent<'about'>;

/** Icons with a label, like the favourite shows or things you love. */
function IconLabelList({ path, label }: { path: Path; label: string }) {
  return (
    <ListField
      path={path}
      label={label}
      addLabel='Add one'
      newItem={() => ({ icon: 'heart', label: '' })}
      inline
    >
      {(item) => (
        <>
          <IconField path={[...item, 'icon']} label='Icon' />
          <TextField path={[...item, 'label']} label='Label' />
        </>
      )}
    </ListField>
  );
}

export function AboutForm({
  initial,
  save,
}: {
  initial: About;
  save: (value: About) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection title='A little about me'>
        <TextField path={['title']} label='Heading' />
        <TextField path={['intro']} label='Intro' multiline />
        <TextField
          path={['more']}
          label='More'
          description='Optional. A softer second paragraph.'
          multiline
        />
        <TextField
          path={['closing']}
          label='Closing line'
          description='Optional.'
        />
      </FormSection>
      <FormSection title='Favourite movies & shows'>
        <TextField path={['mediaTitle']} label='Heading' />
        <IconLabelList path={['media']} label='Movies & shows' />
      </FormSection>
      <FormSection title='Things I love'>
        <TextField path={['interestsTitle']} label='Heading' />
        <IconLabelList path={['interests']} label='Things' />
      </FormSection>
    </AdminForm>
  );
}
