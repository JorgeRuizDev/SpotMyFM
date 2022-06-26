import React from "react";
import SearchPage from "./SearchPage";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<SearchPage />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <SearchPage />
      </ReusableProvider>
    );
  });
});
