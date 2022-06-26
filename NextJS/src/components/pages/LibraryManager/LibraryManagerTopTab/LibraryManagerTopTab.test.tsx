import React from "react";
import LibraryManagerTopTab from "./LibraryManagerTopTab";
import { render } from "@testing-library/react";

describe("<LibraryManagerTopTab />", () => {
  test("Renders the component", () => {
    const component = render(
      <LibraryManagerTopTab
        cachedTracks={[]}
        setIsLoading={jest.fn}
        setTracks={jest.fn}
      />
    );
  });
});
