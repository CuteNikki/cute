/**
 * The site's content as it was in site.config.ts before the admin area: what
 * `bun db:seed` fills an empty database with.
 */
import type { Content, GalleryItemInput } from '@/lib/content';

export const content = {
  site: {
    title: 'niso ⋅ pastel corner ♡',
    description:
      'A soft, pastel-pink corner of the internet — plushies, cats & kindness.',
    url: 'https://cute.niso.moe',
    previewAlt:
      "Nikki Sophie's profile card - avatar, name and badges on a pastel pink background",
    discordUserId: '303142922780672013',
  },
  profile: {
    name: 'Nikki Sophie',
    nameEmoji: '🌸',
    dateOfBirth: '2004-09-26',
    facts: ['german', 'she/her'],
    bio: '♡ an angel who loves plushies, pastel colors & cats ★彡\nwelcome to my soft little corner of the internet where i get to be small & silly, built on respect & kindness.',
    bannerAlt: 'Cute pastel banner',
    avatarAlt: 'dynamic avatar',
    badges: [
      {
        icon: 'transgender',
        label: 'transgender',
        explanation:
          'transgender is a term used to describe someone whose gender identity differs from the sex they were assigned at birth. i was born male but identify as female.',
        milestones: [
          {
            label: 'realization',
            date: '2015-01',
          },
          {
            label: 'document change',
            date: '2025-02-02',
          },
          {
            label: 'hormone therapy',
            date: '2026-03-17',
          },
        ],
        showOnPreview: false,
      },
      {
        icon: 'baby',
        label: 'age regressor',
        explanation:
          'an age regressor is someone who mentally shifts to a younger mindset; often as a coping mechanism for stress, trauma or anxiety. it provides a safe, non-sexual space to relax, process emotions or experience a sense of comfort and care that may have been missing in the past.',
        milestones: [],
        showOnPreview: false,
      },
      {
        icon: 'heart',
        label: 'kindness first',
        explanation: '',
        milestones: [],
        showOnPreview: true,
      },
      {
        icon: 'sparkles',
        label: 'plushie collector',
        explanation: '',
        milestones: [],
        showOnPreview: true,
      },
    ],
  },
  socials: {
    title: "let's be friends ♡",
    links: [
      {
        icon: 'gamepad-2',
        label: 'Discord',
        handle: '@cutenikki',
        href: 'https://discord.com/users/303142922780672013',
      },
      {
        icon: 'camera',
        label: 'Instagram',
        handle: '@BlushingNikki',
        href: 'https://instagram.com/blushingnikki',
      },
      {
        icon: 'ghost',
        label: 'Snapchat',
        handle: '@BlushingNikki',
        href: 'https://www.snapchat.com/add/blushingnikki',
      },
      {
        icon: 'bird',
        label: 'Twitter',
        handle: '@BlushingNikki',
        href: 'https://twitter.com/blushingnikki',
      },
      {
        icon: 'play',
        label: 'YouTube',
        handle: '@BlushingNikki',
        href: 'https://www.youtube.com/@BlushingNikki',
      },
      {
        icon: 'clapperboard',
        label: 'Twitch',
        handle: '/CuteNikki',
        href: 'https://www.twitch.tv/cutenikki',
      },
      {
        icon: 'share-2',
        label: 'Steam',
        handle: '/BlushingNikki',
        href: 'https://steamcommunity.com/id/blushingnikki/',
      },
      {
        icon: 'code-xml',
        label: 'GitHub',
        handle: '/CuteNikki',
        href: 'https://github.com/CuteNikki',
      },
    ],
  },
  about: {
    title: 'a little about me',
    intro:
      "hewwo! am nikki sophie – a pastel loving, cat obsessed little princess who spends way too much time surrounded by plushies. i believe the internet is nicer when everyone's kind, so this is my soft space to share the things i love.",
    more: "when i'm not online you'll find me doodling, programming, listening to music, rewatching comfort movies/shows, or reorganising my plushies for the hundredth time. thank you very much for stopping by! ✿",
    closing: 'i love my partner christian more than anything 💖',
    mediaTitle: 'favourite movies & shows ♡',
    media: [
      {
        icon: 'dog',
        label: 'bluey',
      },
      {
        icon: 'star',
        label: 'how to train your dragon',
      },
      {
        icon: 'swords',
        label: 'star wars',
      },
      {
        icon: 'medal',
        label: 'marvel',
      },
      {
        icon: 'compass',
        label: 'gravity falls',
      },
      {
        icon: 'sparkles',
        label: 'studio ghibli',
      },
    ],
    interestsTitle: 'things i love ♡',
    interests: [
      {
        icon: 'cat',
        label: 'kitties',
      },
      {
        icon: 'heart',
        label: 'plushies',
      },
      {
        icon: 'palette',
        label: 'pastels',
      },
      {
        icon: 'gamepad-2',
        label: 'gaming',
      },
      {
        icon: 'eighth-notes',
        label: 'music',
      },
      {
        icon: 'sparkles',
        label: 'being silly',
      },
      {
        icon: 'heart-handshake',
        label: 'being kind',
      },
      {
        icon: 'popcorn',
        label: 'snacking',
      },
      {
        icon: 'code-xml',
        label: 'coding',
      },
      {
        icon: 'compass',
        label: 'adventures',
      },
    ],
  },
  status: {
    title: "what i'm up to",
    statusLabel: 'Current status',
    extraStatus: 'feeling a little sleepy (yawn~)',
    idle: {
      label: 'Current Mood',
      title: 'cozy & relaxing',
      subtitle: 'taking a small break',
    },
    activityLabels: {
      playing: 'Playing',
      streaming: 'Streaming',
      listening: 'Listening to',
      watching: 'Watching',
      competing: 'Competing in',
    },
    fallbackActivityLabel: 'Active App',
    fallbackActivityDetails: 'Active Session',
  },
  gallery: {
    title: 'photo gallery',
    scrollHint: 'take a look at the gallery',
  },
  footer: {
    taglineBefore: 'made with love',
    taglineAfter: 'and lots of pastel dreams',
    copyrightName: 'Nikki',
    sourceUrl: 'https://github.com/CuteNikki/cute',
    signoff: 'keep on dreaming',
  },
} satisfies Content;

