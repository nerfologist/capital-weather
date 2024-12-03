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
) =>
  render(
    <MockedProvider mocks={mocks}>
      <Root />
    </MockedProvider>,
  );

describe("<App />", () => {
  it("renders a loading state while loading", async () => {
    renderApp();
    screen.getByText("Loading...");
  });

  it("renders retrieved countries in a simple menu", async () => {
    renderApp();
    await screen.findByRole("link", { name: /Italy/ });
    await screen.findByRole("link", { name: /Greece/ });
  });

  describe("when a network error occurs in the GraphQL query", () => {
    it("renders an error state with error details", async () => {
      renderApp({ mocks: [error] });
      await screen.findByText("Error: An error occurred");
    });
  });

  describe("runtime behavior", () => {
    it("supports searching for countries by name", async () => {
      renderApp();
      const searchBar = screen.getByPlaceholderText("Search");
      await userEvent.type(searchBar, "it");
      const aside = await screen.findByRole("complementary");
      await expect(
        within(aside).findByRole("link", { name: /Italy/ }),
      ).toBeDefined();
      await expect(
        within(aside).queryByRole("link", { name: /Greece/ }),
      ).toBeNull();
    });
  });
});
