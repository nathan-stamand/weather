import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Title } from "@/components/ui/title"
import { useCurrentLocation } from "@/providers/current-location";
import { useGetForecast, getForecastQueryOptions } from "../../api/get-forecast";
import { Compass } from "@/components/compass";
import { useSettings } from "@/providers/settings";

export const WindStatus = () => {
  const { settings } = useSettings();
  const { currentLocation } = useCurrentLocation();
  const currentWeatherQuery = useGetForecast({
    queryConfig: getForecastQueryOptions({ query: currentLocation })
  });

  if (
    !currentWeatherQuery ||
    !currentWeatherQuery.data ||
    'error' in currentWeatherQuery.data ||
    !('current' in currentWeatherQuery.data)
  ) return null;

  const { current } = currentWeatherQuery.data;

  const unit = settings.miles.value ? 'MPH' : 'KPH';
  const value = settings.miles.value ? current.wind_mph : current.wind_kph;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wind Status</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Title size='h3'>{value} {unit}</Title>
        <div className='flex items-center justify-start gap-4'>
          <Compass degree={current.wind_degree} />
          <Title size='h3'>{current.wind_dir}</Title>
        </div>
      </CardContent>
    </Card>
  )
}
