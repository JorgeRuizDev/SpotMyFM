import React from "react";
import SpotifyPlayer from "./SpotifyPlayer";
import { render } from "@testing-library/react";

describe("<SpotifyPlayer />", () => {
  test("Renders the component", () => {
    const component = render(<SpotifyPlayer />);
  });
});
