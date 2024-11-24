import { render, screen } from "./test-utils";
import { describe, it } from "vitest";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import App, { GET_COUNTRIES } from "./App";

const GET_COUNTRIES_REQUEST = {
      query: GET_COUNTRIES,
      variables: {},
    }

const success: MockedResponse = 
  {
    request: GET_COUNTRIES_REQUEST,
    result: {
      data: {
        countries: [{ name: "Italy", code: "IT" }, {name: "Greece", code: "GR"}],
      },
    },
  }

const error: MockedResponse = {
  request: GET_COUNTRIES_REQUEST,
  error: new Error("An error occurred")
}

const renderApp = (mocks: MockedResponse[]) =>
  render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );

describe("<App />", () => {
  it("renders a loading state while loading", async () => {
    renderApp([success]);
    screen.getByText("Loading...")
  });

  it("renders retrieved countries in a simple list", async () => {
    renderApp([success]);
    await screen.findByText("Italy")
    await screen.findByText("Greece")
  });

  describe("when a network error occurs in the GraphQL query", () => {
    it("renders an error state with error details", async () => {
      renderApp([error])
      await screen.findByText("Error: An error occurred")
    })
  })
});
