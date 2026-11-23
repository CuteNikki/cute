import 'server-only';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { cache } from 'react';

import { auth } from '@/lib/auth';

/** The signed-in session, looked up once per request however often asked. */
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);

/**
 * The owner's session, or a redirect to sign in. Only the owner can have an
 * account (see auth.ts), so any session is theirs.
 */
export async function requireOwner() {
  // A session is a request's own, never part of a prerender.
  await connection();
  const session = await getSession();
  if (!session) redirect('/sign-in');
  return session;
}
