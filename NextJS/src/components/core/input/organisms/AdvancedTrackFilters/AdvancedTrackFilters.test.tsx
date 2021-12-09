import React from "react";
import AdvancedTrackFilters from "./AdvancedTrackFilters";
import { render } from "@testing-library/react";

describe("<AdvancedTrackFilters />", () => {
  test("Renders the component", () => {
    const component = render(
      <AdvancedTrackFilters tracks={[]} setFilteredTracks={jest.fn} />
    );
  });
});
