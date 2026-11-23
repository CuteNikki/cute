import 'server-only';

import { createElement } from 'react';

import * as lucide from 'lucide-react';
import { SparklesIcon, type LucideIcon } from 'lucide-react';

/**
 * Icons are kept by their lucide name (https://lucide.dev/icons), e.g.
 * "gamepad-2", and drawn here on the server, so the page's code doesn't carry
 * every icon there is.
 */
function lucideIcon(name: string) {
  const key = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  // Every icon, old names included, is exported as <Name>Icon too, which
  // nothing else lucide exports is called.
  const exportName = `${key}Icon`;
  return Object.hasOwn(lucide, exportName)
    ? (lucide[exportName as keyof typeof lucide] as LucideIcon)
    : null;
}

/** Whether lucide has an icon called `name`. */
export function isIcon(name: string) {
  return lucideIcon(name) !== null;
}

/** The icon called `name`, or sparkles for one lucide doesn't have (any more). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return createElement(lucideIcon(name) ?? SparklesIcon, {
    className,
    'aria-hidden': true,
  });
}
