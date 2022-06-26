import React from "react";
import ArtistView from "./ArtistView";
import { render } from "@testing-library/react";

describe("<ArtistView />", () => {
  test("Renders the component", () => {
    const component = render(<ArtistView artists={[]} />);
  });
});
