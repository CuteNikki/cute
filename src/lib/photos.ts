/**
 * Where the gallery's photos are: the cute bucket in Garage, on our own server,
 * served by Caddy at images.niso.moe/cute (see the README's Photos section).
 */
export const PHOTO_BASE = 'https://images.niso.moe/cute';

/** The address a photo is shown from, by its key in the bucket. */
export function photoUrl(key: string) {
  return `${PHOTO_BASE}/${key}`;
}

/**
 * The formats uploads are kept in, with their extensions: WebP, or JPEG from
 * a browser that can't write WebP (see shrinkPhoto).
 */
export const PHOTO_TYPES = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
} as const;
export type PhotoType = keyof typeof PHOTO_TYPES;

/** The most an upload can be, after the browser made it smaller. */
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

/**
 * Uploads are scaled down until their shorter side is this many pixels, the
 * size of the photos from before (2160 x 2880). next/image makes the smaller
 * sizes the page shows from them.
 */
export const PHOTO_SIDE = 2160;

/** An upload's key: photos/<id>.<extension>. */
export const UPLOAD_KEY = /^photos\/[0-9a-f-]{36}\.(webp|jpg)$/;

/** A photo in the library, as /admin shows it. */
export type LibraryPhoto = { id: string; url: string };
