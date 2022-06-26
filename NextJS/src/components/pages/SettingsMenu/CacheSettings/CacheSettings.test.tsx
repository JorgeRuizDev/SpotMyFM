import React from "react";
import CacheSettings from "./CacheSettings";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<CacheSettings />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <CacheSettings />
      </ReusableProvider>
    );
  });
});
