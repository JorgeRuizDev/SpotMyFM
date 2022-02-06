import React from "react";
import SearchPage from "./SearchPage";
import { render } from "@testing-library/react";

describe("<SearchPage />", () => {
  test("Renders the component", () => {
    const component = render(<SearchPage />);
  });
});
