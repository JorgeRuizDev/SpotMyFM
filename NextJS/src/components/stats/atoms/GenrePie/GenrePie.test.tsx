import React from "react";
import GenrePie from "./GenrePie";
import { render } from "@testing-library/react";

describe("<GenrePie />", () => {
  test("Renders the component", () => {
    const component = render(<GenrePie tracks={[]} years={[]} decades={[]} />);
  });
});
