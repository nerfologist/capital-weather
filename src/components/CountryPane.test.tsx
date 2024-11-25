import { render, screen } from "../test-utils";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import CountryPane from "./CountryPane";

type CountryPaneProps = React.ComponentProps<typeof CountryPane>;

const DEFAULT_PROPS: Readonly<CountryPaneProps> = {};

const getComponent = (propsOverrides: Partial<CountryPaneProps> = {}) => {
  const user = userEvent.setup();
  const props = {
    ...DEFAULT_PROPS,
    ...propsOverrides,
  };

  return {
    props,
    user,
    ...render(<CountryPane {...props} />),
  };
};

describe("<CountryPane />", () => {
  it("renders a figure, a header and a paragraph", () => {
    getComponent();
    expect(screen.getByAltText("Countryside")).toBeDefined();
    expect(screen.getByRole("heading", { name: "The Shire" })).toBeDefined();
    expect(
      screen.getByText(
        "A beautiful little country with a lot of countryside locations.",
      ),
    ).toBeDefined();
  });
});
