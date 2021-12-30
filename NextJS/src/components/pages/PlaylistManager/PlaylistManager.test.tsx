import React from "react";
import PlaylistManager from "./PlaylistManager";
import { render } from "@testing-library/react";

describe("<PlaylistManager />", () => {
  test("Renders the component", () => {
    const component = render(<PlaylistManager />);
  });
});
