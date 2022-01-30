import React from "react";
import SettingsMenu from "./SettingsMenu";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<SettingsMenu />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <SettingsMenu />
      </ReusableProvider>
    );
  });
});
