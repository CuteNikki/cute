import type { Metadata } from 'next';

import { db } from '@/lib/db';
import { requireOwner } from '@/lib/session';

import { FormSection } from '@/components/admin/form';
import { PageHeader } from '@/components/admin/page-header';
import { Passkeys } from '@/components/admin/passkeys';

export const metadata: Metadata = { title: 'Account' };

// Reads the passkeys on each visit
export const instant = false;

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' });

export default async function AccountPage() {
  const session = await requireOwner();
  const passkeys = await db.passkey.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'asc' },
  });
  return (
    <>
      <PageHeader
        title='Account'
        description={`Signed in as ${session.user.name}. Only your Discord account can sign in here.`}
      />
      <FormSection
        title='Passkeys'
        description='Sign in with a fingerprint, face or your device PIN instead of Discord.'
      >
        <Passkeys
          passkeys={passkeys.map((passkey) => ({
            id: passkey.id,
            name: passkey.name,
            added: passkey.createdAt
              ? dateFormat.format(passkey.createdAt)
              : 'a while ago',
          }))}
        />
      </FormSection>
    </>
  );
}
