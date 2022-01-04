import React from "react";
import AlbumView from "./AlbumView";
import { render } from "@testing-library/react";

describe("<AlbumView />", () => {
  test("Renders the component", () => {
    const component = render(<AlbumView />);
  });
});
