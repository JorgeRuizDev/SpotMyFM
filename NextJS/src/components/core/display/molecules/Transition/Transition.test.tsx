import React from "react";
import Transition from "./Transition";
import { render } from "@testing-library/react";

describe("<Transition />", () => {
  test("Renders the component", () => {
    const component = render(<Transition show={false} />);
  });
});
