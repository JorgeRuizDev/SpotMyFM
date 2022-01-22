import React from "react";
import AlbumManager from "./AlbumManager";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<AlbumManager />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
        <AlbumManager />
      </ReusableProvider>
    );
  });
});
