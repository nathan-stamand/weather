export function getFormattedTime(datetime: string) {
  const date = new Date(datetime);
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short'
  }).format(date);

  return formattedTime;
}
