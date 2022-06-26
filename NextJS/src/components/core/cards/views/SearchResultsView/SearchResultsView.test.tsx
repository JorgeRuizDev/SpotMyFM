import React from "react";
import SearchResultsView from "./SearchResultsView";
import { render } from "@testing-library/react";

describe("<SearchResultsView />", () => {
  test("Renders the component", () => {
    const component = render(<SearchResultsView />);
  });
});
