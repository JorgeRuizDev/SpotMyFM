import React from "react";
import NotificationRenderer from "./NotificationRenderer";
import { render } from "@testing-library/react";

describe("<NotificationRenderer />", () => {
  test("Renders the component", () => {
    const component = render(<NotificationRenderer />);
  });
});
