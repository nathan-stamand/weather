import { SunriseSunset } from "./sunrise-sunset";
import { UVIndex } from "./uv-index";
import { WindStatus } from "./wind-status";

export const Modules = () => {

  return (
    <div className="grid grid-cols-3 gap-4">
      <UVIndex />
      <WindStatus />
      <SunriseSunset />
    </div>
  )
}
