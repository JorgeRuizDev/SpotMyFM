import React from "react";
import SimplePlaylistCard from "./SimplePlaylistCard";
import { render } from "@testing-library/react";

describe("<SimplePlaylistCard />", () => {
  test("Renders the component", () => {
    const component = render(<SimplePlaylistCard />);
  });
});
