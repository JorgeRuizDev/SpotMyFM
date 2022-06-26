import React from "react";
import InconsistentCacheMessage from "./InconsistentCacheMessage";
import { render } from "@testing-library/react";

describe("<InconsistentCacheMessage />", () => {
  test("Renders the component", () => {
    const component = render(<InconsistentCacheMessage onClick={() => {}} />);
  });
});
