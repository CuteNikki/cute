'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import { AdminForm, FormSection, TextField } from '@/components/admin/form';

type Site = SectionContent<'site'>;

export function SiteForm({
  initial,
  save,
}: {
  initial: Site;
  save: (value: Site) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection
        title='Tab & link previews'
        description='What the browser tab and shared links (Discord, Twitter...) show.'
      >
        <TextField path={['title']} label='Title' />
        <TextField path={['description']} label='Description' multiline />
        <TextField
          path={['url']}
          label='Address'
          description='Where the site is, for link previews.'
        />
        <TextField
          path={['previewAlt']}
          label='Preview image description'
          description='The preview card is drawn from your profile; this describes it for screen readers.'
        />
      </FormSection>
      <FormSection
        title='Discord'
        description='Whose avatar, banner and live status the page shows.'
      >
        <TextField
          path={['discordUserId']}
          label='Discord user id'
          description='In Discord: Settings > Advanced > Developer Mode, then right-click your name > Copy User ID.'
        />
      </FormSection>
    </AdminForm>
  );
}
