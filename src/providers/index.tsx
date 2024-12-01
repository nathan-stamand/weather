import { queryConfig } from "@/lib/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { SettingsProvider } from "./settings";
import { CurrentLocationProvider } from "./current-location";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: queryConfig,
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentLocationProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </CurrentLocationProvider>
    </QueryClientProvider>
  )
}
