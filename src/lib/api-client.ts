import { env } from "@/env";

type ApiClientConfiguration = {
  baseUrl?: string;
  mode?: 'cors' | 'no-cors';
  headers?: HeadersConfig;
}

type HeadersConfig = {
  'Access-Control-Allow-Crossorigin'?: string,
  'Accept'?: string;
}

class ApiClient {
  public baseUrl;
  public mode;
  public headers;

  constructor({ baseUrl = '', mode = 'cors', headers = {} }: ApiClientConfiguration) {
    this.baseUrl = baseUrl;
    this.mode = mode;
    this.headers = headers;
  }

  private buildUrlWithParams(url = '', params: Record<string, any>) {
    // TODO: Add RegEx checking for an accurate full url, throw error if not a
    // viable URL.
    const urlIsRelative = url.startsWith('/');
    const fullUrl = urlIsRelative ? new URL(this.baseUrl + url) : new URL(url);
    for (const [key, value] of Object.entries(params)) {
      fullUrl.searchParams.set(key, String(value));
    }
    return fullUrl;
  }

  async get(url = '', params: Record<string, any>) {
    try {
      const urlWithParams = this.buildUrlWithParams(url, params);
      const response = await fetch(urlWithParams);
      const json = await response.json();
      if (response.status != 200 || (json && 'error' in json)) {
        if (import.meta.env.PROD) { // Check if production, show modest error if so...
          // TODO: Create notification system for these errors in production.
          console.error("Oops! Something went wrong. Please contact support.");
        } else {
          console.log('API Error: ', json.error?.message);
        }
      }
      return json;
    } catch (e) {
      throw Error('Error fetching data: ' + e);
    }
  }
}

const API_SETTINGS: ApiClientConfiguration = {
  baseUrl: env.WEATHER_BASE_URL,
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Crossorigin': env.WEATHER_DOMAIN,
    'Accept': 'application/json'
  }
}
export const api = new ApiClient(API_SETTINGS);
