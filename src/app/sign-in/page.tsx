import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { NOT_THE_OWNER } from '@/lib/auth';
import { getSession } from '@/lib/session';

import { SignInForm } from '@/components/sign-in-form';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false },
};

// Checks for a session first, and may redirect
export const instant = false;

/** What Better Auth's ?error= codes mean, for the ones that can happen here. */
const errors: Record<string, string> = {
  [NOT_THE_OWNER]: "Only the site's owner can sign in.",
  access_denied: 'Discord sign-in was cancelled.',
};

export default async function SignInPage({
  searchParams,
}: PageProps<'/sign-in'>) {
  if (await getSession()) redirect('/admin');
  const { error } = await searchParams;
  const code = typeof error === 'string' ? error : undefined;

  return (
    <main className='flex min-h-screen items-center justify-center bg-background px-4 py-10'>
      <Card className='w-full max-w-sm gap-6'>
        <div className='space-y-1 text-center'>
          <h1 className='font-display text-2xl font-bold text-primary'>
            admin
          </h1>
          <p className='text-sm text-muted-foreground'>
            sign in to edit the site
          </p>
        </div>
        <SignInForm
          error={code && (errors[code] ?? 'Signing in failed. Try again.')}
        />
      </Card>
    </main>
  );
}
