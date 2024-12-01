import { useCurrentLocation } from "@/providers/current-location";
import { getFormattedDate } from "@/utils/get-formatted-date";
import { useEffect } from "react";
import { getForecastQueryOptions, useGetForecast } from "../api/get-forecast";
import { getDayWord } from "@/utils/get-day-word";
import { getFormattedTime } from "@/utils/get-formatted-time";
import { useSettings } from "@/providers/settings";
import { Title } from "@/components/ui/title";

const Temperature = () => {
  const { settings } = useSettings();
  const { currentLocation } = useCurrentLocation();
  const currentWeatherQuery = useGetForecast({
    queryConfig: getForecastQueryOptions({ query: currentLocation })
  });

  if (!currentWeatherQuery || !currentWeatherQuery?.data || !("current" in currentWeatherQuery.data)) return null;

  const { current } = currentWeatherQuery.data;

  const temp = settings.fahrenheit.value ? current.temp_f : current.temp_c;
  const tempModifier = settings.fahrenheit.value ? "F" : "C";

  return (
    <p className='text-7xl leading-normal'>{temp}<sup>&#176;{tempModifier}</sup></p>
  )
}

export const DailyOverview = () => {
  const { currentLocation, setCurrentLocation } = useCurrentLocation();
  const currentWeatherQuery = useGetForecast({
    queryConfig: getForecastQueryOptions({ query: currentLocation })
  });

  useEffect(() => {
    if (currentWeatherQuery?.data && 'location' in currentWeatherQuery?.data) {
      const { name, region } = currentWeatherQuery?.data?.location;
      const current = `${name}, ${region}`;
      setCurrentLocation(current);
    }
  }, [currentWeatherQuery]);

  if (!currentWeatherQuery || !currentWeatherQuery?.data || !("current" in currentWeatherQuery.data)) return null;

  const { forecast, current, location } = currentWeatherQuery.data;

  const day = getDayWord(location.localtime);
  const time = getFormattedTime(location.localtime);
  const date = getFormattedDate(location.localtime);

  return (
    <div className='text-center space-y-2'>
      <img className='inline-block' src={`https:${current.condition?.icon}`} alt={current.condition?.text} />
      <Temperature />
      <p><b>{day}</b>, <i>{time}</i></p>
      <p>{date}</p>
      <Title size='h3'>{current.condition?.text}</Title>
      <p>Rain {forecast.forecastday[0].day.daily_chance_of_rain}%</p>
    </div>
  )
}
