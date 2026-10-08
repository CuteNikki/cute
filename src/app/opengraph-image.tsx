import { ImageResponse } from 'next/og';

import { parseDate, yearsSince } from '@/lib/dates';
import { badges, discordUserId, profile, site } from '@/site.config';

// The link preview card that shows up when the site is shared (discord, twitter, imessage...).
// Everything on it comes from site.config.ts. Rebuilt hourly so the age and avatar stay current.

export const alt = site.previewAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;

// Satori (what draws this) can't read the oklch() theme tokens, so these are the hex equivalents
// of the light theme in globals.css.
const colors = {
  background: '#ffebf4',
  card: '#fff9fd',
  primary: '#ed76b3',
  secondary: '#ffdcef',
  accent: '#d5c3f8',
  accentForeground: '#652a72',
  mutedForeground: '#a56f8e',
  border: '#f2cfe2',
};

// Google Fonts serves a .ttf when asked without a browser user agent, and `text=` trims it down to
// just the glyphs we draw. Falls back to the built-in font if Google can't be reached at build time.
async function loadGoogleFont(family: string, weight: number, text: string) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return { name: family, data: await (await fetch(url)).arrayBuffer(), weight: weight as 600 | 700, style: 'normal' as const };
  } catch {
    return null;
  }
}

// Same source as the live avatar on the page. Discord's .png is used even for animated avatars,
// since the preview is a still image anyway.
async function getAvatarUrl() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
    const json = await res.json();
    const avatar: string | undefined = json?.data?.discord_user?.avatar;
    if (avatar) return `https://cdn.discordapp.com/avatars/${discordUserId}/${avatar}.png?size=512`;
  } catch {}
  return null;
}

export default async function Image() {
  const previewBadges = badges.filter((badge) => badge.showOnPreview);
  const age = yearsSince(parseDate(profile.dateOfBirth));
  const facts = [`${age} years old`, ...profile.facts].join(' · ');
  const domain = new URL(site.url).host;

  const [avatarUrl, fredoka, nunito] = await Promise.all([
    getAvatarUrl(),
    loadGoogleFont('Fredoka', 700, profile.name),
    loadGoogleFont('Nunito', 700, [facts, domain, ...previewBadges.map((badge) => badge.label)].join('')),
  ]);
  const fonts = [fredoka, nunito].filter((font) => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 48,
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary} 55%, ${colors.accent} 100%)`,
          fontFamily: 'Nunito',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 56,
            padding: '48px 64px',
            borderRadius: 56,
            background: colors.card,
            border: `3px solid ${colors.border}`,
            boxShadow: '0 12px 40px rgba(237, 118, 179, 0.18)',
          }}
        >
          {/* avatar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 320,
              height: 320,
              flexShrink: 0,
              borderRadius: 9999,
              background: colors.secondary,
              border: `10px solid ${colors.secondary}`,
              overflow: 'hidden',
            }}
          >
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- Satori draws plain <img>, not next/image
              <img src={avatarUrl} width={300} height={300} alt='' style={{ borderRadius: 9999 }} />
            ) : (
              <div style={{ display: 'flex', fontSize: 140 }}>{profile.nameEmoji}</div>
            )}
          </div>

          {/* text */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: 'Fredoka', fontSize: 84, color: colors.primary, lineHeight: 1 }}>
              <span>{profile.name}</span>
              <span style={{ fontSize: 64 }}>{profile.nameEmoji}</span>
            </div>

            <div style={{ display: 'flex', marginTop: 18, fontSize: 34, color: colors.accentForeground }}>{facts}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
              {previewBadges.map((badge) => (
                <div
                  key={badge.label}
                  style={{
                    display: 'flex',
                    padding: '10px 24px',
                    borderRadius: 9999,
                    background: colors.secondary,
                    border: `2px solid ${colors.border}`,
                    fontSize: 26,
                    color: colors.accentForeground,
                  }}
                >
                  {badge.label}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 36, fontSize: 28, color: colors.mutedForeground }}>
              <span>💗</span>
              <span>{domain}</span>
            </div>
          </div>
        </div>

        {/* decorations tucked over the card's corners - drawn last so they sit on top of it */}
        <div style={{ position: 'absolute', top: 14, left: 18, fontSize: 84, display: 'flex', transform: 'rotate(-12deg)' }}>✨</div>
        <div style={{ position: 'absolute', top: 8, right: 22, fontSize: 92, display: 'flex', transform: 'rotate(14deg)' }}>🎀</div>
        <div style={{ position: 'absolute', bottom: 10, left: 22, fontSize: 80, display: 'flex', transform: 'rotate(-8deg)' }}>🌷</div>
        <div style={{ position: 'absolute', bottom: 12, right: 24, fontSize: 88, display: 'flex', transform: 'rotate(10deg)' }}>⭐</div>
      </div>
    ),
    { ...size, fonts },
  );
}
