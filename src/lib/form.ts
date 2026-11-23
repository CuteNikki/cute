import type { z } from 'zod';

/** What a form gets back: its field errors by path ("links.2.href"), if any. */
export type SaveResult =
  { ok: true } | { ok: false; errors: Record<string, string> };

/** The issues zod found, the first for each field, by the field's path. */
export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    errors[issue.path.join('.')] ??= issue.message;
  }
  return errors;
}
