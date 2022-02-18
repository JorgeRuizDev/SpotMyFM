import React from "react";
import ImageHead from "./ImageHead";
import { render } from "@testing-library/react";

describe("<ImageHead />", () => {
  test("Renders the component", () => {
    const component = render(<ImageHead />);
  });
});
