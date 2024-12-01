import { useState, useRef, ChangeEvent, FormEvent, useEffect, MouseEventHandler } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useCurrentLocation } from "@/providers/current-location";
import { useGetLocations } from "./api/use-get-locations";
import { Input } from "@/components/ui/input";

export const Search = () => {
  const { setCurrentLocation } = useCurrentLocation();
  const [search, setSearch] = useState('');
  const [_, setDebouncedSearch] = useState('');
  const [displayOptions, setDisplayOptions] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const debouncedSearchValue = useDebounce(search);

  useEffect(() => {
    setDebouncedSearch(search);
  }, [debouncedSearchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input?.current?.value) return;
    setCurrentLocation(input.current.value);
    setSearch('');
  }

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!input?.current?.value || !(e.target instanceof HTMLElement)) return;
    input.current.value = e.target.innerText;
  }
  return (
    <div className='relative'>
      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor='search'>Search:</label>{' '}
        <Input
          ref={input}
          autoComplete='off'
          id='search'
          placeholder='Search locations'
          name='search'
          value={search}
          onChange={e => handleSearch(e)}
          onFocus={() => setDisplayOptions(true)}
          onBlur={() => setTimeout(() => setDisplayOptions(false), 1000)}
        />
        {displayOptions && <Options search={debouncedSearchValue} handleSelect={handleSelect} />}
      </form>
    </div>
  )
}

const Options = ({ search, handleSelect }: { search: string, handleSelect: MouseEventHandler<HTMLButtonElement> }) => {
  const query = useGetLocations({ query: search });

  if (!query?.data || "error" in query?.data) return null;

  return (
    <ul className='absolute z-50 top-full left-0 mt-5 w-full bg-gray-100 divide-y divide-gray-300 dark:divide-gray-700 rounded-md overflow-clip'>
      {query.data.map((loc) => (
        <li key={loc.id}>
          <button type="submit" onClick={handleSelect} className='w-full p-2 focus:bg-gray-600 hover:bg-gray-600 hover:text-white bg-gray-400 dark:focus:bg-gray-900 dark:hover:bg-gray-900 dark:hover:text-white'>
            {loc.name}, {loc.region}
          </button>
        </li>
      ))}
    </ul>
  )
}
