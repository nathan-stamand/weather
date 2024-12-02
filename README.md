# Weather App

## Planning

This should be a Single Page Application, that pulls weather information from a
public API and displays it for the user.

### Features

- [x] Search (with autocomplete)
- [x] Preference Settings
  - [x] Celsius / Fahrenheit
  - [x] Kilometers / Miles
- [x] Day Modules
- [x] Forecast Chart
- [ ] Location Tabs

## Main Libraries and Frameworks

As far as I know, these libraries are all stable (and widely used). I
labored over "the line" between trying to roll my own version of everything and
installing a library. In the end, I decided to use these, as well as their
dependencies, for the sake of illustrating how I would actually build.

- **React & Typescript** to keep things modular and type-safe.
- **Vite** for quick and easy compiling of the app during development. Stable
and stays out of the way, with optional plugins if needed.
- **Tanstack Query** to cache the API's data client-side and manage updates to
the data.
- **shadcn (based on Radix) and Tailwind** helps generate quick, decent-looking
UI components that save me from hours of nitpicking styles and component
implementations. It's also a headless UI component library, allowing me to only
import what I use, and import it directly into my code *as* code.
- **zod** helps with runtime type-checking. It allows me to build a schema to
validate against objects, as well as a bunch of helper functions. Primarily
used in my env.ts file to validate my .env file, throwing an error if I'm
missing any environment variables (or if they're incorrectly formatted).
- **Font Awesome** is nice because I don't want to scramble around finding
SVG's, I want to focus on building. I use it in such a way that it tree-shakes
the icons I don't use out of the production build.

### Why didn't I use Axios or Moment, then?

tl;dr: I just didn't need that much functionality.

Frankly, I installed Axios almost immediately when I started this project. It's
easy to use, and also one of the more commonplace (and stable) utility
libraries I can think of. However, I realized pretty soon what I really needed
for this was just two things:

1. The ability to configure a global object, making fetches to the API relatively
pain-free and self-contained, and
2. Literally only the 'get' method

So, axios actually seemed a bit overkill for the value it would provide. Same
type of story with the Moment library. In my opinion, for the very cool value
it provides, I wasn't really formatting dates and times in a way that required
a ton of flexibility. Really nothing a couple of helper methods couldn't cover.

