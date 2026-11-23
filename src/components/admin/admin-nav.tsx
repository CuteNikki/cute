'use client';

import { cn } from 'cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The admin area's pages, in the order the site shows their parts. */
const pages = [
  { href: '/admin/profile', label: 'Profile' },
  { href: '/admin/socials', label: 'Socials' },
  { href: '/admin/about', label: 'About' },
  { href: '/admin/status', label: 'Status' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/photos', label: 'Photos' },
  { href: '/admin/footer', label: 'Footer' },
  { href: '/admin/site', label: 'Site' },
  { href: '/admin/account', label: 'Account' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label='Admin'
      className='-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6'
    >
      <ul className='flex w-max gap-1'>
        {pages.map(({ href, label }) => {
          const current = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'block rounded-lg px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                  current &&
                    'bg-primary/15 text-primary hover:bg-primary/15 hover:text-primary'
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
