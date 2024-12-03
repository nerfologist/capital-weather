import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, screen, within } from "../test-utils";
import { GET_COUNTRIES } from "../graphql/queries";
import Root from "./Root";

const GET_COUNTRIES_REQUEST = {
  query: GET_COUNTRIES,
  variables: {},
};

const success: MockedResponse = {
  request: GET_COUNTRIES_REQUEST,
  result: {
    data: {
      countries: [
        { name: "Italy", capital: "Rome", code: "IT", emoji: "🇮🇹" },
        { name: "Greece", capital: "Athens", code: "GR", emoji: "🇬🇷" },
      ],
    },
  },
};

const error: MockedResponse = {
  request: GET_COUNTRIES_REQUEST,
  error: new Error("An error occurred"),
};

const renderApp = (
  { mocks }: { mocks: MockedResponse[] } = { mocks: [success] },
) => {
  const rendered = render(
    <MockedProvider mocks={mocks}>
      <Root />
    </MockedProvider>,
  );

  return {
    inMobile: within(screen.getByTestId("mobile-only")),
    inDesktop: within(screen.getByTestId("desktop-only")),
    ...rendered,
  };
};

describe("<App />", () => {
  it("renders a loading state while loading", async () => {
    const { inMobile, inDesktop } = renderApp();
    inMobile.getByText("Loading...");
    inDesktop.getByText("Loading...");
  });

  it("renders retrieved countries in a simple menu", async () => {
    const { inMobile, inDesktop } = renderApp();
    await inMobile.findByRole("link", {
      name: /Italy/,
    });
    await inMobile.findByRole("link", { name: /Greece/ });
    await inDesktop.findByRole("link", {
      name: /Italy/,
    });
    await inDesktop.findByRole("link", { name: /Greece/ });
  });

  describe("when a network error occurs in the GraphQL query", () => {
    it("renders an error state with error details", async () => {
      const { inMobile, inDesktop } = renderApp({ mocks: [error] });
      await inMobile.findByText("Error: An error occurred");
      await inDesktop.findByText("Error: An error occurred");
    });
  });

  describe("runtime behavior", () => {
    it("supports searching for countries by name", async () => {
      const { inDesktop } = renderApp();
      const mobileSearchBar = inDesktop.getByPlaceholderText("Search");
      await userEvent.type(mobileSearchBar, "it");
      const aside = await inDesktop.findByRole("complementary");
      await expect(
        within(aside).findByRole("link", { name: /Italy/ }),
      ).toBeDefined();
      await expect(
        within(aside).queryByRole("link", { name: /Greece/ }),
      ).toBeNull();
    });
  });
});
