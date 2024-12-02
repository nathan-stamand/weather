import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Title } from "@/components/ui/title"
import { useCurrentLocation } from "@/providers/current-location";
import { useGetForecast, getForecastQueryOptions } from "../../api/get-forecast";
import { VerticalProgress } from "@/components/ui/vertical-progress";

export const Humidity = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Humidity</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <VerticalProgress value={current.humidity} />
        <Title size='h3'>{current.humidity}%</Title>
      </CardContent>
    </Card>
  )
}
