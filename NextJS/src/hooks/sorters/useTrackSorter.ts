import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useEffect, useState } from "react";
import {
  sortByAlbumReleaseDate,
  sortByTrackLength,
  sortTrackByAlbumName,
} from "util/sorters/trackSorters";

import {
  sortByArtistName,
  sortByArtistPop,
  sortByName,
} from "../../util/sorters/commonSoters";

type TrackSortingOptions =
  | "DEFAULT"
  | "TRACK_NAME"
  | "ALBUM_NAME"
  | "RELEASE_DATE"
  | "TRACK_LENGTH"
  | "ARTIST_NAME"
  | "ARTIST_POPULARITY"
  | "ARTIST_COUNT";

export const trackSortingOptions: Record<TrackSortingOptions, string> = {
  DEFAULT: "Default",
  TRACK_NAME: "Track Name",
  ALBUM_NAME: "Album Name",
  RELEASE_DATE: "Release Date",
  TRACK_LENGTH: "Track Length",
  ARTIST_NAME: "Artist Name",
  ARTIST_POPULARITY: "Artist Popularity",
  ARTIST_COUNT: "Number of Artists",
};

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
      case so.ARTIST_COUNT:
        t = tracks.sort((a, b) => a.artists.length - b.artists.length);
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
