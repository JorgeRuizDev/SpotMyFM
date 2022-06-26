import React from "react";
import SpotifyPlayerButton from "./SpotifyPlayerButton";
import { render } from "@testing-library/react";

describe("<SpotifyPlayerButton />", () => {
  test("Renders the component", () => {
    const component = render(<SpotifyPlayerButton />);
  });
});
