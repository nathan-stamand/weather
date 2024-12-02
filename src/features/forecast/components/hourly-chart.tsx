import { useCurrentLocation } from "@/providers/current-location";
import { useGetForecast, getForecastQueryOptions } from "../api/get-forecast";
import { createHourlyArray } from "@/utils/create-hourly-array";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useSettings } from "@/providers/settings";
import { Title } from "@/components/ui/title";

const chartConfig = {
  desktop: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const HourlyChart = () => {
  const { settings } = useSettings();
  const { currentLocation } = useCurrentLocation();
  const currentWeatherQuery = useGetForecast({
    queryConfig: getForecastQueryOptions({ query: currentLocation })
  });

  if (
    !currentWeatherQuery ||
    !currentWeatherQuery.data ||
    !('error' in currentWeatherQuery) ||
    !('forecast' in currentWeatherQuery.data) ||
    !('location' in currentWeatherQuery.data)
  ) return null;

  const { location, forecast } = currentWeatherQuery.data;

  const hours = [
    ...forecast.forecastday[0].hour,
    ...forecast.forecastday[1].hour,
  ];

  const hourArray = createHourlyArray(location.localtime, hours, settings.fahrenheit.value);

  return (
    <>
      <Title size='h2'>The Next 24 Hours</Title>
      <Card>
        <CardHeader>
          <CardTitle>Temperature Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={hourArray}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="formattedHour"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
              />
              <YAxis
                dataKey="temperature"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
              />
              {/* TODO: Investigate tooltip causing lots of re-renders across app */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="temperature"
                type='natural'
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
