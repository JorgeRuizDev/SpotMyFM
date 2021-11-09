import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { render } from "@testing-library/react";

describe("<ProtectedRoute />", () => {
  test("Renders the component", () => {
    const component = render(<ProtectedRoute />);
  });
});
