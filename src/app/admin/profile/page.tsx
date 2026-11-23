import type { Metadata } from 'next';

import { saveSection } from '@/actions/content';
import { getContent } from '@/data/content';

import { PageHeader } from '@/components/admin/page-header';
import { ProfileForm } from '@/components/admin/sections/profile-form';

export const metadata: Metadata = { title: 'Profile' };

// Behind the session check, like the layout
export const instant = false;

export default async function ProfilePage() {
  const content = await getContent();
  return (
    <>
      <PageHeader
        title='Profile'
        description='Your name, bio and badges, at the top of the page.'
      />
      <ProfileForm
        initial={content.profile}
        save={saveSection.bind(null, 'profile')}
      />
    </>
  );
}
