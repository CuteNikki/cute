import { LanyardProvider } from '@/context/lanyard';

import { AboutSection } from '@/components/about';
import { AnimateIn } from '@/components/animate-in';
import { AnimationRoot } from '@/components/animation-root';
import { Footer } from '@/components/footer';
import { Gallery } from '@/components/gallery';
import { Hero } from '@/components/hero';
import { ScrollHint } from '@/components/scroll-hint';
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

      <AnimationRoot>
        <div className='relative w-full max-w-xl lg:max-w-7xl'>
          <LanyardProvider>
            <div className='grid gap-10 sm:gap-12 lg:items-start lg:gap-10 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)]'>
              {/* Profile sidebar */}
              <div className='space-y-8 lg:sticky'>
                <AnimateIn delay={0}>
                  <Hero />
                </AnimateIn>
                <AnimateIn delay={0.1}>
                  <Socials />
                </AnimateIn>
              </div>

              {/* Content */}
              <div className='space-y-8'>
                <AnimateIn delay={0.15}>
                  <AboutSection />
                </AnimateIn>
                <AnimateIn delay={0.2}>
                  <StatusSection />
                </AnimateIn>
                <AnimateIn delay={0.25}>
                  <Gallery />
                </AnimateIn>
                <AnimateIn delay={0.3}>
                  <Footer />
                </AnimateIn>
              </div>
            </div>
          </LanyardProvider>
        </div>

        <ScrollHint />
      </AnimationRoot>
    </main>
  );
}
