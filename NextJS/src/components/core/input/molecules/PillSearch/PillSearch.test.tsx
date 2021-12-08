import { render } from "@testing-library/react";
import React from "react";
import PillSearch from "./PillSearch";

describe("<PillSearch />", () => {
  test("Renders the component", () => {
    const component = render(
      <PillSearch
        items={["A", "B", "C", "D"]}
        title="This is a Title"
        type={"tag"}
        setFilteredItems={jest.fn()}
        examplePill="This is an example"
      />
    );

    component.getByText("This is an example");
    component.getByText("This is a Title");
  });
});
