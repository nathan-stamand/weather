export type Current = {
  location: Locale;
  current: CurrentWeather;
}
export type Forecast = Current & {
  forecast: { forecastday: ForecastDay[] };
}

export type Locale = {
  id: number;
  name: string;
  country: string;
  region: string;
  localtime: string;
  localtime_epoch: string;
}

export type CurrentWeather = {
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_dir: string;
  wind_degree: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_kph: number;
  gust_mph: number;
}

export type Condition = {
  text: string;
  icon: string;
}

export type ForecastDay = {
  date: string;
  day: Day;
  hour: Hour[];
  astro: Astro;
}

export type Day = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}

export type Hour = CurrentWeather & {
  will_it_rain: 0 | 1;
  chance_of_rain: number;
  will_it_snow: 0 | 1;
  chance_of_snow: number;
  formattedHour?: string;
  temperature: number;
  time: string;
}

export type Astro = {
  sunrise: string;
  sunset: string;
}

export type APIError = {
  error: {
    message: string;
  }
}
