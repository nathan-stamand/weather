import { env } from "@/env";
import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query";
import { Locale, APIError } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getLocations = (query: string = ''): Promise<Locale[] | APIError> | null => {
  if (!query) return null;
  return api.get('/search.json', { q: query, key: env.WEATHER_API_KEY });
}

export const getLocationsQueryOptions = ({
  query,
}: { query: string }) => {
  return queryOptions({
    queryKey: ['locations', String(query)],
    queryFn: () => getLocations(query),
    staleTime: 0,
    refetchInterval: 1000 * 60,
  });
}

type UseGetLocationsOptions = {
  query?: string;
  queryConfig?: QueryConfig<typeof getLocations>;
}

export const useGetLocations = ({
  query = '',
  queryConfig,
}: UseGetLocationsOptions) => {
  return useQuery({
    ...getLocationsQueryOptions({ query }),
    ...queryConfig,
  })
}
