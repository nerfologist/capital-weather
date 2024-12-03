# CapitalWeather app
⛈️  Example of a simple app written in Vite, TypeScript and React, which uses data
from a GraphQL API and a REST API.

## Starting the dev server
- Clone this repository
- Enter the project's root directory (default: `cd ./capital-weather`)
- Run `npm install` to install dependencies
- Get an OpenWeather API key ([sign up page](https://home.openweathermap.org/users/sign_up))
- Set up your .env.local file from the sample file:
    - `mv .env.local.example .env.local`
- Copy your new OpenWeather API key in your `.env.local` file
- Run `npm run start`
- Navigate to `http://localhost:5173`

## Running the test suite
- Run `npm run test`

## Overview of the project
This project is a simple Single Page Application developed using a sample of
popular technologies used in modern-day web development:

- [Vite](https://vite.dev/) – a fast ECMAScript compiler/hot module replacement client providing lazy
  loading of modules, tree-shaking and code splitting
- [TypeScript](https://www.typescriptlang.org/) – a superset of ECMAScript with syntax for types
- [React](https://react.dev/) – the current bleeding edge library for front-end development
- [Apollo](https://www.apollographql.com/) – popular GraphQL client
- [Tanstack-Query](https://tanstack.com/query/v3/) – popular querying library
- [React-Router](https://reactrouter.com/) v7 – popular client-side routing library
- [Tailwind](https://tailwindcss.com/) – collection of utility CSS classes used to make the development of
  front-end technologies massively more convenient
- [DaisyUI](https://daisyui.com/) – UI components built on top of Tailwind, with a focus on
  responsiveness and ergonomics

## Other libraries used
- [Vitest](https://vitest.dev/) – the testing companion to Vite. Excellent test runner which closely
  mirrors the configuration of the main Vite app
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) – the most popular React testing library
- [nock](https://github.com/nock/nock) – Good library for network-level mocking and expectations

## Overall architecture
This project is a SPA which renders a simple layout on the client side,
depending on the user's device viewport.

Mobile devices will see a hamburger menu which, when clicked, will open a drawer
on the left side of the screen. The drawer contains a list of country, which is
also searchable via the search box at the top.

Devices having a wider viewport will see a 2-column layout. On the left side of
the screen, the user will see a list of countries fetched from the Countries
API.

Clicking one of the countries will display a card with country-specific
information on the right side, including the name of the capital city, the
coordinates (latitude and longitude), and the weather in the country's capital.

## Next steps
- Enhance the testing layer using the [MSW](https://mswjs.io/) network testing framework
- Improve the loading and error states
- Increase the quantity of information displayed in the country's card
