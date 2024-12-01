import './App.css'
import { Settings } from '@/components/settings'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Title } from '@/components/ui/title'
import { DailyOverview } from '@/features/forecast/components/daily-overview'
import { HourlyChart } from '@/features/forecast/components/hourly-chart'
import { Modules } from '@/features/forecast/components/modules'
import { Search } from '@/features/search'
import { useCurrentLocation } from '@/providers/current-location'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

function App() {
  const { currentLocation } = useCurrentLocation();
  const [sidebarBottomPadding, setSidebarBottomPadding] = useState(0);
  const title = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (title.current) {
      console.log(title.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <header className='full flex justify-between items-center p-5 bg-gray-100 dark:bg-gray-800'>
        <Title size='h3' className='bold'>the weather</Title>
        <div className='flex gap-x-4 items-center'>
          <ThemeSwitcher />
          <Settings />
        </div>
      </header>
      <div className='grid grid-cols-12 gap-4 p-4 basis-full'>
        <div className='relative flex flex-col bg-gray-300 dark:bg-gray-700 rounded-lg p-4 col-span-full lg:col-span-4'>
          <Search />
          <div className='basis-full py-4'>
            <DailyOverview />
          </div>
          <div ref={title} className='sticky bottom-0 left-0 right-0'>
            {currentLocation && <Title size='h2' className='bg-gray-300 dark:bg-gray-700 text-center my-auto basis-auto p-4 border border-transparent border-t-gray-200'>{currentLocation}</Title>}
          </div>
        </div>
        <main className='flex flex-col gap-4 bg-gray-300 dark:bg-gray-700 rounded-lg p-4 col-span-full lg:col-span-8'>
          <HourlyChart />
          <Modules />
        </main>
      </div>
    </div>
  )
}

export default App
