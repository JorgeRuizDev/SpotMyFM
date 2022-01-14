import React from "react";
import AlbumTracksView from "./AlbumTracksView";
import { render } from "@testing-library/react";

describe("<AlbumTracksView />", () => {
  test("Renders the component", () => {
    const component = render(
      <AlbumTracksView
        album={{
          albumTags: [],
          artists: [],
          lastfmTagsNames: [],
          name: "",
          spotifyArtistsIds: [],
          spotifyCoverUrl: [],
          spotifyCovers: [],
          spotifyGenres: [],
          spotifyId: "",
          spotifyPopularity: 0,
          spotifyUri: "",
          spotifyUrl: "",
          type: "",
          allAlbumTags: [],
        }}
      />
    );
  });
});
