import React from "react";
import BottomNavbar from "./BottomNavbar";
import { render } from "@testing-library/react";

describe("<BottomNavbar />", () => {
  test("Renders the component", () => {
    const component = render(<BottomNavbar />);
  });
});
