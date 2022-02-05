import React from "react";
import ArtistCompleteDetails from "./ArtistCompleteDetails";
import { render } from "@testing-library/react";

describe("<ArtistCompleteDetails />", () => {
  test("Renders the component", () => {
    const component = render(<ArtistCompleteDetails />);
  });
});
