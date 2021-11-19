import React from "react";
import TrackView from "./TrackView";
import { render } from "@testing-library/react";

describe("<TrackView />", () => {
  test("Renders the component", () => {
    const component = render(<TrackView />);
  });
});
