import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Forecast, APIError } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { env } from "@/env";

const DEFAULT_OPTIONS: Record<string, any> = {
  key: env.WEATHER_API_KEY,
  q: 'Austin',
  aqi: 'no',
  days: 3,
}

export const getForecast = (query: string): Promise<Forecast | APIError> | null => {
  if (!query) return null;
  return api.get('/forecast.json', { ...DEFAULT_OPTIONS, q: query });
}

export const getForecastQueryOptions = ({
  query,
}: { query: string }) => {
  return queryOptions({
    queryKey: ['currentWeather', query],
    queryFn: () => getForecast(query),
    staleTime: 1000 * 110,
    refetchInterval: 1000 * 120,
  });
}

type UseGetForecastOptions = {
  query?: string;
  queryConfig?: QueryConfig<typeof getForecastQueryOptions>;
}

export const useGetForecast = ({
  query = '',
  queryConfig,
}: UseGetForecastOptions) => {
  return useQuery({
    ...getForecastQueryOptions({ query }),
    ...queryConfig,
  })
}
