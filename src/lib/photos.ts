/**
 * Where the gallery's photos are: the cute bucket in Garage, on our own server,
 * served by Caddy at images.niso.moe/cute (see the README's Photos section).
 */
export const PHOTO_BASE = 'https://images.niso.moe/cute';

/** The address a photo is shown from, by its key in the bucket. */
export function photoUrl(key: string) {
  return `${PHOTO_BASE}/${key}`;
}
