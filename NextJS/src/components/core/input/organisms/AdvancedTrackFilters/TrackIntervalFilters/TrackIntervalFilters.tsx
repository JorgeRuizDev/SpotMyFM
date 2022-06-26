import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import Styled from "./TrackIntervalFilters.styles";
import Ms from "styles/Miscellaneous";
import React, { useCallback, useEffect, useState } from "react";
import DateIntervalSelector from "components/core/input/molecules/DateIntervalSelector";
import PopularitySelector from "components/core/input/molecules/PopularitySelector";
import {
  IInterval,
  albumReleaseDateFilter,
  spotifyPopularityFilter,
  trackLengthIntervalFilter,
} from "util/filters/intervalFilters";
import TrackLengthIntervalSelector from "components/core/input/molecules/TrackLengthIntervalSelector";
import Collapsible from "components/core/display/atoms/Collapsible";
interface ITrackIntervalFiltersProps {
  tracks?: Track[];
  albums?: Album[];
  artists?: Artist[];
  setFilteredTracks?: (tracks: Track[]) => void;
  setFilteredAlbums?: (albums: Album[]) => void;
}

function TrackIntervalFilters({
  tracks,
  albums,
  artists,
  setFilteredTracks = () => {},
  setFilteredAlbums = () => {},
}: ITrackIntervalFiltersProps) {
  // State that stores the
  const [releaseInterval, setReleaseInterval] = useState<IInterval<Date>>({
    low: new Date(),
    top: new Date(),
  });

  // State that stores the track duration interval
  const [durationInterval, setDurationInterval] = useState<IInterval<number>>({
    low: 0,
    top: Number.MAX_SAFE_INTEGER,
  });

  // State that stores the Artist popularity interval [0 - 100]
  const [trackPopularityInterval, setTrackPopularityInterval] = useState<
    IInterval<number>
  >({ low: 0, top: 100 });

  // State that stores the Artist popularity interval [0 - 100]
  const [artistPopularityInterval, setArtistPopularityInterval] = useState<
    IInterval<number>
  >({ low: 0, top: 100 });

  // State that stores the album popularity interval [0 - 100]
  const [albumPopularityInterval, setAlbumPopularityInterval] = useState<
    IInterval<number>
  >({ low: 0, top: 100 });

  const filterTracks = useCallback(() => {
    if (!tracks || tracks.length === 0) {
      return;
    }

    const filtered = tracks
      // Filter by Track Length
      .filter((t) => trackLengthIntervalFilter(t, durationInterval))
      // Filter by Track Release Date
      .filter(
        (t) =>
          (t.album && albumReleaseDateFilter(t.album, releaseInterval)) || false
      )
      // Track Popularity
      .filter((t) => spotifyPopularityFilter(t, trackPopularityInterval))
      // Album Popularity
      .filter((t) =>
        t.album
          ? spotifyPopularityFilter(t.album, albumPopularityInterval)
          : true
      )
      // Artist Popularity
      .filter((t) =>
        t.artists?.[0]
          ? spotifyPopularityFilter(t.artists[0], artistPopularityInterval)
          : true
      );

    setFilteredTracks(filtered);
  }, [
    albumPopularityInterval,
    artistPopularityInterval,
    trackPopularityInterval,
    durationInterval,
    releaseInterval,
    setFilteredTracks,
    tracks,
  ]);

  const filterAlbums = useCallback(() => {
    if (!albums || albums.length === 0) {
      return;
    }

    const filtered = albums

      // Filter by Track Release Date
      .filter((a) => albumReleaseDateFilter(a, releaseInterval) || false)

      // Album Popularity
      .filter((a) =>
        a ? spotifyPopularityFilter(a, albumPopularityInterval) : true
      )
      // Artist Popularity
      .filter((a) =>
        a.artists?.[0]
          ? spotifyPopularityFilter(a.artists?.[0], artistPopularityInterval)
          : true
      );

    setFilteredAlbums(filtered);
  }, [
    albums,
    setFilteredAlbums,
    releaseInterval,
    albumPopularityInterval,
    artistPopularityInterval,
  ]);

  // On filter change (any filter changes) -> Filter
  useEffect(() => {
    filterAlbums();
    filterTracks();
  }, [filterAlbums, filterTracks]);

  return (
    <>
      {albums?.length && (
        <>
          <DateIntervalSelector
            albums={albums}
            setDateInterval={setReleaseInterval}
          />
          <p>
            Note: Some albums (remastered / re-releases) do not have their
            original Release Date.
          </p>
        </>
      )}
      {(albums?.length || artists?.length) && (
        <Collapsible isOpenDefault={false}>
          {tracks?.length && (
            <TrackLengthIntervalSelector
              tracks={tracks}
              setInterval={setDurationInterval}
            />
          )}

          {tracks?.length && (
            <PopularitySelector
              setPopularityInterval={setTrackPopularityInterval}
              title={<h4>🎵🥇 Track Popularity</h4>}
            />
          )}

          {artists?.length && (
            <PopularitySelector
              setPopularityInterval={setArtistPopularityInterval}
              title={<h4>👨‍🎤🥇 Artist Popularity</h4>}
            />
          )}

          {albums?.length && (
            <>
              <PopularitySelector
                setPopularityInterval={setAlbumPopularityInterval}
                title={<h4>💽🥇 Album Popularity</h4>}
              />
              <p>
                Note: Spotify has duplicated albums with the exact same name and
                tracks, but they are often "Hidden", so their popularity is
                usually lower than their original counterpart.
              </p>
            </>
          )}
        </Collapsible>
      )}
    </>
  );
}

export default TrackIntervalFilters;
