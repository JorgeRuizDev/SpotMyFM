import React from "react";
import SimpleArtistCard from "./SimpleArtistCard";
import { render } from "@testing-library/react";

describe("<SimpleArtistCard />", () => {
  test("Renders the component", () => {
    const component = render(
      <SimpleArtistCard
        artist={{
          name: "Billy",
          spotifyId: "",
          spotifyUri: "",
          spotifyUrl: "",
          type: "artist",
        }}
      />
    );
  });
});
