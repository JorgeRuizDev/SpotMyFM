import React from "react";
import PlaylistView from "./PlaylistView";
import { render } from "@testing-library/react";

describe("<PlaylistView />", () => {
  test("Renders the component", () => {
    const component = render(<PlaylistView />);
  });
});
