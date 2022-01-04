import React from "react";
import AlbumManager from "./AlbumManager";
import { render } from "@testing-library/react";

describe("<AlbumManager />", () => {
  test("Renders the component", () => {
    const component = render(<AlbumManager />);
  });
});
