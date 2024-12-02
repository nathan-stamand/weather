import { MouseEventHandler } from "react";
import { useGetLocations } from "./api/use-get-locations";
import { Locale } from "@/types/api";

export const Options = ({ search, handleSelect }: { search: string, handleSelect: MouseEventHandler<HTMLButtonElement> }) => {
  const query = useGetLocations({ query: search });

  if (!query?.data || "error" in query?.data) return null;

  return (
    <ul className='absolute z-50 top-full left-0 mt-5 w-full bg-gray-100 divide-y divide-gray-300 dark:divide-gray-700 rounded-md overflow-clip'>
      {query.data.map((loc: Locale) => (
        <li key={loc.id}>
          <button
            type="submit"
            onClick={handleSelect}
            title={`${loc.name}, ${loc.region} | ${loc.country}`}
            className='w-full p-2 focus:bg-gray-600 hover:bg-gray-600 hover:text-white focus:text-white bg-gray-400 dark:bg-gray-800 dark:focus:bg-gray-900 dark:hover:bg-gray-900 dark:hover:text-white'
          >
            {loc.name}, {loc.region}
          </button>
        </li>
      ))}
    </ul>
  )
}
