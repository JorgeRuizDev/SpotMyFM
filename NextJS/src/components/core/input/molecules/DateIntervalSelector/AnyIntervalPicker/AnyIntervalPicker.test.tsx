import { render } from "@testing-library/react";
import React from "react";
import AnyIntervalPicker from "./AnyIntervalPicker";

describe("<AnyIntervalPicker />", () => {
  test("Renders the component", () => {
    const mockFn = jest.fn();

    const component = render(
      <AnyIntervalPicker
        newestDate={new Date()}
        oldestDate={new Date()}
        setMax={mockFn}
        setMin={mockFn}
      />
    );
  });
});
