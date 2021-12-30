import React from "react";
import LibraryManager from "./LibraryManager";
import { render } from "@testing-library/react";

describe("<LibraryManager />", () => {
  test("Renders the component", () => {
    const component = render(<LibraryManager />);
  });
});
