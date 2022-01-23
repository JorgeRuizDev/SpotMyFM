import React from "react";
import SettingsMenu from "./SettingsMenu";
import { render } from "@testing-library/react";

describe("<SettingsMenu />", () => {
  test("Renders the component", () => {
    const component = render(<SettingsMenu />);
  });
});
