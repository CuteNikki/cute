import 'server-only';

import { AwsClient } from 'aws4fetch';

// The site's own bucket, and Garage's S3 API for every site, which takes the
// bucket in the path (see the README's Photos section). Photos are read from
// images.niso.moe/cute/ (PHOTO_BASE), which Caddy serves from the bucket.
const BUCKET = 'cute';
const STORAGE_ENDPOINT = 'https://s3.niso.moe';

/** How long a link to upload to lasts: plenty to send one photo, too short to keep. */
const UPLOAD_LINK_SECONDS = 300;

/** Our storage, as its S3 API takes requests: signed with the site's key. */
function storage() {
  const accessKeyId = process.env.STORAGE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.STORAGE_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'STORAGE_ACCESS_KEY_ID and STORAGE_SECRET_ACCESS_KEY must be set for photos'
    );
  }
  return new AwsClient({
    accessKeyId,
    secretAccessKey,
    service: 's3',
    region: process.env.STORAGE_REGION || 'garage',
    retries: 1,
  });
}

function apiUrl(objectKey: string) {
  return new URL(`/${BUCKET}/${objectKey}`, STORAGE_ENDPOINT);
}

/**
 * A link for the browser to upload one file to, straight to storage rather
 * than through the site. It's signed for exactly this type and size, so
 * nothing else can be sent with it, and for a few minutes.
 */
export async function signUpload(
  objectKey: string,
  type: string,
  size: number
) {
  const url = apiUrl(objectKey);
  url.searchParams.set('X-Amz-Expires', String(UPLOAD_LINK_SECONDS));
  const signed = await storage().sign(url.href, {
    method: 'PUT',
    headers: { 'content-type': type, 'content-length': String(size) },
    aws: { signQuery: true, allHeaders: true },
  });
  return signed.url;
}

/** Whether a file is in storage, e.g. that an upload arrived. */
export async function objectExists(objectKey: string) {
  const response = await storage().fetch(apiUrl(objectKey).href, {
    method: 'HEAD',
    signal: AbortSignal.timeout(8000),
  });
  return response.ok;
}

export async function deleteObject(objectKey: string) {
  const response = await storage().fetch(apiUrl(objectKey).href, {
    method: 'DELETE',
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok)
    throw new Error(`Deleting ${objectKey} failed: ${response.status}`);
}
