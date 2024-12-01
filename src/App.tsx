import './App.css'
import { Settings } from './components/settings'
import { ThemeSwitcher } from './components/theme-switcher'
import { Title } from './components/ui/title'
import { DailyOverview } from './features/forecast/components/daily-overview'
import { Search } from './features/search'
import { useCurrentLocation } from './providers/current-location'

function App() {
  const { currentLocation } = useCurrentLocation();

  return (
    <div className='flex flex-col h-screen'>
      <header className='full flex justify-between items-center p-5 bg-gray-500'>
        <Title size='h3' className='bold'>the weather</Title>
        <div className='flex gap-x-4 items-center'>
          <ThemeSwitcher />
          <Settings />
        </div>
      </header>
      <div className='grid grid-cols-12 gap-4 p-4 basis-full'>
        <div className='flex flex-col bg-gray-300 dark:bg-gray-700 rounded-lg p-4 col-span-4'>
          <Search />
          <div className='basis-full py-4'>
            <DailyOverview />
          </div>
          {currentLocation && <Title size='h2' className='text-center my-auto basis-auto pt-4 border border-transparent border-t-gray-200'>{currentLocation}</Title>}
        </div>
        <main className='bg-gray-300 dark:bg-gray-700 rounded-lg p-4 col-span-8'>
          Main
        </main>
      </div>
    </div>
  )
}

export default App
