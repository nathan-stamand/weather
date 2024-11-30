import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useSettings } from "@/providers/settings";
import { Label } from "../ui/label";
import { titleCase } from "@/utils/title-case";

export const Settings = () => {
  const { updateSetting, settings } = useSettings();

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='ghost'>
            <FontAwesomeIcon icon={faGear} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="divide-y">
          {Object.keys(settings).map((settingName) => (
            <div className="flex justify-between items-center p-4">
              <Label
                htmlFor={`${settingName}-setting`}
                className={`p-2 rounded-lg ${!settings[settingName].value ? 'bg-primary text-white dark:text-black' : ''}`}
              >
                {titleCase(settings[settingName].default)}
              </Label>
              <Switch
                id={`${String(settingName)}-setting`}
                checked={Boolean(settings[settingName].value)}
                onCheckedChange={e => updateSetting(String(settingName), e)}
                className="data-[state=unchecked]:bg-primary"
              />
              <Label
                htmlFor={`${settingName}-setting`}
                className={`p-2 rounded-lg ${settings[settingName].value ? 'bg-primary text-white dark:text-black' : ''}`}
              >
                {titleCase(settingName)}
              </Label>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
