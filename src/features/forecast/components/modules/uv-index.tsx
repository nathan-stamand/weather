import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Title } from "@/components/ui/title"
import { useCurrentLocation } from "@/providers/current-location";
import { Progress } from "@/components/ui/progress"
import { useGetForecast, getForecastQueryOptions } from "../../api/get-forecast";

export const UVIndex = () => {
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
        <CardTitle>UV Index</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Progress value={(current.uv / 12) * 100} />
        <Title size='h3'>{current.uv}</Title>
      </CardContent>
    </Card>
  )
}
