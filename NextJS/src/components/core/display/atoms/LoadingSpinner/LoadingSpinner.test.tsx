import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { render } from "@testing-library/react";

describe("<LoadingSpinner />", () => {
  test("Renders the component", () => {
    const component = render(<LoadingSpinner />);
  });
});
