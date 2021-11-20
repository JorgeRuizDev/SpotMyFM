import React from "react";
import TrackSelectorView from "./TrackSelectorView";
import { render } from "@testing-library/react";

describe("<TrackSelectorView />", () => {
  test("Renders the component", () => {
    const component = render(<TrackSelectorView />);
  });
});
