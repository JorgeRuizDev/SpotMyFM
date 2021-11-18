import React from "react";
import GenericCardView from "./GenericCardView";
import { render } from "@testing-library/react";

describe("<GenericCardView />", () => {
  test("Renders the component", () => {
    const component = render(<GenericCardView />);
  });
});
