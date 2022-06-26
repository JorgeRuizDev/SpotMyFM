import React from "react";
import PromptAreYouSure from "./PromptAreYouSure";
import { render } from "@testing-library/react";

describe("<PromptAreYouSure />", () => {
  test("Renders the component", () => {
    const component = render(<PromptAreYouSure />);
  });
});
