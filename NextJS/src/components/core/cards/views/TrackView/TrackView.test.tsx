import { render } from "@testing-library/react";
import React from "react";
import TrackView from "./TrackView";

describe("<TrackView />", () => {
  test("Renders the component", () => {
    const component = render(<TrackView tracks={[]} />);
  });
});
