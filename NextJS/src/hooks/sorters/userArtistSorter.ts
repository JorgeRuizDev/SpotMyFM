import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { useCallback, useEffect, useState } from "react";

import { sortByName, sortByPopularity } from "../../util/sorters/commonSoters";

type ArtistSortingOptions = "DEFAULT" | "ARTIST_NAME" | "ARTIST_POPULARITY";

export const artistSortingOptions: Record<ArtistSortingOptions, string> = {
  DEFAULT: "Default",
  ARTIST_NAME: "Name",
  ARTIST_POPULARITY: "Popularity",
};

export default function useArtistSorter(
  artists: Artist[],
  option = artistSortingOptions.DEFAULT,
  isAscendent = false
) {
  const so = artistSortingOptions;

  const [defaultArtists, setDefaultArtists] = useState([...artists]);
  const [sortedArtists, setSortedArtists] = useState(artists);
  const [optionState, setOptionState] = useState(option);
  const [isAscendentState, setIsAscendentState] = useState(isAscendent);

  // Save the current artist state as "Default"
  useEffect(() => {
    setDefaultArtists([...artists]);
  }, [artists]);

  /**
   * Sort Function
   *
   * Sorts Artists prop using the option prop
   */
  const sort = useCallback(() => {
    let t = artists;
    switch (optionState) {
      case so.ARTIST_POPULARITY:
        t = artists.sort(sortByPopularity);
        break;
      case so.ARTIST_NAME:
        t = artists.sort(sortByName);
        break;
      case so.DEFAULT:
        t = [...defaultArtists];
    }

    setSortedArtists(isAscendentState ? [...t.reverse()] : [...t]);
  }, [so, artists, optionState, isAscendentState, defaultArtists]);

  // On option change: Sort the artists
  useEffect(sort, [sort, optionState, isAscendentState]);

  return {
    sortedArtists,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    artistSortingOptions,
  };
}
