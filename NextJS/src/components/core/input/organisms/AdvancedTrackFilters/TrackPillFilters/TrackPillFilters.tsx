import PillSearch, {
  IPillFilter,
} from "components/core/input/molecules/PillSearch/PillSearch";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Styled from "./TrackPillFilters.styles";
import Ms from "styles/Miscellaneous";
import { filterByPill } from "util/filters/filterByPill";
interface ITrackPillFiltersProps {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  setFilteredTracks: (tracks: Track[]) => void;
}

/**
 * Saves in a state (setFunction) the filtered items from a "Pill Search"
 *
 * @param {Set<string>} items Items to save
 * @param {boolean} isAnd Flag that identifies if the query must contain ANY or ALL of the items
 * @param {((x: IPillFilter | undefined) => void)} setFunction setState that saves Undefined / a set with the items
 */
export function setFiltered(
  items: Set<string>,
  isAnd: boolean,
  setFunction: (x: IPillFilter | undefined) => void
) {
  items.size === 0 ? setFunction(undefined) : setFunction({ items, isAnd });
}

function TrackPillFilters({
  tracks,
  albums,
  artists,
  setFilteredTracks,
}: ITrackPillFiltersProps) {
  // Stats to list in pills:
  const [lastTags, setLastTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [trackGenres, setTrackGenres] = useState<string[]>([]);
  const [artistGenres, setArtistGenres] = useState<string[]>([]);

  // Pill states - If undefined, no pills selected
  const [filteredLastTags, setFilteredLastTags] = useState<IPillFilter>();
  const [filteredArtistGenres, setFilteredArtistGenres] =
    useState<IPillFilter>();
  const [filteredArtists, setFilteredArtists] = useState<IPillFilter>();
  const [filteredMyAlbumTags, setFilteredMyAlbumTags] = useState<IPillFilter>();
  const [filteredTrackGenres, setFilteredTrackGenres] = useState<IPillFilter>();

  // Get the tracks genres:
  useEffect(() => {
    setTrackGenres(tracks.flatMap((t) => t.genres || []));
  }, [tracks]);

  // Get the album tags (LastFM + Custom):
  useEffect(() => {
    setLastTags(albums.flatMap((a) => a.lastfmTagsNames));
    setCustomTags(albums.flatMap((a) => a.albumTags));
  }, [albums]);

  // Get the artist genres:
  useEffect(() => {
    setArtistGenres(artists.flatMap((a) => a.spotifyGenres || []));
  }, [artists]);
  debugger;
  /**
   * Filter the tracks by using the pill selected items and storing the filtered tracks inside setFilteredTracks()
   */
  const filter = useCallback(() => {
    const byLastTags = tracks.filter((t) =>
      filterByPill(t.album?.lastfmTagsNames || [], filteredLastTags)
    );

    const byArtistGenre = tracks.filter((t) =>
      filterByPill(
        t.artists.flatMap((a) => a.spotifyGenres || []),
        filteredArtistGenres
      )
    );

    const filtered = Array.from(new Set([...byArtistGenre, ...byLastTags]))
      // By Artist:
      .filter((t) =>
        filterByPill(
          t.artists.flatMap((a) => a.name),
          filteredArtists
        )
      )
      // By user's album tags:
      .filter((t) =>
        filterByPill(t.album?.albumTags || [], filteredMyAlbumTags)
      )
      // By Track Genres
      .filter((t) => filterByPill(t.genres || [], filteredTrackGenres));

    console.log(filtered);
    setFilteredTracks(filtered);
  }, [
    filteredArtistGenres,
    filteredArtists,
    filteredLastTags,
    filteredMyAlbumTags,
    filteredTrackGenres,
    setFilteredTracks,
    tracks,
  ]);

  // On filter change: Update the tracks
  useEffect(filter, [filter]);

  return (
    <>
      <PillSearch
        title={<h4>🏷 Filter by LastFM Tags:</h4>}
        type={"tag"}
        items={lastTags}
        examplePill={"Example: Russian War Songs"}
        setFilteredItems={setFilteredLastTags}
      />

      <PillSearch
        title={<h4>💽Filter by Artist Genres:</h4>}
        type={"genre"}
        examplePill={"Example: Minecraft Ambient"}
        items={artistGenres}
        setFilteredItems={setFilteredArtistGenres}
      />
      <p>Note: Includes at least one of the LastFM Tags or Genres.</p>

      <PillSearch
        title={<h4>🎸Filter by Track Genres:</h4>}
        type={"genre"}
        examplePill={"Example: Ambient"}
        items={trackGenres}
        setFilteredItems={setFilteredTrackGenres}
      />
      <p>Note: Includes at least one of the LastFM Tags or Genres.</p>

      <PillSearch
        title={<h4>💚 Filter by MySpotifyFM Album Tags:</h4>}
        type={"MySpotifyFmTags"}
        examplePill={"Example: To Listen"}
        items={customTags}
        setFilteredItems={setFilteredMyAlbumTags}
      />

      <PillSearch
        title={<h4>👨‍🎤 Filter by Artist:</h4>}
        type={"artist"}
        examplePill={"Example: Bowie"}
        items={useMemo(() => artists.map((a) => a.name), [artists])}
        setFilteredItems={setFilteredArtists}
      />
    </>
  );
}

export default React.memo(TrackPillFilters);
