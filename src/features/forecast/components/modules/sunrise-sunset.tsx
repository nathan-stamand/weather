import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useCurrentLocation } from "@/providers/current-location";
import { useGetForecast, getForecastQueryOptions } from "../../api/get-forecast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const SunriseSunset = () => {
  const { currentLocation } = useCurrentLocation();
  const currentWeatherQuery = useGetForecast({
    queryConfig: getForecastQueryOptions({ query: currentLocation })
  });

  if (
    !currentWeatherQuery ||
    !currentWeatherQuery.data ||
    'error' in currentWeatherQuery.data ||
    !('forecast' in currentWeatherQuery.data)
  ) return null;

  const { forecast } = currentWeatherQuery.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunrise / Sunset</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex gap-3 items-center'>
          <FontAwesomeIcon icon={faArrowUp} /> {forecast.forecastday[0].astro.sunrise}
        </div>
        <div className='flex gap-3 items-center'>
          <FontAwesomeIcon icon={faArrowDown} /> {forecast.forecastday[0].astro.sunset}
        </div>
      </CardContent>
    </Card>
  )
}
