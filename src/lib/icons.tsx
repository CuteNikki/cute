import 'server-only';

import { createElement } from 'react';

import { icons, SparklesIcon } from 'lucide-react';

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
  return Object.hasOwn(icons, key) ? icons[key as keyof typeof icons] : null;
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
