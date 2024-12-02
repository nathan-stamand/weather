import { ReactNode, useContext, createContext, useState, Dispatch, SetStateAction } from "react";

type Setting = {
  value: boolean;
  default: string;
}

const DEFAULT_SETTINGS: Record<string, Setting> = {
  fahrenheit: {
    value: window.localStorage.getItem('fahrenheit') !== 'false',
    default: 'celcius'
  },
  miles: {
    value: window.localStorage.getItem('miles') !== 'false',
    default: 'kilometers'
  },
}

type SettingsContext = {
  settings: typeof DEFAULT_SETTINGS;
  setSettings: Dispatch<SetStateAction<typeof DEFAULT_SETTINGS>>;
}

const Settings = createContext<SettingsContext>({
  settings: DEFAULT_SETTINGS,
  setSettings: () => { },
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  return (
    <Settings.Provider value={{ settings, setSettings }}>
      {children}
    </Settings.Provider>
  );
}


export const useSettings = () => {
  const { settings, setSettings } = useContext(Settings);

  const updateSetting = (setting: keyof typeof DEFAULT_SETTINGS | string, value: boolean) => {
    if (!(setting in DEFAULT_SETTINGS)) return;
    window.localStorage.setItem(setting, String(value));
    const settingObj = {
      [setting]: {
        value,
        default: settings[setting]['default']
      }
    };
    setSettings({ ...settings, ...settingObj });
  }

  return {
    settings,
    updateSetting,
  }
}
