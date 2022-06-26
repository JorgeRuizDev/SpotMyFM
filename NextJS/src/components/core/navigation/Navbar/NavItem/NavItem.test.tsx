import React from "react";
import NavItem from "./NavItem";
import { render } from "@testing-library/react";

describe("<NavItem />", () => {
  test("Renders the component", () => {
    const component = render(<NavItem isActive={false} item="" label="" />);
  });
});
