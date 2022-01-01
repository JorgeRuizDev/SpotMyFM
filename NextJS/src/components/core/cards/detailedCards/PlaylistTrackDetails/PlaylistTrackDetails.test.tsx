import React from "react";
import PlaylistTrackDetails from "./PlaylistTrackDetails";
import { render } from "@testing-library/react";

describe("<PlaylistTrackDetails />", () => {
  test("Renders the component", () => {
    const component = render(<PlaylistTrackDetails />);
  });
});
