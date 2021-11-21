import React from "react";
import MultipleSkeletonList from "./MultipleSkeletonList";
import { render } from "@testing-library/react";

describe("<MultipleSkeletonList />", () => {
  test("Renders the component", () => {
    const component = render(<MultipleSkeletonList />);
  });
});
