import { render, screen } from "../test-utils";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
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

  return {
    props,
    user,
    ...render(
      <MockedProvider mocks={mocks}>
        <CountryPane {...props} />
      </MockedProvider>,
    ),
  };
};

describe("<CountryPane />", () => {
  it("renders a figure, a header and a paragraph", async () => {
    getComponent();
    expect(await screen.findByAltText("Countryside")).toBeDefined();
    expect(
      await screen.findByRole("heading", { name: "Italy (IT)" }),
    ).toBeDefined();
    expect(
      await screen.findByText(
        "A beautiful little country with a lot of countryside locations.",
      ),
    ).toBeDefined();
  });
});
