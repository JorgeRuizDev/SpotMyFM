import React from "react";
import PlaylistTrackDetails from "./PlaylistTrackDetails";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<PlaylistTrackDetails />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <PlaylistTrackDetails setPlaylist={jest.fn} />
      </ReusableProvider>
    );
  });
});
