import React from "react";
import FilterButton from "./FilterButton";
import { render } from "@testing-library/react";

describe("<FilterButton />", () => {
  test("Renders the component", () => {
    const component = render(
      <FilterButton
        onFilter={() => {}}
        onReset={() => {}}
        disableFilter={false}
      />
    );
  });
});
