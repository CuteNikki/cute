import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const width = searchParams.get('w');
  const height = searchParams.get('h');
  const quality = searchParams.get('q') || '80';

  if (!url) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  try {
    const response = await fetch(decodeURIComponent(url));
    if (!response.ok) throw new Error('Failed to fetch image');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let pipeline = sharp(buffer);

    if (width || height) {
      pipeline = pipeline.resize({
        width: width ? parseInt(width, 10) : undefined,
        height: height ? parseInt(height, 10) : undefined,
        fit: 'cover',
      });
    }

    const optimizedBuffer = await pipeline.webp({ quality: parseInt(quality, 10) }).toBuffer();

    const headers = new Headers();
    headers.set('Content-Type', 'image/webp');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(optimizedBuffer, { status: 200, headers });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Error processing image', { status: 500 });
  }
}
