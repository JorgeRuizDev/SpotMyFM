import React from "react";
import TrackPillFilters from "./TrackPillFilters";
import { render } from "@testing-library/react";

describe("<TrackPillFilters />", () => {
  test("Renders the component", () => {
    const component = render(
      <TrackPillFilters
        albums={[]}
        artists={[]}
        setFilteredTracks={jest.fn}
        tracks={[]}
      />
    );
  });
});
