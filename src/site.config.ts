/**
 * ✿ site config ✿
 *
 * Every text, link and detail shown on the site lives in this file, grouped by the section
 * of the page it belongs to. Edit anything here and the page picks it up - no need to touch
 * the components.
 *
 * Icons come from lucide (https://lucide.dev/icons) - import the one you want below and use it.
 */
import {
  BabyIcon,
  BirdIcon,
  CameraIcon,
  CatIcon,
  ClapperboardIcon,
  Code2Icon,
  CompassIcon,
  DogIcon,
  Gamepad2Icon,
  GhostIcon,
  HeartHandshakeIcon,
  HeartIcon,
  MedalIcon,
  MusicIcon,
  PaletteIcon,
  PlayIcon,
  PopcornIcon,
  Share2Icon,
  SparklesIcon,
  StarIcon,
  SwordsIcon,
  TransgenderIcon,
  type LucideIcon,
} from 'lucide-react';

// ─── site & sharing ──────────────────────────────────────────────────────────
// What shows up in the browser tab and in link previews (discord, twitter, etc).

export const site = {
  title: 'niso ⋅ pastel corner ♡',
  description: 'A soft, pastel-pink corner of the internet — plushies, cats & kindness.',
  url: 'https://niso.vercel.app',
  previewImage: { url: 'https://cute.niso.moe/avatar.gif', width: 430, height: 430 },
};

// ─── discord ─────────────────────────────────────────────────────────────────
// Your discord user id. Powers the live avatar, banner and "what i'm up to" status (via lanyard),
// and the discord link in socials.

export const discordUserId = '303142922780672013';

// ─── profile (top of the sidebar) ────────────────────────────────────────────

export const profile = {
  name: 'Nikki Sophie',
  nameEmoji: '🌸',
  /** YYYY-MM-DD - your age is worked out from this, so it updates on its own. */
  dateOfBirth: '2004-09-26',
  /** Shown after your age, separated by dots: "☆ 22 years old · german · she/her ♡" */
  facts: ['german', 'she/her'],
  bio: '♡ an angel who loves plushies, pastel colors & cats ★彡\nwelcome to my soft little corner of the internet where i get to be small & silly, built on respect & kindness.',
  bannerAlt: 'Cute pastel banner',
  avatarAlt: 'dynamic avatar',
};

export type ProfileBadge = {
  icon: LucideIcon;
  label: string;
  /** Optional - when set, the badge gets a little info popover with this text. */
  explanation?: string;
  /** Optional timeline shown in the popover. `date` is YYYY-MM-DD, or YYYY-MM when the exact day doesn't matter. */
  milestones?: { label: string; date: string }[];
};

export const badges: ProfileBadge[] = [
  {
    icon: TransgenderIcon,
    label: 'transgender',
    explanation:
      'transgender is a term used to describe someone whose gender identity differs from the sex they were assigned at birth. i was born male but identify as female.',
    milestones: [
      { label: 'realization', date: '2015-01' },
      { label: 'document change', date: '2025-02-02' },
      { label: 'hormone therapy', date: '2026-03-17' },
    ],
  },
  {
    icon: BabyIcon,
    label: 'age regressor',
    explanation:
      'an age regressor is someone who mentally shifts to a younger mindset; often as a coping mechanism for stress, trauma or anxiety. it provides a safe, non-sexual space to relax, process emotions or experience a sense of comfort and care that may have been missing in the past.',
  },
  { icon: HeartIcon, label: 'kindness first' },
  { icon: SparklesIcon, label: 'plushie collector' },
];

// ─── socials ─────────────────────────────────────────────────────────────────

