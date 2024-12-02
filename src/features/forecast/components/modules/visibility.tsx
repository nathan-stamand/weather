import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Title } from "@/components/ui/title"
import { useCurrentLocation } from "@/providers/current-location";
import { useGetForecast, getForecastQueryOptions } from "../../api/get-forecast";
import { useSettings } from "@/providers/settings";

export const Visibility = () => {
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

  const value = settings.miles.value ? current.vis_miles : current.vis_km;
  const unit = settings.miles.value ? 'miles' : 'kilometers'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visibility</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Title size='h2'>{value} {unit}</Title>
      </CardContent>
    </Card>
  )
}
