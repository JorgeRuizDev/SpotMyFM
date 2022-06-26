import React from "react";
import UserSettings from "./UserSettings";
import { render } from "@testing-library/react";

describe("<UserSettings />", () => {
  test("Renders the component", () => {
    const component = render(<UserSettings />);
  });
});