export const socials = {
  title: "let's be friends ♡",
  links: [
    { icon: Gamepad2Icon, label: 'Discord', handle: '@cutenikki', href: `https://discord.com/users/${discordUserId}` },
    { icon: CameraIcon, label: 'Instagram', handle: '@BlushingNikki', href: 'https://instagram.com/blushingnikki' },
    { icon: GhostIcon, label: 'Snapchat', handle: '@BlushingNikki', href: 'https://www.snapchat.com/add/blushingnikki' },
    { icon: BirdIcon, label: 'Twitter', handle: '@BlushingNikki', href: 'https://twitter.com/blushingnikki' },
    { icon: PlayIcon, label: 'YouTube', handle: '@BlushingNikki', href: 'https://www.youtube.com/@BlushingNikki' },
    { icon: ClapperboardIcon, label: 'Twitch', handle: '/CuteNikki', href: 'https://www.twitch.tv/cutenikki' },
    { icon: Share2Icon, label: 'Steam', handle: '/BlushingNikki', href: 'https://steamcommunity.com/id/blushingnikki/' },
    { icon: Code2Icon, label: 'GitHub', handle: '/CuteNikki', href: 'https://github.com/CuteNikki' },
  ],
};

// ─── about ───────────────────────────────────────────────────────────────────

export const about = {
  title: 'a little about me',
  intro:
    "hewwo! am nikki sophie – a pastel loving, cat obsessed little bean who spends way too much time surrounded by plushies. i believe the internet is nicer when everyone's kind, so this is my soft space to share the things i love.",
  more: "when i'm not online you'll find me doodling, programming, listening to music, rewatching comfort movies/shows, or reorganising my plushies for the hundredth time. thank you very much for stopping by! ✿",
  closing: 'i love my partner christian more than anything 💖',

  mediaTitle: 'favourite movies & shows ♡',
  media: [
    { icon: DogIcon, label: 'bluey' },
    { icon: StarIcon, label: 'how to train your dragon' },
    { icon: SwordsIcon, label: 'star wars' },
    { icon: MedalIcon, label: 'marvel' },
    { icon: CompassIcon, label: 'gravity falls' },
    { icon: SparklesIcon, label: 'studio ghibli' },
  ],

  interestsTitle: 'things i love ♡',
  interests: [
    { icon: CatIcon, label: 'kitties' },
    { icon: HeartIcon, label: 'plushies' },
    { icon: PaletteIcon, label: 'pastels' },
    { icon: Gamepad2Icon, label: 'gaming' },
    { icon: MusicIcon, label: 'music' },
    { icon: SparklesIcon, label: 'being silly' },
    { icon: HeartHandshakeIcon, label: 'being kind' },
    { icon: PopcornIcon, label: 'snacking' },
    { icon: Code2Icon, label: 'coding' },
    { icon: CompassIcon, label: 'adventures' },
  ],
};

// ─── what i'm up to (live discord status) ────────────────────────────────────

export const status = {
  title: "what i'm up to",
  statusLabel: 'Current status',
  /** Always shown under your discord custom status (if you have one set). */
  extraStatus: 'feeling a little sleepy (yawn~)',

  /** Shown when you're not playing/listening to anything. */
  idle: {
    label: 'Current Mood',
    title: 'cozy & relaxing',
    subtitle: 'taking a small break',
  },

  /** How each kind of discord activity gets introduced. */
  activityLabels: {
    0: 'Playing',
    1: 'Streaming',
    2: 'Listening to',
    3: 'Watching',
    5: 'Competing in',
  } as Record<number, string>,
  fallbackActivityLabel: 'Active App',
  fallbackActivityDetails: 'Active Session',
};

// ─── photo gallery ───────────────────────────────────────────────────────────
// Photos live in /public/items. The first card is shown extra wide on big screens.

export type GalleryItem = {
  images: string[];
  name: string;
  /** One-liner on the card itself. */
  short: string;
  /** Longer text in the popup. Use \n for a new paragraph. */
  description: string;
  details: { label: string; value: string }[];
  /** Optional larger grid of stats, for things with more going on than `details` comfortably fits (e.g. pc specs). */
  specs?: { label: string; value: string }[];
  /** Optional external link shown at the bottom of the popup (e.g. a dedicated site for the thing). */
  link?: { label: string; href: string };
};

