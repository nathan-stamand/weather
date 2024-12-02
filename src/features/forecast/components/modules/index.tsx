import { Title } from "@/components/ui/title";
import { Humidity } from "./humidity";
import { SunriseSunset } from "./sunrise-sunset";
import { UVIndex } from "./uv-index";
import { WindStatus } from "./wind-status";
import { useCurrentLocation } from "@/providers/current-location";
import { Visibility } from "./visibility";

export const Modules = () => {
  const { currentLocation } = useCurrentLocation();

  if (!currentLocation) return null;

  return (
    <>
      <Title size='h2'>Current Data</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UVIndex />
        <WindStatus />
        <SunriseSunset />
        <Humidity />
        <Visibility />
      </div>
    </>
  )
}
