import React from "react";
import LocaleSelector from "./LocaleSelector";
import { render } from "@testing-library/react";

describe("<LocaleSelector />", () => {
  test("Renders the component", () => {
    const component = render(<LocaleSelector />);
  });
});
