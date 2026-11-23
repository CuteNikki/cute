import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import {
  sectionSchemas,
  type Content,
  type GalleryItem,
  type LabelValue,
  type Section,
} from '@/lib/content';
import { db } from '@/lib/db';
import { photoUrl } from '@/lib/photos';

/** The tag on everything the page shows: saving in /admin updates it. */
export const CONTENT_TAG = 'content';

/**
 * Every text on the page. Cached until something is saved in /admin, and
 * refreshed hourly as well, so the age and "Xy ago" dates don't go stale.
 */
export async function getContent(): Promise<Content> {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('hours');

  const settings = await db.settings.findUnique({ where: { id: 1 } });
  if (!settings) {
    throw new Error('The database has no content yet: run `bun db:seed`.');
  }
  const parse = <S extends Section>(section: S) =>
    sectionSchemas[section].parse(settings[section]) as Content[S];
  return {
    site: parse('site'),
    profile: parse('profile'),
    socials: parse('socials'),
    about: parse('about'),
    status: parse('status'),
    gallery: parse('gallery'),
    footer: parse('footer'),
  };
}

/** The gallery's cards in order, each with its photos' addresses. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  'use cache';
  cacheTag(CONTENT_TAG);
  cacheLife('hours');

  const items = await db.galleryItem.findMany({
    orderBy: { position: 'asc' },
    include: {
      photos: { orderBy: { position: 'asc' }, include: { photo: true } },
    },
  });
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    short: item.short,
    description: item.description,
    details: item.details as LabelValue[],
    specs: item.specs as LabelValue[],
    link: item.link as GalleryItem['link'],
    images: item.photos.map(({ photo }) => photoUrl(photo.key)),
  }));
}
