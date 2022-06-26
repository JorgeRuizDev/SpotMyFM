import React from "react";
import PhoneMenu from "./PhoneMenu";
import { render } from "@testing-library/react";

describe("<PhoneMenu />", () => {
  test("Renders the component", () => {
    const component = render(<PhoneMenu />);
  });
});
