import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useEffect, useState } from "react";

import { sortByArtistName, sortByArtistPop, sortByName } from "./commonSoters";
import { sortByReleaseDate } from "./useAlbumSorter";

export enum trackSortingOptions {
  DEFAULT = "Default",
  TRACK_NAME = "Track Name",
  ALBUM_NAME = "Album Name",
  RELEASE_DATE = "Release Date",
  TRACK_LENGTH = "Track Length ",
  ARTIST_NAME = "Artist Name",
  ARTIST_POPULARITY = "Artist Popularity",
}

export default function useTrackSorter(
  tracks: Track[],
  option = trackSortingOptions.DEFAULT,
  isAscendent = false
) {
  const so = trackSortingOptions;

  const [defaultTracks, setDefaultTracks] = useState([...tracks]);
  const [sortedTracks, setSortedTracks] = useState(tracks);
  const [optionState, setOptionState] = useState(option);
  const [isAscendentState, setIsAscendentState] = useState(isAscendent);

  // Save the current track state as "Default"
  useEffect(() => {
    setDefaultTracks([...tracks]);
  }, [tracks]);

  /**
   * Sort Function
   *
   * Sorts Tracks prop using the option prop
   */
  const sort = useCallback(() => {
    let t = tracks;
    switch (optionState) {
      case so.TRACK_NAME:
        t = tracks.sort(sortByName);
        break;
      case so.ALBUM_NAME:
        t = tracks.sort(sortTrackByAlbumName);
        break;
      case so.RELEASE_DATE:
        t = tracks.sort(sortByAlbumReleaseDate);
        break;
      case so.TRACK_LENGTH:
        t = tracks.sort(sortByTrackLength);
        break;
      case so.ARTIST_POPULARITY:
        t = tracks.sort(sortByArtistPop);
        break;
      case so.ARTIST_NAME:
        t = tracks.sort(sortByArtistName);
        break;
      case so.DEFAULT:
        t = [...defaultTracks];
    }

    setSortedTracks(isAscendentState ? [...t.reverse()] : [...t]);
  }, [so, tracks, optionState, isAscendentState, defaultTracks]);

  // On option change: Sort the tracks
  useEffect(sort, [sort, optionState, isAscendentState]);

  return {
    sortedTracks,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    sortOptions: trackSortingOptions,
  };
}

function sortByTrackLength(a: Track, b: Track) {
  return a.spotifyDurationMS - b.spotifyDurationMS;
}

function sortTrackByAlbumName(a: Track, b: Track) {
  // Sort by album name + Track Name
  return sortByName(a.album, b.album);
}

function sortByAlbumReleaseDate(a: Track, b: Track) {
  return sortByReleaseDate(a.album, b.album);
}

export { sortTrackByAlbumName, sortByTrackLength };
