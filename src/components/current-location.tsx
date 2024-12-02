import { useCurrentLocation } from "@/providers/current-location";
import { Title } from "./ui/title";
import { memo } from "react";

export const CurrentLocation = memo(() => {
  const { currentLocation } = useCurrentLocation();

  if (!currentLocation) return null;

  return (
    <Title size='h2' className='bg-gray-300 dark:bg-gray-700 text-center my-auto basis-auto p-4 border border-transparent border-t-gray-200'>
      {currentLocation}
    </Title>
  );
})
