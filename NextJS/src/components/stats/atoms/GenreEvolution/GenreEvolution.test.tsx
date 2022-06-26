import React from "react";
import GenreEvolution from "./GenreEvolution";
import { render } from "@testing-library/react";

describe("<GenreEvolution />", () => {
  test("Renders the component", () => {
    const component = render(<GenreEvolution tracks={[]} years={[]} />);
  });
});
