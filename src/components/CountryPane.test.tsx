import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import nock from "nock";
import { render, screen } from "../test-utils";
import { GET_COUNTRY } from "../graphql/queries";
import CountryPane from "./CountryPane";

type CountryPaneProps = React.ComponentProps<typeof CountryPane>;

const DEFAULT_PROPS: Readonly<CountryPaneProps> = {
  countryCode: "IT",
};

const GET_COUNTRY_REQUEST = {
  query: GET_COUNTRY,
  variables: { countryCode: "IT" },
};

const success: MockedResponse = {
  request: GET_COUNTRY_REQUEST,
  result: {
    data: {
      country: {
        name: "Italy",
        native: "Italia",
        capital: "Rome",
        emoji: "🇮🇹",
        currency: "EUR",
        languages: {
          code: "IT",
          name: "Italian",
        },
      },
    },
  },
};

const getComponent = (
  propsOverrides: Partial<CountryPaneProps> = {},
  mocks = [success],
) => {
  const user = userEvent.setup();
  const props = {
    ...DEFAULT_PROPS,
    ...propsOverrides,
  };
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const scope = nock("https://api.openweathermap.org")
    .get("/data/2.5/weather")
    .query({ q: "Rome,IT", appid: import.meta.env.VITE_OPENWEATHER_API_KEY })
    .reply(200, {
      coord: { lat: 10, lon: 20 },
      weather: [{ main: "cloudy", description: "some clouds here and there" }],
      main: { temp: 293.0, humidity: 45.0 },
    });

  return {
    props,
    scope,
    user,
    ...render(
      <MockedProvider mocks={mocks}>
        <QueryClientProvider client={client}>
          <CountryPane {...props} />
        </QueryClientProvider>
      </MockedProvider>,
    ),
  };
};

describe("<CountryPane />", () => {
  it.only("renders a figure, a header and a paragraph", async () => {
    const { scope } = getComponent();
    expect(
      await screen.findByRole("heading", { name: /italy/i }),
    ).toBeDefined();
    expect(
      await screen.findByText("The country's capital is Rome"),
    ).toBeDefined();
    expect(
      await screen.findByRole("listitem", {
        name: (_content, element) =>
          element?.textContent === "📍 Latitude: 10, Longitude: 20",
      }),
    ).toBeDefined();
    expect(
      await screen.findByRole("listitem", {
        name: (_content, element) =>
          element?.textContent ===
          "🌤️ Weather: cloudy (some clouds here and there)",
      }),
    ).toBeDefined();
    expect(
      await screen.findByRole("listitem", {
        name: (_content, element) =>
          element?.textContent === "🌡️ Temperature: 67.73°F (19.85°C)",
      }),
    ).toBeDefined();
    expect(
      await screen.findByRole("listitem", {
        name: (_content, element) =>
          element?.textContent === "💧 Humidity: 45%",
      }),
    ).toBeDefined();

    if (!scope.isDone()) {
      console.error(scope.pendingMocks());
    }
  });
});
