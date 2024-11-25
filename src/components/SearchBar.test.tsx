import { render, screen } from "../test-utils";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

type SearchBarProps = React.ComponentProps<typeof SearchBar>;

const DEFAULT_PROPS: SearchBarProps = {
  onChange: vi.fn(),
};

const getComponent = (propsOverrides: Partial<SearchBarProps> = {}) => {
  const user = userEvent.setup();
  const props = {
    ...DEFAULT_PROPS,
    ...propsOverrides,
  };

  return {
    props,
    user,
    ...render(<SearchBar {...props} />),
  };
};

describe("<SearchBar />", () => {
  it("renders a text input field", () => {
    getComponent();
    screen.getByPlaceholderText("Search");
  });

  describe("runtime behavior", () => {
    describe("entering text", () => {
      it("calls onChange", async () => {
        const { props, user } = getComponent();
        await user.type(screen.getByPlaceholderText("Search"), "Andorra");
        // called once for every letter of "Andorra"
        expect(props.onChange).toHaveBeenCalledTimes(7);
      });
    });
  });
});
