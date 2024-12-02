import { useState, useRef, ChangeEvent, FormEvent, useEffect, MouseEventHandler } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useCurrentLocation } from "@/providers/current-location";
import { Input } from "@/components/ui/input";
import { Options } from "./options";

export const Search = () => {
  const { setCurrentLocation } = useCurrentLocation();
  const [search, setSearch] = useState('');
  const [_, setDebouncedSearch] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const debouncedSearchValue = useDebounce(search);

  useEffect(() => {
    const localLocation = localStorage.getItem('currentLocation');
    if (typeof localLocation === 'string') {
      setCurrentLocation(localLocation);
    }
  })

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
    localStorage.currentLocation = input.current.value;
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
          placeholder='&#128269; Search locations'
          name='search'
          value={search}
          onChange={e => handleSearch(e)}
        />
        <Options search={debouncedSearchValue} handleSelect={handleSelect} />
      </form>
    </div>
  )
}
