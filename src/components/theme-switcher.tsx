import { faDisplay, faGear, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const THEMES = [
  {
    title: 'light',
    icon: <FontAwesomeIcon icon={faSun} color='orange' />,
  },
  {
    title: 'system',
    icon: <FontAwesomeIcon icon={faDisplay} />,
  },
  {
    title: 'dark',
    icon: <FontAwesomeIcon icon={faMoon} />,
  },
];

export const ThemeSwitcher = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [theme, setTheme] = useState(1);
  const [showTheme, setShowTheme] = useState(false);
  const themeInfo = THEMES[(THEMES.length + theme) % THEMES.length];

  const updateHTML = (cmd: 'dark' | 'light') => {
    const root = document.querySelector('html');
    if (!root) return;
    if (cmd === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }


  useEffect(() => {
    setInitialLoad(false);

    if (!localStorage.theme) {
      localStorage.theme = 'system';
    }

    const savedTheme = THEMES.findIndex(theme => theme.title == localStorage.theme);

    if (localStorage.theme && savedTheme > -1) {
      setTheme(savedTheme);
    }

    function handleColorSchemeChange() {
      if (themeInfo?.title == 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateHTML('dark');
      } else {
        updateHTML('light');
      }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleColorSchemeChange)

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleColorSchemeChange);
    }
  }, []);

  useEffect(() => {
    const themeName = initialLoad ? localStorage.theme : (themeInfo?.title ?? '');

    if (themeName) {
      localStorage.theme = themeName;
    }

    if (themeName == 'dark' || themeName == 'light') {
      updateHTML(themeName);
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        updateHTML('dark');
      } else {
        updateHTML('light');
      }
    }
  }, [theme]);

  if (!themeInfo) return null;

  return (
    <button
      type="button"
      aria-label={`Change theme to ${THEMES[(theme + 1) % THEMES.length].title}`}
      onClick={() => setTheme(theme + 1)}
      onMouseOver={() => setShowTheme(true)}
      onMouseOut={() => setShowTheme(false)}
      className={`relative rounded-full cursor-pointer`}
    >
      <div className='grid place-items-center h-8 w-8 rounded-full' >
        {themeInfo.icon}
      </div>
      <p className={`absolute rounded-md top-[150%] left-1/2 -translate-x-1/2 w-auto bg-black text-white p-2 ${showTheme ? 'opacity-1' : 'opacity-0'} transition-opacity duration-200`}>
        {themeInfo.title}
      </p>
    </button>
  )
}
