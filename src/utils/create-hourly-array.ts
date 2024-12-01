import { Hour } from "@/types/api";
import { getFormattedTime } from "./get-formatted-time";

export function createHourlyArray(startTime: string, hours: Hour[], fahrenheit: boolean) {
  const date = new Date(startTime);
  const currentHour = date.getHours();
  const twelveHours = hours.slice(currentHour, currentHour + 24);
  twelveHours.forEach(hr => {
    hr.formattedHour = getFormattedTime(hr.time);
    hr.temperature = fahrenheit ? hr.temp_f : hr.temp_c;
  });
  return twelveHours;
}
