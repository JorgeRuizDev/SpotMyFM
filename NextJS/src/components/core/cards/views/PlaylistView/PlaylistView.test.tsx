import React from "react";
import PlaylistView from "./PlaylistView";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<PlaylistView />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <PlaylistView playlists={[]} />
      </ReusableProvider>
    );
  });
});
