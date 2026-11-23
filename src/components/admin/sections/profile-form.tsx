'use client';

import type { SectionContent } from '@/lib/content';
import type { SaveResult } from '@/lib/form';

import {
  AdminForm,
  FormSection,
  SwitchField,
  TextField,
} from '@/components/admin/form';
import { IconField } from '@/components/admin/icon-field';
import { ListField } from '@/components/admin/list-field';

type Profile = SectionContent<'profile'>;

export function ProfileForm({
  initial,
  save,
}: {
  initial: Profile;
  save: (value: Profile) => Promise<SaveResult>;
}) {
  return (
    <AdminForm initial={initial} save={save}>
      <FormSection
        title='You'
        description='The top of the sidebar. The avatar and banner come from Discord.'
      >
        <div className='grid gap-5 sm:grid-cols-[1fr_8rem]'>
          <TextField path={['name']} label='Name' />
          <TextField path={['nameEmoji']} label='Emoji' />
        </div>
        <TextField
          path={['dateOfBirth']}
          label='Date of birth'
          description='YYYY-MM-DD. The age shown is worked out from it.'
        />
        <ListField
          path={['facts']}
          label='Facts'
          description='Shown after the age, separated by dots.'
          addLabel='Add a fact'
          newItem={() => ''}
          inline
        >
          {(path) => <TextField path={path} label='Fact' />}
        </ListField>
        <TextField
          path={['bio']}
          label='Bio'
          description='A line break starts a new line.'
          multiline
        />
      </FormSection>

      <FormSection
        title='Badges'
        description='The little pills under the bio. One with an explanation gets an info popover.'
      >
        <ListField
          path={['badges']}
          label='Badges'
          addLabel='Add a badge'
          newItem={() => ({
            icon: 'heart',
            label: '',
            explanation: '',
            milestones: [],
            showOnPreview: false,
          })}
        >
          {(path) => (
            <>
              <div className='grid gap-5 sm:grid-cols-2'>
                <IconField path={[...path, 'icon']} label='Icon' />
                <TextField path={[...path, 'label']} label='Label' />
              </div>
              <TextField
                path={[...path, 'explanation']}
                label='Explanation'
                description='Optional. Shown in a popover when the badge is tapped or hovered.'
                multiline
              />
              <ListField
                path={[...path, 'milestones']}
                label='Milestones'
                description='Optional timeline in the popover. YYYY-MM-DD, or YYYY-MM when the day does not matter.'
                addLabel='Add a milestone'
                newItem={() => ({ label: '', date: '' })}
                inline
              >
                {(milestone) => (
                  <>
                    <TextField path={[...milestone, 'label']} label='What' />
                    <TextField path={[...milestone, 'date']} label='When' />
                  </>
                )}
              </ListField>
              <SwitchField
                path={[...path, 'showOnPreview']}
                label='Show on the link preview'
                description='The card people see when the site is shared.'
              />
            </>
          )}
        </ListField>
      </FormSection>

      <FormSection title='Image descriptions' description='For screen readers.'>
        <TextField path={['avatarAlt']} label='Avatar' />
        <TextField path={['bannerAlt']} label='Banner' />
      </FormSection>
    </AdminForm>
  );
}
