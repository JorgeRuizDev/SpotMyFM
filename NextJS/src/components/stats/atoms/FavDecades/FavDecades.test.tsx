import React from "react";
import FavDecades from "./FavDecades";
import { render } from "@testing-library/react";

describe("<FavDecades />", () => {
  test("Renders the component", () => {
    const component = render(<FavDecades albums={[]} tracks={[]}/>);
  });
});
