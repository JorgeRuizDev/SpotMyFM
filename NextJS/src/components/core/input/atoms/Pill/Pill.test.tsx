import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Pill from "./Pill";

describe("<Pill />", () => {
  test("Renders the component", () => {
    const closeFn = jest.fn();
    const component = render(
      <Pill onClose={closeFn} type={""}>
        Test
      </Pill>
    );

    const btn = component.getByText("Test");

    fireEvent.click(btn);

    expect(closeFn).toBeCalled();
  });
});