export const gallery: { title: string; scrollHint: string; items: GalleryItem[] } = {
  title: 'photo gallery',
  /** The "keep scrolling" button that shows on phones. */
  scrollHint: 'take a look at the gallery',
  items: [
    {
      images: [
        '/items/plushies-1.jpg',
        '/items/plushies-2.jpg',
        '/items/plushies-3.jpg',
        '/items/plushies-4.jpg',
        '/items/pusheen.jpg',
        '/items/pusheen-together-1.jpg',
        '/items/plushies-5.jpg',
        '/items/plushies-6.jpg',
        '/items/nebula-snuggles-stack.png',
        '/items/pusheen-together-2.png',
        '/items/shark-stack.png',
        '/items/mayo-tuna.png',
        '/items/plushies-7.png',
      ],
      name: 'plush family',
      short: 'my cuddle buddies',
      description: 'a super squishy plushie family that lives on my bed. they come everywhere with me on cozy nights.',
      details: [
        { label: 'favourite', value: 'goma (gray cat)' },
        { label: 'biggest crew', value: 'pusheen' },
        { label: 'also featuring', value: 'sanrio friends & sharks' },
      ],
      link: { label: 'meet the whole family', href: 'https://plushies.niso.moe' },
    },
    {
      images: [
        '/items/dress.jpg',
        '/items/selfie-1.jpg',
        '/items/selfie-2.jpg',
        '/items/selfie-3.jpg',
        '/items/onesie.jpg',
        '/items/kaomoji-tee-1.jpg',
        '/items/kaomoji-tee-2.jpg',
        '/items/california-tee.jpg',
        '/items/pink-hoodie.jpg',
        '/items/selfie-4.jpg',
        '/items/selfie-5.jpg',
      ],
      name: 'selfies & fits',
      short: 'a better look at me',
      description:
        'selfies and photos of me in my comfiest loungewear. a cozy shark onesie, my favourite kaomoji tee, a soft pink hoodie, and the pajama i live in on lazy days.',
      details: [
        { label: 'comfort fit', value: 'shark onesie' },
        { label: 'wardrobe', value: 'tees, hoodies & pjs' },
        { label: 'photo buddy', value: 'usually a plushie' },
      ],
    },
    {
      images: [
        '/items/pacifier-1.png',
        '/items/pacifier-2.png',
        '/items/bottle-1.jpg',
        '/items/bottle-2.jpg',
        '/items/bottle-3.jpg',
        '/items/bottle-4.jpg',
        '/items/blocks-1.jpg',
        '/items/blocks-2.jpg',
        '/items/blocks-3.jpg',
        '/items/blocks-4.jpg',
        '/items/plushies-8.jpg',
      ],
      name: 'agere collection',
      short: 'my little space',
      description:
        'the things that help me feel safe and small.\nmy pastel pink pacifier with stars, clouds and cuddling kittens. my baby bottle with warm milk for bedtime. and yes, i actually use them regularly.\nrecently picked up a big box of duplo building blocks with a little town play mat, where i build things on cozy evenings.',
      details: [
        { label: 'comfort', value: 'pacifier & bottle' },
        { label: 'playtime', value: 'blocks & play mat' },
        { label: 'royalty', value: 'goma' },
      ],
    },
    {
      images: ['/items/onesie-goma.jpg', '/items/onesie.jpg', '/items/selfie-1.jpg', '/items/blocks-2.jpg', '/items/pacifier-1.png', '/items/necklace-1.jpg'],
      name: 'peach & goma',
      short: 'my favourite cat duo',
      description: 'peach and goma are everywhere in my life - on my pacifier, on my necklaces, and of course as my biggest, squishiest plushie.',
      details: [
        { label: 'spotted on', value: 'pacifier, necklaces & plushies' },
        { label: 'favourite hobby', value: 'cuddling each other' },
        { label: 'always found', value: 'side by side' },
      ],
    },
    {
      images: [
        '/items/flowers-1.jpg',
        '/items/flowers-2.jpg',
        '/items/flowers-3.jpg',
        '/items/necklace-1.jpg',
        '/items/necklace-2.jpg',
        '/items/necklace-3.jpg',
        '/items/necklace-4.jpg',
        '/items/necklace-5.jpg',
        '/items/necklace-6.jpg',
      ],
      name: 'partner & me',
      short: 'gifts between us',
      description:
        'a beautiful bouquet my partner surprised me with, plus the sweetest little card to go with it.\nand our matching pair of cat pendant necklaces - one for me and one for them.',
      details: [
        { label: 'makes me feel', value: 'loved & giggly' },
        { label: 'birthday surprise', value: 'a bouquet & card' },
        { label: 'our pendants', value: 'one peach, one goma' },
      ],
    },
    {
      images: ['/items/backpack-1.jpg', '/items/backpack-2.jpg', '/items/backpack-3.jpg', '/items/backpack-4.jpg'],
      name: 'display backpack',
      short: 'my soft carryall',
      description: "a pastel pink backpack with a bunch of different metal pins. it's perfect for carrying my essentials on cozy adventures.",
      details: [
        { label: 'style', value: 'ita bag ♡' },
        { label: 'features', value: 'metal pins, keychains' },
        { label: 'use', value: 'cozy adventures' },
      ],
    },
    {
      images: ['/items/desk-setup-1.jpg', '/items/desk-setup-2.jpg'],
      name: 'my desk setup',
      short: 'where the magic happens',
      description:
        'my cozy little battlestation - soft pastel lighting, a glowing pc build, and way too many plushies crowding the desk. full specs below, for the curious.',
      details: [
        { label: 'vibe', value: 'cozy & glowy' },
        { label: 'plushies on desk', value: 'too many to count' },
        { label: 'main character', value: 'the ugly mouse' },
      ],
      specs: [
        { label: 'cpu', value: 'AMD Ryzen 7 9800X3D' },
        { label: 'motherboard', value: 'Gigabyte B850 AORUS ELITE WIFI7 ICE' },
        { label: 'ram', value: 'T-Create Expert 32GB DDR5-6000 CL30' },
        { label: 'gpu', value: 'Gigabyte AERO OC RTX 5070 Ti 16GB' },
        { label: 'case', value: 'Lian Li O11 Vision' },
        { label: 'case fans', value: 'Lian Li UNI FAN SL-INF' },
        { label: 'psu', value: 'Corsair RM850x SHIFT 850W' },
        { label: 'storage', value: 'Samsung 970 EVO Plus 1TB' },
        { label: 'main monitor', value: 'XG27ACDNG · 1440p OLED 360Hz' },
        { label: 'second monitor', value: 'G24F 2 · 1080p 180Hz' },
        { label: 'keyboard', value: 'Wooting 80HE (White Zinc)' },
        { label: 'mouse', value: 'Razer Viper V4 Pro / zeromouse blade' },
        { label: 'mousepad', value: 'Wallhack SP-004 (glass)' },
        { label: 'microphone', value: 'SteelSeries Alias Pro' },
        { label: 'headphones', value: 'Sony WH-1000XM6' },
        { label: 'webcam', value: 'OBSBOT Meet 2' },
        { label: 'desk', value: 'Flexispot E7 Pro' },
        { label: 'chair', value: 'SIHOO Doro C300' },
      ],
    },
  ],
};

// ─── footer ──────────────────────────────────────────────────────────────────

export const footer = {
  /** Split around the little heart: "made with love ♥ and lots of pastel dreams" */
  taglineBefore: 'made with love',
  taglineAfter: 'and lots of pastel dreams',
  copyrightName: 'Nikki',
  sourceUrl: 'https://github.com/CuteNikki/cute',
  signoff: 'keep on dreaming',
};
