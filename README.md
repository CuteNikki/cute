# niso ⋅ pastel corner ♡

a soft, pastel-pink corner of the internet - plushies, cats & kindness.

live on **[cute.niso.moe](https://cute.niso.moe)**

## what is this?

this is my personal little page. it's not a portfolio and there's nothing to sell here - it's just me, the things i love, and what i'm up to right now.

i wanted a place on the internet that actually feels like *me*: soft colours, way too many plushies, a bit of sparkle, and no pressure to look professional. it also doubles as my playground for cute ui ideas, so it keeps growing whenever i think of something new to add.

## a little tour

### the profile

the first thing you see is me! my avatar and banner come straight from my discord profile, so whenever i change them there, they change here too (animated avatars included). underneath is my name, my age, where i'm from and my pronouns.

below that are a few little badges about who i am. some of them can be tapped or hovered to show a short explanation, and some come with milestones and how long ago they happened - those dates and my age count up on their own, so the page never goes out of date.

### what i'm up to

a live peek at my discord status. it shows my custom status and whatever i'm doing at the moment:

- **listening to music** - the song, artist and cover, with a progress bar that moves along with the track
- **playing a game** - the game and how long i've been playing
- **anything else** - other apps and activities show up with their own details

it refreshes on its own every few seconds, so you can just leave the page open and watch.

### a little about me

a short intro about who i am, my favourite movies & shows, and a little grid of things i love - kitties, plushies, pastels, gaming, music, snacking and more.

### photo gallery

the heart of the page. every card is a little collection of my favourite things:

- **plush family** - my cuddle buddies, with a link to my [plushie site](https://plushies.niso.moe) to meet all of them
- **selfies & fits** - a better look at me and my comfiest loungewear
- **agere collection** - the things that help me feel safe and small
- **peach & goma** - my favourite cat duo, who show up just about everywhere
- **partner & me** - little gifts between us
- **display backpack** - my pastel ita bag covered in pins
- **my desk setup** - my cozy battlestation, with full pc specs for the curious

tapping a card opens a photo viewer. you can swipe or use the arrow keys to flip through the photos, jump around with the thumbnails, and open any photo full screen to zoom in and pan around. each card also has a short description and a few fun details.

### let's be friends

all the places you can find me - discord, instagram, snapchat, twitter, youtube, twitch, github and steam.

## little details

some things you might not notice at first, but i love them:

- **light & dark mode** - both pastel, of course. the toggle sits in the corner and remembers your choice
- **gentle motion** - sections float in as you scroll and sparkles twinkle around the profile. if your device is set to reduce motion, the page calms down and respects that
- **made for phones too** - the layout goes from one cozy column on a phone to a profile sidebar on a big screen, and a little hint nudges mobile visitors to keep scrolling
- **accessible** - keyboard navigation, focus rings, screen-reader labels and proper headings throughout
- **fast** - images are resized and served in modern formats, and the page is prerendered and refreshed every hour

## built with

- [next.js](https://nextjs.org), react & typescript
- [tailwind css](https://tailwindcss.com) for all the pastel styling
- [shadcn/ui](https://ui.shadcn.com) on [base ui](https://base-ui.com) for dialogs, popovers and buttons
- [motion](https://motion.dev) for animations and swipe gestures
- [lucide](https://lucide.dev) for icons
- [lanyard](https://github.com/phineas/lanyard) for the live discord status, avatar and banner
- [prisma](https://www.prisma.io) on postgres for everything the page shows
- [better auth](https://www.better-auth.com) for signing in to the admin area
- [garage](https://garagehq.deuxfleurs.fr), an s3-compatible store on my own server, for the photos
- docker on my own server for hosting

## the admin area

everything on the page lives in a database, and i change it at `/admin` instead of in the code:

- **profile, socials, about, status, footer, site** - a page each, with every text, list and icon of that part. lists can be dragged into a new order (or moved with the keyboard), and icons are picked by searching [lucide](https://lucide.dev/icons)
- **gallery** - add, edit, reorder and delete the cards, each with its photos picked from the library
- **photos** - the library. new photos are made smaller in the browser and uploaded straight to storage; one can be deleted once no card has it
- **account** - passkeys, to sign in without discord

saving shows the change on the site straight away. only one discord account can sign in: the one `ADMIN_DISCORD_ID` names. there's no sign-up and no password.

## running it yourself

you need [bun](https://bun.sh), node 22.12 or newer, and a postgres database.

1. copy `.env.example` to `.env` and fill it in
2. install, set up the database and start the site:

```bash
bun install          # also makes the prisma client
bun db:migrate       # creates the tables
bun db:seed          # fills an empty database with my content, to start from
bun dev
```

3. sign in at `/sign-in` with the discord account `ADMIN_DISCORD_ID` names

| setting | what it's for |
| --- | --- |
| `DATABASE_URL` | the postgres database |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` | signing in: a random secret, and where the site runs (passkeys only work there) |
| `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` | a discord application's oauth2 client, with `<site>/api/auth/callback/discord` as a redirect |
| `ADMIN_DISCORD_ID` | the discord user id that can sign in |
| `STORAGE_ACCESS_KEY_ID`, `STORAGE_SECRET_ACCESS_KEY` | the photo storage's key (see below). `STORAGE_REGION` is `garage` unless set |

### photos

photos are kept in a bucket of their own in an s3-compatible store (garage, here). its address is in `src/lib/photos.ts` (where they're shown from) and `src/lib/storage.ts` (where they're uploaded to). the bucket needs:

- a key that can read and write it, and nothing else
- website access, so photos can be shown from it
- a cors rule allowing `PUT` with a `content-type` header from the site's address, since the browser uploads to it directly

### docker

`docker compose up -d --build` runs the database's migrations and then the site, on port 3000 (or `PORT`). the build reads `.env` as a build secret, because it prerenders the page from the database, so the database has to be reachable while building.

## license

the code is [MIT](LICENSE.md) ♡
