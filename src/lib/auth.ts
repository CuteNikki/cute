import 'server-only';

import { passkey } from '@better-auth/passkey';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { APIError } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';

import { db } from '@/lib/db';

/** Where the auth endpoints run. Passkeys only work on this site. */
const authURL = new URL(process.env.BETTER_AUTH_URL ?? 'http://localhost:3000');

/** Why a Discord account other than the owner's can't sign in, for the sign-in page. */
export const NOT_THE_OWNER = 'NOT_THE_OWNER';

/**
 * Only the site's owner has an account: the one Discord account
 * ADMIN_DISCORD_ID names, and passkeys they add once signed in. There's no
 * sign-up and no password.
 */
export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  account: {
    // Discord's tokens aren't used after sign-in, but shouldn't sit in the
    // database readable either.
    encryptOAuthTokens: true,
  },
  databaseHooks: {
    account: {
      create: {
        // Every new sign-in with Discord, or linking another Discord account,
        // makes an account row first. Better Auth makes a new user and their
        // account in one transaction, so stopping it here leaves no user.
        before: async (account) => {
          if (
            account.providerId !== 'discord' ||
            !process.env.ADMIN_DISCORD_ID ||
            account.accountId !== process.env.ADMIN_DISCORD_ID
          ) {
            throw new APIError('FORBIDDEN', {
              code: NOT_THE_OWNER,
              message: "Only the site's owner can sign in.",
            });
          }
        },
      },
    },
  },
  plugins: [
    passkey({
      rpID: authURL.hostname,
      rpName: 'cute',
      origin: authURL.origin,
    }),
    // Must be last: lets server actions set auth cookies.
    nextCookies(),
  ],
});
