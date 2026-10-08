// Parses YYYY-MM or YYYY-MM-DD as a local calendar date. `new Date(string)` parses these as UTC
// midnight and is lenient in some engines (Chrome accepts 'around 2015', Safari doesn't), so
// browsers could disagree on the result.
export function parseDate(dateString: string) {
  const [year, month = 1, day = 1] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Whole calendar years elapsed, so birthdays/anniversaries tick over on the actual day
// (dividing by 365.25 days is off by one on the day itself).
export function yearsSince(date: Date, now = new Date()) {
  const years = now.getFullYear() - date.getFullYear();
  const beforeAnniversary = now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate());
  return beforeAnniversary ? years - 1 : years;
}

// "Mar 2026 (6mo ago)" - used for the milestone timelines in the profile badge popovers.
export function formatMilestoneDate(dateString: string) {
  const date = parseDate(dateString);

  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = yearsSince(date, now);

  const absolute = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(date);

  let relative = '';
  if (diffYears > 0) relative = `${diffYears}y ago`;
  else if (diffMonths > 0) relative = `${diffMonths}mo ago`;
  else if (diffDays > 0) relative = `${diffDays}d ago`;
  else relative = 'recently';

  return `${absolute} (${relative})`;
}
