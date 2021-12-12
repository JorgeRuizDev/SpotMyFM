import React from "react";
import { ListArtistCard, ListArtistCardHeader } from "./ListArtistCard";
import { render } from "@testing-library/react";

describe("<ListArtistCard />", () => {
  test("Renders the component", () => {
    const component = render(
      <ListArtistCard
        artist={{
          name: "",
          spotifyId: "",
          spotifyUri: "",
          spotifyUrl: "",
          type: "",
        }}
      />
    );
  });

  test("Renders the header", () => {
    const component = render(<ListArtistCardHeader />);
  });
});
