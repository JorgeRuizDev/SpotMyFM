import React from "react";
import SpotifyPlayer from "./SpotifyPlayer";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<SpotifyPlayer />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <SpotifyPlayer />
      </ReusableProvider>
    );
  });
});
