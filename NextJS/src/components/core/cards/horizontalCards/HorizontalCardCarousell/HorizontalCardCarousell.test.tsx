import React from "react";
import HorizontalCardCarousell from "./HorizontalCardCarousell";
import { render } from "@testing-library/react";

describe("<HorizontalCardCarousell />", () => {
  test("Renders the component", () => {
    const component = render(
      <HorizontalCardCarousell>{[]}</HorizontalCardCarousell>
    );
  });
});
