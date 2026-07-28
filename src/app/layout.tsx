import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Fredoka, Nunito } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'niso ⋅ pastel corner ♡',
  description: 'A soft, pastel-pink corner of the internet — plushies, cats & kindness.',
  openGraph: {
    title: 'niso ⋅ pastel corner ♡',
    description: 'A soft, pastel-pink corner of the internet — plushies, cats & kindness.',
    url: 'https://niso.vercel.app',
    siteName: 'niso ⋅ pastel corner ♡',
    images: [
      {
        url: 'https://cute.niso.moe/avatar.gif',
        width: 430,
        height: 430,
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9c9dd' },
    { media: '(prefers-color-scheme: dark)', color: '#2a1f2e' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${fredoka.variable} ${nunito.variable}`} suppressHydrationWarning>
      <body className='bg-background font-sans antialiased'>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
