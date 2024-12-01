const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function getDayWord(datestring: string) {
  const date = new Date(datestring);

  return days[date.getDay()];
}
