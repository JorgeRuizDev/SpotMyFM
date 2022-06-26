import React from "react";
import PlaylistPublicFormat from "./PlaylistPublicFormat";
import { render } from "@testing-library/react";

describe("<PlaylistPublicFormat />", () => {
  test("Renders the component", () => {
    const component = render(<PlaylistPublicFormat />);
  });
});
