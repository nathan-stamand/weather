import { Hour } from "@/types/api";
import { getFormattedTime } from "./get-formatted-time";

export function createHourlyArray(startTime: string, hours: Hour[], fahrenheit: boolean) {
  const date = new Date(startTime);
  const currentHour = date.getHours();
  const twelveHours = hours.slice(currentHour, currentHour + 24);
  return twelveHours.map(hr => (
    {
      formattedHour: getFormattedTime(hr.time),
      temperature: fahrenheit ? hr.temp_f : hr.temp_c,
    }
  ));
}
