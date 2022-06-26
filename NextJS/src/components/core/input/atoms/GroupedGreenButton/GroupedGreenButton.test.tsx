import React from "react";
import GroupedGreenButton from "./GroupedGreenButton";
import { render } from "@testing-library/react";

describe("<GroupedGreenButton />", () => {
  test("Renders the component", () => {
    const component = render(<GroupedGreenButton buttons={[]} />);
  });
});
