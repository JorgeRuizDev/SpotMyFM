import React from "react";
import AlbumTracksView from "./AlbumTracksView";
import { render } from "@testing-library/react";
import { ReusableProvider } from "reusable";

describe("<AlbumTracksView />", () => {
  test("Renders the component", () => {
    const component = render(
      <ReusableProvider>
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
      </ReusableProvider>
    );
  });
});
