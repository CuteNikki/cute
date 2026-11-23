'use server';

import { updateTag } from 'next/cache';

import { CONTENT_TAG } from '@/data/content';

import { sectionSchemas, type Section } from '@/lib/content';
import { db } from '@/lib/db';
import { fieldErrors, type SaveResult } from '@/lib/form';
import { isIcon } from '@/lib/icons';
import { requireOwner } from '@/lib/session';

/** Icon names anywhere in `value` that lucide doesn't have, by path. */
function unknownIcons(value: unknown, path: string[] = []) {
  const errors: Record<string, string> = {};
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      Object.assign(errors, unknownIcons(item, [...path, String(index)]))
    );
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (key === 'icon' && typeof item === 'string' && !isIcon(item)) {
        errors[[...path, key].join('.')] = 'An icon from the list';
      } else {
        Object.assign(errors, unknownIcons(item, [...path, key]));
      }
    }
  }
  return errors;
}

/** Saves one section of the page, as its form in /admin has it. */
export async function saveSection(
  section: Section,
  value: unknown
): Promise<SaveResult> {
  await requireOwner();
  const parsed = sectionSchemas[section].safeParse(value);
  if (!parsed.success) {
    return { ok: false, errors: fieldErrors(parsed.error) };
  }
  const icons = unknownIcons(parsed.data);
  if (Object.keys(icons).length > 0) return { ok: false, errors: icons };

  await db.settings.update({
    where: { id: 1 },
    data: { [section]: parsed.data },
  });
  updateTag(CONTENT_TAG);
  return { ok: true };
}
