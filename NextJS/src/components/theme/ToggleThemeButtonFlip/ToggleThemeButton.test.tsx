import ToggleThemeButtonFlip from "./ToggleThemeButtonFlip";

import React from "react";
import { fireEvent, render } from "@testing-library/react";

describe("<ToggleThemeButtonFlip />", () => {
  test("Renders a button", () => {
    const component = render(<ToggleThemeButtonFlip />);
    const btn = component.getByLabelText("Theme Button");
  });
});
