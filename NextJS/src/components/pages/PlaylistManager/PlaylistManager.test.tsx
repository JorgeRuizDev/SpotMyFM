import React from "react";
import PlaylistManager from "./PlaylistManager";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<PlaylistManager />", () => {
  test("Renders the component", () => {
    const component = render(<ReusableProvider><PlaylistManager /></ReusableProvider>);
  });
});
