import React from "react";
import TrackIntervalFilters from "./TrackIntervalFilters";
import { render } from "@testing-library/react";

describe("<TrackIntervalFilters />", () => {
  test("Renders the component", () => {
    const component = render(
      <TrackIntervalFilters
        tracks={[]}
        albums={[]}
        artists={[]}
        setFilteredTracks={jest.fn}
      />
    );
  });
});
