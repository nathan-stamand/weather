export function getFormattedDate(datetime: string) {
  const date = new Date(datetime);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date);
  return formattedDate;
}
