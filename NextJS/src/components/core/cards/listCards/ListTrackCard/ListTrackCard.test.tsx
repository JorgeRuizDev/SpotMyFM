import React from "react";
import ListTrackCard from "./ListTrackCard";
import { render } from "@testing-library/react";

describe("<ListTrackCard />", () => {
  test("Renders the component", () => {
    const component = render(<ListTrackCard />);
  });
});
