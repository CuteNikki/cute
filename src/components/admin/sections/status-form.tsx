'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import { AdminForm, FormSection, TextField } from '@/components/admin/form';

type Status = SectionContent<'status'>;

export function StatusForm({
  initial,
  save,
}: {
  initial: Status;
  save: (value: Status) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection
        title="What I'm up to"
        description='The live Discord status. What you are doing comes from Discord; these are the words around it.'
      >
        <TextField path={['title']} label='Heading' />
        <TextField path={['statusLabel']} label='Status label' />
        <TextField
          path={['extraStatus']}
          label='Extra status'
          description='Optional. Always shown under your Discord custom status.'
        />
      </FormSection>
      <FormSection
        title='When idle'
        description="Shown while you're not playing or listening to anything."
      >
        <TextField path={['idle', 'label']} label='Label' />
        <TextField path={['idle', 'title']} label='Title' />
        <TextField path={['idle', 'subtitle']} label='Subtitle' />
      </FormSection>
      <FormSection
        title='Activity labels'
        description='How each kind of Discord activity is introduced.'
      >
        <div className='grid gap-5 sm:grid-cols-2'>
          <TextField path={['activityLabels', 'playing']} label='Playing' />
          <TextField path={['activityLabels', 'streaming']} label='Streaming' />
          <TextField path={['activityLabels', 'listening']} label='Listening' />
          <TextField path={['activityLabels', 'watching']} label='Watching' />
          <TextField path={['activityLabels', 'competing']} label='Competing' />
          <TextField path={['fallbackActivityLabel']} label='Anything else' />
        </div>
        <TextField
          path={['fallbackActivityDetails']}
          label='Details when an app gives none'
        />
      </FormSection>
    </AdminForm>
  );
}
