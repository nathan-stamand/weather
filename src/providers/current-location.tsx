
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type CurrentLocationContext = {
  currentLocation: string;
  setCurrentLocation: Dispatch<SetStateAction<string>>;
}

export const CurrentLocation = createContext<CurrentLocationContext>({
  currentLocation: '',
  setCurrentLocation: () => { },
});

export const CurrentLocationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState('');

  return (
    <CurrentLocation.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </CurrentLocation.Provider>
  )
}

export const useCurrentLocation = () => {
  const { currentLocation, setCurrentLocation } = useContext(CurrentLocation);

  return { currentLocation, setCurrentLocation };
}

