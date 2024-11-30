import './App.css'
import { Settings } from './components/settings'
import { ThemeSwitcher } from './components/theme-switcher'
import { Title } from './components/ui/title'

function App() {
  return (
    <>
      <header className='flex justify-between items-center p-5'>
        <Title size='h3'>And now...the weather</Title>
        <div className='flex gap-x-4 items-center'>
          <ThemeSwitcher />
          <Settings />
        </div>
      </header>
    </>
  )
}

export default App
