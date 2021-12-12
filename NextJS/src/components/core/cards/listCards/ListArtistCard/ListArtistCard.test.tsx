import React from "react";
import ListArtistCard from "./ListArtistCard";
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
});
