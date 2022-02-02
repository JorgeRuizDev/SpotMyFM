import { Album } from "data/cacheDB/dexieDB/models/Album";
import { useCallback, useEffect, useState } from "react";
import {
  sortByAlbumPopularity,
  sortByReleaseDate,
} from "util/sorters/albumSoters";
import {
  sortByArtistName,
  sortByArtistPop,
  sortByName,
} from "../../util/sorters/commonSoters";

type AlbumSortingOptions =
  | "DEFAULT"
  | "ALBUM_NAME"
  | "RELEASE_DATE"
  | "ALBUM_POPULARITY"
  | "ARTIST_NAME"
  | "ARTIST_POPULARITY";

export const albumSortingOptions: Record<AlbumSortingOptions, string> = {
  DEFAULT: "Default",
  ALBUM_NAME: "Album Name",
  RELEASE_DATE: "Release Date",
  ARTIST_NAME: "Artist Name",
  ARTIST_POPULARITY: "Artist Popularity",
  ALBUM_POPULARITY: "Album Popularity",
};

const so = albumSortingOptions;

export default function useAlbumSorter(
  albums: Album[],
  option = albumSortingOptions.DEFAULT,
  isAscendent = false
) {
  const [defaultAlbums, setDefaultAlbums] = useState([...albums]);
  const [sortedAlbums, setSortedAlbums] = useState([...albums]);
  const [optionState, setOptionState] = useState(option);
  const [isAscendentState, setIsAscendentState] = useState(isAscendent);

  // Save the current albums state as "Default"
  useEffect(() => {
    setDefaultAlbums([...albums]);
  }, [albums]);

  /**
   * Sort Function
   *
   * Sorts Albums prop using the option prop
   */
  const sort = useCallback(() => {
    let t = albums;
    switch (optionState) {
      case so.DEFAULT:
        t = [...defaultAlbums];
        break;
      case so.ALBUM_NAME:
        t = albums.sort(sortByName);
        break;
      case so.RELEASE_DATE:
        t = albums.sort(sortByReleaseDate);
        break;
      case so.ALBUM_POPULARITY:
        t = albums.sort(sortByAlbumPopularity);
        break;
      case so.ARTIST_POPULARITY:
        t = albums.sort(sortByArtistPop);
        break;
      case so.ARTIST_NAME:
        t = albums.sort(sortByArtistName);
        break;
    }

    setSortedAlbums(Array.from(isAscendentState ? [...t.reverse()] : [...t]));
  }, [albums, optionState, isAscendentState, defaultAlbums]);

  // On option change: Sort the albums
  useEffect(sort, [sort]);

  return {
    sortedAlbums,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    sortOptions: albumSortingOptions,
  };
}
