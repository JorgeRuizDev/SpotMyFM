import React from "react";
import Upload from "./Upload";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<Upload />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <Upload />
      </ReusableProvider>
    );
  });
});
