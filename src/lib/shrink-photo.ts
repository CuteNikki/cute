import { PHOTO_SIDE, type PhotoType } from '@/lib/photos';

/**
 * A photo made smaller in the browser before it's uploaded: a phone photo of
 * many MB becomes one or two, at the size the gallery needs (PHOTO_SIDE).
 * WebP, or JPEG where the browser can't write WebP. A GIF keeps only its
 * first frame. Throws if the browser can't read the file.
 */
export async function shrinkPhoto(file: File) {
  const bitmap = await createImageBitmap(file, {
    imageOrientation: 'from-image',
  }).catch(() => {
    throw new Error(
      `${file.name} couldn't be read. Try a JPEG, PNG or WebP photo.`
    );
  });
  try {
    const scale = Math.min(
      1,
      PHOTO_SIDE / Math.min(bitmap.width, bitmap.height)
    );
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext('2d')!;
    context.imageSmoothingQuality = 'high';
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    let type: PhotoType = 'image/webp';
    let blob = await toBlob(canvas, type);
    // A browser that can't write WebP hands back a PNG instead.
    if (blob.type !== type) {
      type = 'image/jpeg';
      blob = await toBlob(canvas, type);
    }
    return { type, blob };
  } finally {
    bitmap.close();
  }
}

async function toBlob(canvas: HTMLCanvasElement, type: PhotoType) {
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, type, 0.9)
  );
  if (!blob) throw new Error("The photo couldn't be made smaller.");
  return blob;
}
