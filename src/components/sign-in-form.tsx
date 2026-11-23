'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FingerprintIcon } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

import { DiscordIcon } from '@/components/discord-icon';
import { Button } from '@/components/ui/button';

/** Discord, or a passkey added in /admin/account. */
export function SignInForm({ error: initialError }: { error?: string }) {
  const router = useRouter();
  const [error, setError] = useState(initialError);

  /**
   * Signs in with a passkey. With `autoFill`, the browser offers saved
   * passkeys among its suggestions instead of opening a prompt.
   */
  async function signInWithPasskey(autoFill = false) {
    const result = await authClient.signIn.passkey({ autoFill });
    const failure = result?.error;
    if (!failure) {
      router.push('/admin');
      return router.refresh();
    }
    const code = 'code' in failure ? failure.code : undefined;
    // Closing the browser's prompt is fine.
    if (autoFill || code === 'AUTH_CANCELLED' || code?.startsWith('ERROR_')) {
      return;
    }
    setError(failure.message ?? "That passkey didn't work.");
  }

  useEffect(() => {
    void window.PublicKeyCredential?.isConditionalMediationAvailable?.().then(
      (available) => {
        if (available) void signInWithPasskey(true);
      }
    );
    // Once, when the form shows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <Button
        size='lg'
        onClick={() =>
          authClient.signIn.social({
            provider: 'discord',
            callbackURL: '/admin',
            // Better Auth adds ?error=... to it.
            errorCallbackURL: '/sign-in',
          })
        }
      >
        <DiscordIcon />
        Sign in with Discord
      </Button>
      <Button variant='outline' size='lg' onClick={() => signInWithPasskey()}>
        <FingerprintIcon />
        Use a passkey
      </Button>
      {error && (
        <p role='alert' className='mt-2 text-center text-sm text-destructive'>
          {error}
        </p>
      )}
    </div>
  );
}
