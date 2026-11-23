import type { Metadata } from 'next';
import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { requireOwner } from '@/lib/session';

import { AdminNav } from '@/components/admin/admin-nav';
import { SignOutButton } from '@/components/admin/sign-out-button';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: { template: '%s · admin', default: 'admin' },
  robots: { index: false },
};

// Checks the session before anything shows, and may redirect
export const instant = false;

export default async function AdminLayout({ children }: LayoutProps<'/admin'>) {
  await requireOwner();
  return (
    <div className='min-h-screen bg-background'>
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-6 sm:px-6'>
        <header className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-2'>
            <Link
              href='/admin'
              className='font-display text-2xl font-bold text-primary'
            >
              admin
            </Link>
            <div className='flex items-center gap-1'>
              <Button
                variant='ghost'
                size='sm'
                render={<Link href='/' target='_blank' />}
                nativeButton={false}
              >
                <ExternalLinkIcon />
                View site
              </Button>
              <SignOutButton />
            </div>
          </div>
          <AdminNav />
        </header>
        <main className='flex flex-col gap-6'>{children}</main>
      </div>
      <Toaster position='top-center' />
    </div>
  );
}