/** The gallery's cards, with their photos as keys in the cute bucket. */
export const items = [
  {
    name: 'plush family',
    short: 'my cuddle buddies',
    description:
      'a super squishy plushie family that lives on my bed. they come everywhere with me on cozy nights.',
    details: [
      {
        label: 'favourite',
        value: 'goma (gray cat)',
      },
      {
        label: 'biggest crew',
        value: 'pusheen',
      },
      {
        label: 'also featuring',
        value: 'sanrio friends & sharks',
      },
    ],
    specs: [],
    link: {
      label: 'meet the whole family',
      href: 'https://plushies.niso.moe',
    },
    photos: [
      'items/plushies-1.jpg',
      'items/plushies-2.jpg',
      'items/plushies-3.jpg',
      'items/plushies-4.jpg',
      'items/pusheen.jpg',
      'items/pusheen-together-1.jpg',
      'items/plushies-5.jpg',
      'items/plushies-6.jpg',
      'items/nebula-snuggles-stack.png',
      'items/pusheen-together-2.png',
      'items/shark-stack.png',
      'items/mayo-tuna.png',
      'items/plushies-7.png',
    ],
  },
  {
    name: 'selfies & fits',
    short: 'a better look at me',
    description:
      'selfies and photos of me in my comfiest loungewear. a cozy shark onesie, my favourite kaomoji tee, a soft pink hoodie, and the pajama i live in on lazy days.',
    details: [
      {
        label: 'comfort fit',
        value: 'shark onesie',
      },
      {
        label: 'wardrobe',
        value: 'tees, hoodies & pjs',
      },
      {
        label: 'photo buddy',
        value: 'usually a plushie',
      },
    ],
    specs: [],
    link: null,
    photos: [
      'items/dress.jpg',
      'items/selfie-1.jpg',
      'items/selfie-2.jpg',
      'items/selfie-3.jpg',
      'items/onesie.jpg',
      'items/kaomoji-tee-1.jpg',
      'items/kaomoji-tee-2.jpg',
      'items/california-tee.jpg',
      'items/pink-hoodie.jpg',
      'items/selfie-4.jpg',
      'items/selfie-5.jpg',
    ],
  },
  {
    name: 'agere collection',
    short: 'my little space',
    description:
      'the things that help me feel safe and small.\nmy pastel pink pacifier with stars, clouds and cuddling kittens. my baby bottle with warm milk for bedtime. and yes, i actually use them regularly.\nrecently picked up a big box of duplo building blocks with a little town play mat, where i build things on cozy evenings.',
    details: [
      {
        label: 'comfort',
        value: 'pacifier & bottle',
      },
      {
        label: 'playtime',
        value: 'blocks & play mat',
      },
      {
        label: 'royalty',
        value: 'goma',
      },
    ],
    specs: [],
    link: null,
    photos: [
      'items/pacifier-1.png',
      'items/pacifier-2.png',
      'items/bottle-1.jpg',
      'items/bottle-2.jpg',
      'items/bottle-3.jpg',
      'items/bottle-4.jpg',
      'items/blocks-1.jpg',
      'items/blocks-2.jpg',
      'items/blocks-3.jpg',
      'items/blocks-4.jpg',
      'items/plushies-8.jpg',
    ],
  },
  {
    name: 'peach & goma',
    short: 'my favourite cat duo',
    description:
      'peach and goma are everywhere in my life - on my pacifier, on my necklaces, and of course as my biggest, squishiest plushie.',
    details: [
      {
        label: 'spotted on',
        value: 'pacifier, necklaces & plushies',
      },
      {
        label: 'favourite hobby',
        value: 'cuddling each other',
      },
      {
        label: 'always found',
        value: 'side by side',
      },
    ],
    specs: [],
    link: null,
    photos: [
      'items/onesie-goma.jpg',
      'items/onesie.jpg',
      'items/selfie-1.jpg',
      'items/blocks-2.jpg',
      'items/pacifier-1.png',
      'items/necklace-1.jpg',
    ],
  },
  {
    name: 'partner & me',
    short: 'gifts between us',
    description:
      'a beautiful bouquet my partner surprised me with, plus the sweetest little card to go with it.\nand our matching pair of cat pendant necklaces - one for me and one for them.',
    details: [
      {
        label: 'makes me feel',
        value: 'loved & giggly',
      },
      {
        label: 'birthday surprise',
        value: 'a bouquet & card',
      },
      {
        label: 'our pendants',
        value: 'one peach, one goma',
      },
    ],
    specs: [],
    link: null,
    photos: [
      'items/flowers-1.jpg',
      'items/flowers-2.jpg',
      'items/flowers-3.jpg',
      'items/necklace-1.jpg',
      'items/necklace-2.jpg',
      'items/necklace-3.jpg',
      'items/necklace-4.jpg',
      'items/necklace-5.jpg',
      'items/necklace-6.jpg',
    ],
  },
  {
    name: 'display backpack',
    short: 'my soft carryall',
    description:
      "a pastel pink backpack with a bunch of different metal pins. it's perfect for carrying my essentials on cozy adventures.",
    details: [
      {
        label: 'style',
        value: 'ita bag ♡',
      },
      {
        label: 'features',
        value: 'metal pins, keychains',
      },
      {
        label: 'use',
        value: 'cozy adventures',
      },
    ],
    specs: [],
    link: null,
    photos: [
      'items/backpack-1.jpg',
      'items/backpack-2.jpg',
      'items/backpack-3.jpg',
      'items/backpack-4.jpg',
    ],
  },
  {
    name: 'my desk setup',
    short: 'where the magic happens',
    description:
      'my cozy little battlestation - soft pastel lighting, a glowing pc build, and way too many plushies crowding the desk. full specs below, for the curious.',
    details: [
      {
        label: 'vibe',
        value: 'cozy & glowy',
      },
      {
        label: 'plushies on desk',
        value: 'too many to count',
      },
      {
        label: 'main character',
        value: 'the ugly mouse',
      },
    ],
    specs: [
      {
        label: 'cpu',
        value: 'AMD Ryzen 7 9800X3D',
      },
      {
        label: 'motherboard',
        value: 'Gigabyte B850 AORUS ELITE WIFI7 ICE',
      },
      {
        label: 'ram',
        value: 'T-Create Expert 32GB DDR5-6000 CL30',
      },
      {
        label: 'gpu',
        value: 'Gigabyte AERO OC RTX 5070 Ti 16GB',
      },
      {
        label: 'case',
        value: 'Lian Li O11 Vision',
      },
      {
        label: 'case fans',
        value: 'Lian Li UNI FAN SL-INF',
      },
      {
        label: 'psu',
        value: 'Corsair RM850x SHIFT 850W',
      },
      {
        label: 'storage',
        value: 'Samsung 970 EVO Plus 1TB',
      },
      {
        label: 'main monitor',
        value: 'XG27ACDNG · 1440p OLED 360Hz',
      },
      {
        label: 'second monitor',
        value: 'G24F 2 · 1080p 180Hz',
      },
      {
        label: 'keyboard',
        value: 'Wooting 80HE (White Zinc)',
      },
      {
        label: 'mouse',
        value: 'Razer Viper V4 Pro / zeromouse blade',
      },
      {
        label: 'mousepad',
        value: 'Wallhack SP-004 (glass)',
      },
      {
        label: 'microphone',
        value: 'SteelSeries Alias Pro',
      },
      {
        label: 'headphones',
        value: 'Sony WH-1000XM6',
      },
      {
        label: 'webcam',
        value: 'OBSBOT Meet 2',
      },
      {
        label: 'desk',
        value: 'Flexispot E7 Pro',
      },
      {
        label: 'chair',
        value: 'SIHOO Doro C300',
      },
    ],
    link: null,
    photos: ['items/desk-setup-1.jpg', 'items/desk-setup-2.jpg'],
  },
] satisfies (Omit<GalleryItemInput, 'photoIds'> & {
  photos: string[];
})[];
