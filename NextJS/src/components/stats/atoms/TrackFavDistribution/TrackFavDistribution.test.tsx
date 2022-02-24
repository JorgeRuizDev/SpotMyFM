import React from "react";
import TrackFavDistribution from "./TrackFavDistribution";
import { render } from "@testing-library/react";

describe("<TrackFavDistribution />", () => {
  test("Renders the component", () => {
    const component = render(<TrackFavDistribution tracks={[]} years={[]} />);
  });
});
