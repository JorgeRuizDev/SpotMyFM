import React from "react";
import genericCardView from "./genericCardView";
import { render } from "@testing-library/react";

describe("<genericCardView />", () => {
  test("Renders the component", () => {
    const component = render(<genericCardView />);
  });
});
