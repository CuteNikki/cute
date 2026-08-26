import { LanyardProvider } from '@/context/lanyard';

import { AboutSection } from '@/components/about';
import { Footer } from '@/components/footer';
import { Gallery } from '@/components/gallery';
import { Hero } from '@/components/hero';
import { Socials } from '@/components/socials';
import { StatusSection } from '@/components/status';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className='relative flex min-h-screen justify-center bg-background px-4 py-10 sm:px-6 sm:py-10'>
      {/* soft radial glow backdrop */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,oklch(0.9_0.06_330)_0%,transparent_55%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.35_0.09_320)_0%,transparent_55%)]'
      />

      <ThemeToggle />

      <div className='relative w-full max-w-xl lg:max-w-6xl'>
        <LanyardProvider>
          <div className='grid gap-10 sm:gap-12 lg:items-start lg:gap-10 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]'>
            {/* Profile sidebar */}
            <div className='space-y-8 lg:sticky'>
              <Hero />
              <Socials />
            </div>

            {/* Content */}
            <div className='space-y-8'>
              <AboutSection />
              <StatusSection />
              <Gallery />
              <Footer />
            </div>
          </div>
        </LanyardProvider>
      </div>
    </main>
  );
}
