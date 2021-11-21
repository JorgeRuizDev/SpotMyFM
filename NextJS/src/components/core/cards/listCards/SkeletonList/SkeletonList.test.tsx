import React from "react";
import SkelletonList from "./SkeletonList";
import { render } from "@testing-library/react";

describe("<SkelletonList />", () => {
  test("Renders the component", () => {
    const component = render(<SkelletonList />);
  });
});
