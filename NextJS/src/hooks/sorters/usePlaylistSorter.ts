import { useCallback, useEffect, useState } from "react";
import {
  sortByPlaylistOwner,
  sortByPlaylistTrackCount,
} from "util/sorters/playlistSorter";
import { sortByName } from "../../util/sorters/commonSoters";

type PlaylistSortingOptions =
  | "DEFAULT"
  | "PLAYLIST_NAME"
  | "PLAYLIST_TRACK_COUNT"
  | "PLAYLIST_OWNER_NAME";

export const playlistSortingOptions: Record<PlaylistSortingOptions, string> = {
  DEFAULT: "Default",
  PLAYLIST_NAME: "Playlist Name",
  PLAYLIST_OWNER_NAME: "Playlist Owner Name",
  PLAYLIST_TRACK_COUNT: "Playlist Track Count",
};

export default function useAlbumSorter(
  playlists: SpotifyApi.PlaylistObjectSimplified[],
  option = playlistSortingOptions.DEFAULT,
  isAscendent = false
) {
  const so = playlistSortingOptions;

  const [defaultPlaylists, setDefaultPlaylists] = useState([...playlists]);
  const [sortedPlaylists, setSortedPlaylists] = useState(playlists);
  const [optionState, setOptionState] = useState(option);
  const [isAscendentState, setIsAscendentState] = useState(isAscendent);

  // Save the current playlist state as "Default"
  useEffect(() => {
    setDefaultPlaylists([...playlists]);
  }, [playlists]);

  /**
   * Sort Function
   *
   * Sorts Albums prop using the option prop
   */
  const sort = useCallback(() => {
    let t = playlists;
    switch (optionState) {
      case so.PLAYLIST_NAME:
        t = playlists.sort(sortByName);
        break;
      case so.PLAYLIST_OWNER_NAME:
        t = playlists.sort(sortByPlaylistOwner);
        break;
      case so.PLAYLIST_TRACK_COUNT:
        t = playlists.sort(sortByPlaylistTrackCount);
        break;
      case so.DEFAULT:
        t = [...defaultPlaylists];
    }

    setSortedPlaylists(isAscendentState ? [...t.reverse()] : [...t]);
  }, [so, playlists, optionState, isAscendentState, defaultPlaylists]);

  // On option change: Sort the albums
  useEffect(sort, [sort, optionState, isAscendentState]);

  return {
    sortedPlaylists,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    sortOptions: playlistSortingOptions,
  };
}
