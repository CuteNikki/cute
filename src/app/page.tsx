import { cacheLife, cacheTag } from 'next/cache';

import { CONTENT_TAG, getContent, getGalleryItems } from '@/data/content';

import { LanyardProvider } from '@/context/lanyard';

import { formatMilestoneDate, parseDate, yearsSince } from '@/lib/dates';
import { Icon } from '@/lib/icons';

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

// The page is prerendered from the content in the database (see getContent), and made again when
// something is saved in /admin, or hourly, so the age and "Xy ago" dates don't go stale.
export default async function Home() {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('hours');

  const [content, items] = await Promise.all([getContent(), getGalleryItems()]);
  const { badges, ...profile } = content.profile;

  return (
    <main className='relative flex min-h-screen justify-center bg-background px-4 py-10 sm:px-6 sm:py-10'>
      {/* soft radial glow backdrop */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,oklch(0.9_0.06_330)_0%,transparent_55%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.35_0.09_320)_0%,transparent_55%)]'
      />

      <ThemeToggle />

      <AnimationRoot>
        <div className='relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-7xl'>
          <LanyardProvider discordUserId={content.site.discordUserId}>
            <div className='grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:items-start lg:gap-10'>
              {/* Profile sidebar */}
              <div className='space-y-8 lg:sticky'>
                <AnimateIn delay={0}>
                  <Hero
                    profile={profile}
                    age={yearsSince(parseDate(profile.dateOfBirth))}
                    bannerVersion={new Date().toISOString().slice(0, 10)}
                    badges={badges.map((badge) => ({
                      ...badge,
                      milestones: badge.milestones.map((milestone) => ({
                        label: milestone.label,
                        date: formatMilestoneDate(milestone.date),
                      })),
                      icon: (
                        <Icon
                          name={badge.icon}
                          className='size-4 shrink-0 text-primary'
                        />
                      ),
                    }))}
                  />
                </AnimateIn>
                <AnimateIn delay={0.1}>
                  <Socials socials={content.socials} />
                </AnimateIn>
              </div>

              {/* Content */}
              <div className='space-y-8'>
                <AnimateIn delay={0.15}>
                  <AboutSection about={content.about} />
                </AnimateIn>
                <AnimateIn delay={0.2}>
                  <StatusSection status={content.status} />
                </AnimateIn>
              </div>

              {/* Full-width */}
              <div className='space-y-8 lg:col-span-2'>
                <AnimateIn delay={0.25}>
                  <Gallery title={content.gallery.title} items={items} />
                </AnimateIn>
                <AnimateIn delay={0.3}>
                  <Footer footer={content.footer} />
                </AnimateIn>
              </div>
            </div>
          </LanyardProvider>
        </div>

        <ScrollHint hint={content.gallery.scrollHint} />
      </AnimationRoot>
    </main>
  );
}
