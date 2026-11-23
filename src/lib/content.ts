import { z } from 'zod';

/**
 * What every part of the page shows, as kept in the database (see Settings in
 * prisma/schema.prisma) and edited in /admin. Optional texts are empty strings
 * rather than missing, so each form field always has a value.
 */

const text = z.string().trim().min(1, 'Required');
const optionalText = z.string().trim();
const url = z.url({ protocol: /^https?$/, error: 'A full https:// link' });

/** YYYY-MM-DD, or YYYY-MM where the exact day doesn't matter. */
const calendarDate = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/, 'YYYY-MM-DD');

/** A lucide icon's name (https://lucide.dev/icons), e.g. "heart" or "gamepad-2". */
export const iconName = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'An icon from the list');

const iconLabel = z.object({ icon: iconName, label: text });
const labelValue = z.object({ label: text, value: text });

export const siteSchema = z.object({
  /** The browser tab and link previews. */
  title: text,
  description: text,
  url,
  /** The link preview image's description, for screen readers. */
  previewAlt: text,
  /** Powers the live avatar, banner and status (via Lanyard). */
  discordUserId: z.string().regex(/^\d{17,20}$/, 'A Discord user id'),
});

export const badgeSchema = z.object({
  icon: iconName,
  label: text,
  /** When set, the badge gets an info popover with this text. */
  explanation: optionalText,
  milestones: z.array(z.object({ label: text, date: calendarDate })),
  /** Also shown on the link preview card. */
  showOnPreview: z.boolean(),
});

export const profileSchema = z.object({
  name: text,
  nameEmoji: optionalText,
  /** The age shown is worked out from this. */
  dateOfBirth: calendarDate,
  /** Shown after the age, separated by dots. */
  facts: z.array(text),
  bio: text,
  bannerAlt: text,
  avatarAlt: text,
  badges: z.array(badgeSchema),
});

export const socialsSchema = z.object({
  title: text,
  links: z.array(
    z.object({ icon: iconName, label: text, handle: text, href: url })
  ),
});

export const aboutSchema = z.object({
  title: text,
  intro: text,
  more: optionalText,
  closing: optionalText,
  mediaTitle: text,
  media: z.array(iconLabel),
  interestsTitle: text,
  interests: z.array(iconLabel),
});

/** Discord's activity types, as the status card introduces them. */
export const ACTIVITY_TYPES = {
  playing: 0,
  streaming: 1,
  listening: 2,
  watching: 3,
  competing: 5,
} as const;

export const statusSchema = z.object({
  title: text,
  statusLabel: text,
  /** Always shown under the Discord custom status. */
  extraStatus: optionalText,
  /** Shown while not playing or listening to anything. */
  idle: z.object({ label: text, title: text, subtitle: text }),
  activityLabels: z.object({
    playing: text,
    streaming: text,
    listening: text,
    watching: text,
    competing: text,
  }),
  fallbackActivityLabel: text,
  fallbackActivityDetails: text,
});

export const gallerySchema = z.object({
  title: text,
  /** The "keep scrolling" button on phones. */
  scrollHint: text,
});

export const footerSchema = z.object({
  /** Either side of the little heart. */
  taglineBefore: text,
  taglineAfter: text,
  copyrightName: text,
  sourceUrl: url,
  signoff: text,
});

export const sectionSchemas = {
  site: siteSchema,
  profile: profileSchema,
  socials: socialsSchema,
  about: aboutSchema,
  status: statusSchema,
  gallery: gallerySchema,
  footer: footerSchema,
};

export type Section = keyof typeof sectionSchemas;
export type SectionContent<S extends Section> = z.infer<
  (typeof sectionSchemas)[S]
>;
export type Content = { [S in Section]: SectionContent<S> };

export type Badge = z.infer<typeof badgeSchema>;
export type LabelValue = z.infer<typeof labelValue>;

/** A gallery card, as edited in /admin. Photos are the library's ids, in order. */
export const galleryItemSchema = z.object({
  name: text,
  short: text,
  /** Paragraphs are separated by a line break. */
  description: text,
  details: z.array(labelValue),
  specs: z.array(labelValue),
  link: z.object({ label: text, href: url }).nullable(),
  photoIds: z.array(z.string()).min(1, 'At least one photo'),
});

export type GalleryItemInput = z.infer<typeof galleryItemSchema>;

/** A gallery card as the page shows it. */
export type GalleryItem = Omit<GalleryItemInput, 'photoIds'> & {
  id: string;
  images: string[];
};
