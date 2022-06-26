import React from "react";
import CachingInProgress from "./CachingInProgress";
import { render } from "@testing-library/react";

describe("<CachingInProgress />", () => {
  test("Renders the component", () => {
    const component = render(<CachingInProgress />);
  });
});
