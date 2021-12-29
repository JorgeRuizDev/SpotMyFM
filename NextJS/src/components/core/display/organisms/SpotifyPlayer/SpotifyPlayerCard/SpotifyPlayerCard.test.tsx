import React from "react";
import SpotifyPlayerCard from "./SpotifyPlayerCard";
import { render } from "@testing-library/react";

describe("<SpotifyPlayerCard />", () => {
  test("Renders the component", () => {
    const component = render(<SpotifyPlayerCard />);
  });
});
