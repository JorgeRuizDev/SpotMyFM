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
import Collapsible from "components/core/display/atoms/Collapsible";
interface ITrackPillFiltersProps {
  tracks?: Track[];
  albums?: Album[];
  artists?: Artist[];
  setFilteredTracks?: (tracks: Track[]) => void;
  setFilteredAlbums?: (albums: Album[]) => void;
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
  setFilteredTracks = () => {},
  setFilteredAlbums = () => {},
}: ITrackPillFiltersProps) {
  // Stats to list in pills:
  const [lastTags, setLastTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [trackSubgenres, setTrackSubgenres] = useState<string[]>([]);
  const [trackMoods, setTrackMoods] = useState<string[]>([]);
  const [artistGenres, setArtistGenres] = useState<string[]>([]);

  // Pill states - If undefined, no pills selected
  const [filteredLastTags, setFilteredLastTags] = useState<IPillFilter>();
  const [filteredArtistGenres, setFilteredArtistGenres] =
    useState<IPillFilter>();
  const [filteredArtists, setFilteredArtists] = useState<IPillFilter>();
  const [filteredMyAlbumTags, setFilteredMyAlbumTags] = useState<IPillFilter>();
  const [filteredTrackSubgenres, setFilteredTrackSubgenres] =
    useState<IPillFilter>();
  const [filteredTrackMoods, setFilteredTrackMoods] = useState<IPillFilter>();

  // Get the tracks genres:
  useEffect(() => {
    tracks &&
      setTrackSubgenres(
        tracks.flatMap((t) => t.ludwigSubgenres?.map((s) => s.label) || [])
      );

    tracks &&
      setTrackMoods(
        tracks.flatMap((t) => t.ludwigMoods?.map((m) => m.label) || [])
      );

    albums && setLastTags(albums.flatMap((a) => a.lastfmTagsNames));
    albums && setCustomTags(albums.flatMap((a) => a.albumTags));
    artists && setArtistGenres(artists.flatMap((a) => a.spotifyGenres || []));
  }, [albums, artists, tracks]);

  /**
   * Filter the tracks by using the pill selected items and storing the filtered tracks inside setFilteredTracks()
   */
  const filterTracks = useCallback(() => {
    if (!tracks?.length) {
      return;
    }

    const filtered = tracks
      .filter((t) =>
        filterByPill(t.album?.lastfmTagsNames || [], filteredLastTags)
      )
      .filter((t) =>
        filterByPill(
          t.artists.flatMap((a) => a.spotifyGenres || []),
          filteredArtistGenres
        )
      )
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
      // By Track Subgenres
      .filter((t) =>
        filterByPill(
          t.ludwigSubgenres?.map((s) => s.label) || [],
          filteredTrackSubgenres
        )
      )
      // By Track Moods
      .filter((t) =>
        filterByPill(
          t.ludwigMoods
            ?.filter((s) => s.confidence > 0.5)
            .map((s) => s.label) || [],
          filteredTrackMoods
        )
      );

    setFilteredTracks(filtered);
  }, [
    filteredArtistGenres,
    filteredArtists,
    filteredLastTags,
    filteredMyAlbumTags,
    filteredTrackMoods,
    filteredTrackSubgenres,
    setFilteredTracks,
    tracks,
  ]);

  /**
   * Filter the tracks by using the pill selected items and storing the filtered tracks inside setFilteredTracks()
   */
  const filterAlbums = useCallback(() => {
    if (!albums?.length) {
      return;
    }

    const filtered = albums
      .filter((a) => filterByPill(a.lastfmTagsNames, filteredLastTags))
      .filter((a) =>
        filterByPill(
          a.artists.flatMap((a) => a.spotifyGenres || []),
          filteredArtistGenres
        )
      )
      // By Artist:
      .filter((a) =>
        filterByPill(
          a.artists.flatMap((a) => a.name),
          filteredArtists
        )
      )
      // By user's album tags:
      .filter((a) => filterByPill(a.albumTags || [], filteredMyAlbumTags));
    setFilteredAlbums(filtered);
  }, [
    albums,
    filteredArtistGenres,
    filteredArtists,
    filteredLastTags,
    filteredMyAlbumTags,
    setFilteredAlbums,
  ]);

  // On filter change: Update the tracks
  useEffect(() => {
    filterTracks();
    filterAlbums();
  }, [filterAlbums, filterTracks]);
  const artistsNames = useMemo(
    () => (artists || []).map((a) => a.name),
    [artists]
  );
  return (
    <>
      {albums && (
        <PillSearch
          title={<h4>🏷 Filter by LastFM Tags:</h4>}
          type={"tag"}
          items={lastTags}
          examplePill={"Example: Space"}
          setFilteredItems={setFilteredLastTags}
        />
      )}
      <Collapsible isOpenDefault={false}>
        {artists && (
          <>
            <PillSearch
              title={<h4>💽Filter by Artist Genres:</h4>}
              type={"genre"}
              examplePill={"Example: Minecraft Ambient"}
              items={artistGenres}
              setFilteredItems={setFilteredArtistGenres}
            />
            <p>Note: Includes at least one of the LastFM Tags or Genres.</p>
          </>
        )}
        {tracks && (
          <>
            <PillSearch
              title={<h4>🎸Filter by Track Subgenres:</h4>}
              type={"subgenre"}
              examplePill={"Example: Post Punk"}
              items={trackSubgenres}
              setFilteredItems={setFilteredTrackSubgenres}
            />
            <PillSearch
              title={<h4>🤗Filter by Track Moods:</h4>}
              type={"mood"}
              examplePill={"Example: Relaxed"}
              items={trackMoods}
              setFilteredItems={setFilteredTrackMoods}
            />
          </>
        )}
        {albums && (
          <PillSearch
            title={<h4>💚 Filter by SpotMyFM Album Tags:</h4>}
            type={"MySpotifyFmTags"}
            examplePill={"Example: To Listen"}
            items={customTags}
            setFilteredItems={setFilteredMyAlbumTags}
          />
        )}
        {artists && (
          <PillSearch
            title={<h4>👨‍🎤 Filter by Artist:</h4>}
            type={"artist"}
            examplePill={"Example: Bowie"}
            items={artistsNames}
            setFilteredItems={setFilteredArtists}
          />
        )}
      </Collapsible>
    </>
  );
}

export default React.memo(TrackPillFilters);
