import React from "react";
import LudwigDropZone from "./LudwigDropZone";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<LudwigDropZone />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <LudwigDropZone />
      </ReusableProvider>
    );
  });
});
