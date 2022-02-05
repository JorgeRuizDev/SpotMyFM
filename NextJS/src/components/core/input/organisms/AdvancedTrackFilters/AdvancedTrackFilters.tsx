import Collapsible from "components/core/display/atoms/Collapsible";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import React, { useEffect, useState } from "react";

import Text from "styles/Text";
import { BsSliders } from "react-icons/bs";
import Styled from "./AdvancedTrackFilters.styles";
import TrackIntervalFilters from "./TrackIntervalFilters";
import TrackPillFilters from "./TrackPillFilters";
import { FaMusic } from "react-icons/fa";
interface IAdvancedTrackFiltersProps {
  tracks?: Track[];
  albums?: Album[];
  setFilteredTracks?(tracks: Track[]): void;
  setFilteredAlbums?(albums: Album[]): void;
}

function AdvancedTrackFilters({
  tracks,
  albums,
  setFilteredTracks = () => {},
  setFilteredAlbums = () => {},
}: IAdvancedTrackFiltersProps) {
  // Default non-filtered items used as source
  const [artists, setArtists] = useState<Artist[]>([]);

  const [filteredPillTracks, setFilteredPillTracks] = useState<Track[]>(
    tracks || []
  );
  const [filteredIntervalTracks, setFilteredIntervalTracks] = useState<Track[]>(
    tracks || []
  );
  const [filteredPillAlbums, setFilteredPillAlbums] = useState<Album[]>(
    albums || []
  );
  const [filteredIntervalAlbums, setFilteredIntervalAlbums] = useState<Album[]>(
    albums || []
  );

  // Interval / Sliders

  // Get the current artists
  useEffect(() => {
    const artists = new Map<string, Artist>();
    tracks &&
      tracks
        .flatMap((t) => t.artists)
        .forEach((a) => artists.set(a.spotifyId, a));

    albums &&
      albums
        .flatMap((a) => a.artists)
        .forEach((a) => artists.set(a.spotifyId, a));

    setArtists(Array.from(artists.values()));
  }, [albums, tracks]);
  console.log(filteredPillAlbums)

  // Return the filtered interval as the filter results:
  useEffect(() => {
    setFilteredTracks(filteredIntervalTracks);
    setFilteredAlbums(filteredIntervalAlbums);
  }, [
    filteredIntervalTracks,
    setFilteredTracks,
    albums,
    setFilteredAlbums,
    filteredIntervalAlbums,
  ]);

  return (
    <Styled.Spacing>
      <Text.Column centered>
        <h3>
          <Text.Inline>
            <FaMusic /> <span>Filter by Exact Features</span>
          </Text.Inline>
        </h3>
        <p>
          Show the items that <Text.pGreen>contain one or more</Text.pGreen> of
          the following features
        </p>
      </Text.Column>

      <TrackPillFilters
        albums={albums}
        artists={artists}
        tracks={tracks}
        setFilteredTracks={setFilteredPillTracks}
        setFilteredAlbums={setFilteredPillAlbums}
      />

      <hr />
      <Text.Column centered>
        <h3>
          <Text.Inline>
            {" "}
            <BsSliders /> <span>Filter by Interval Features</span>
          </Text.Inline>
        </h3>
        <p>
          Show the items whose{" "}
          <Text.pGreen>features fall inside the selected interval</Text.pGreen>
        </p>
      </Text.Column>

      <TrackIntervalFilters
        tracks={filteredPillTracks}
        albums={filteredPillAlbums}
        artists={artists}
        setFilteredTracks={setFilteredIntervalTracks}
        setFilteredAlbums={setFilteredIntervalAlbums}
      />
    </Styled.Spacing>
  );
}

export default AdvancedTrackFilters;
