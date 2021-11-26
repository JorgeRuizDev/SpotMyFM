import { render } from "@testing-library/react";
import React from "react";
import GenericCardView from "./GenericCardView";

describe("<GenericCardView />", () => {
  test("Renders the component", () => {
    const component = render(
      <GenericCardView isLoading={true}>
        <h1>Lorem</h1>
        <h2>Ipsum</h2>
      </GenericCardView>
    );

    expect(component.getByText("Lorem"));

    component.rerender(
      <GenericCardView isLoading={false}>
        <h1>Lorem</h1>
        <h2>Ipsum</h2>
      </GenericCardView>
    );

    expect(component.getByText("Lorem"));
  });
});
