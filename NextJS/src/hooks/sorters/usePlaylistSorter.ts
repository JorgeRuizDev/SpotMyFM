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
const so = playlistSortingOptions;
export default function useAlbumSorter(
  playlists: SpotifyApi.PlaylistObjectSimplified[],
  option = playlistSortingOptions.DEFAULT,
  isAscendent = false
) {
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
      case so.DEFAULT:
        t = [...defaultPlaylists];
        break;
      case so.PLAYLIST_NAME:
        t = playlists.sort(sortByName);
        break;
      case so.PLAYLIST_OWNER_NAME:
        t = playlists.sort(sortByPlaylistOwner);
        break;
      case so.PLAYLIST_TRACK_COUNT:
        t = playlists.sort(sortByPlaylistTrackCount);
        break;
      default:
        t = [...defaultPlaylists];
        break;
    }

    setSortedPlaylists(isAscendentState ? [...t.reverse()] : [...t]);
  }, [playlists, optionState, isAscendentState, defaultPlaylists]);

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
