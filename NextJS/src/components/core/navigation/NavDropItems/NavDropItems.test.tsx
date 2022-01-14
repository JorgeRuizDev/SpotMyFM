import React from "react";
import NavDropItems from "./NavDropItems";
import { render } from "@testing-library/react";

describe("<NavDropItems />", () => {
  test("Renders the component", () => {
    const component = render(<NavDropItems />);
  });
});
