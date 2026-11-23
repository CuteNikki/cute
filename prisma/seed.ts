import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';
import { Pool } from 'pg';

import { PrismaClient } from '../src/lib/generated/prisma/client';
import { content, items } from './seed-content';

// The same files Next.js reads, like prisma.config.ts
config({ path: ['.env.local', '.env'], quiet: true });

const db = new PrismaClient({
  adapter: new PrismaPg(
    new Pool({ connectionString: process.env.DATABASE_URL })
  ),
});

// Only fills an empty database, so running it again never overwrites edits
// made in /admin.
if (await db.settings.findUnique({ where: { id: 1 } })) {
  console.log('The database has content already, nothing seeded.');
} else {
  await db.$transaction(async (tx) => {
    await tx.settings.create({ data: { id: 1, ...content } });

    const keys = [...new Set(items.flatMap((item) => item.photos))];
    await tx.photo.createMany({ data: keys.map((key) => ({ key })) });
    const photos = await tx.photo.findMany();
    const idOf = new Map(photos.map((photo) => [photo.key, photo.id]));

    for (const [position, { photos, link, ...item }] of items.entries()) {
      await tx.galleryItem.create({
        data: {
          ...item,
          link: link ?? undefined,
          position,
          photos: {
            create: photos.map((key, index) => ({
              photoId: idOf.get(key)!,
              position: index,
            })),
          },
        },
      });
    }
  });
  console.log('Seeded the site content and gallery.');
}

await db.$disconnect();
