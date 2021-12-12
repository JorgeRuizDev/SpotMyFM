import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import useArtistSorter, {
  artistSortingOptions,
} from "hooks/sorters/userArtistSorter";
import { IArtistViewSettings } from "interfaces/Artist";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { filterArtist } from "util/filters/filterArtist";
import SimpleArtistCard from "../../simpleCards/SimpleArtistCard";
import GenericCardView, {
  IGenericCardViewSortProps,
  ViewTypeOption,
} from "../GenericCardView/GenericCardView";
import Styled from "./ArtistView.styles";
interface IArtistViewProps {
  artists: Artist[];
  settings?: IArtistViewSettings;
}

function ArtistView({
  artists,
  settings = {
    defaultArtistSort: artistSortingOptions.DEFAULT,
    isLoading: false,
    isNested: false,
  },
}: IArtistViewProps) {
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artists);
  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    isMobile ? "LIST" : "GRID"
  );

  const {
    sortedArtists,
    artistSortingOptions,
    isAscendentState,
    setIsAscendentState,
    optionState,
    setOptionState,
  } = useArtistSorter(artists, settings.defaultArtistSort);

  const sorting: IGenericCardViewSortProps = {
    sortTitle: "Sort Artists",
    options: artistSortingOptions,
    isAscendant: isAscendentState,
    selected: optionState,
    setIsAscendant: setIsAscendentState,
    setSorting: (s: string) => {
      setOptionState(s);
    },
  };

  const filter: IFilterInputProps<Artist> = {
    array: sortedArtists,
    filterFunction: filterArtist,
    setFilteredArray: setFilteredArtists,
  };

  return (
    <>
      <GenericCardView
        filterInputProps={filter}
        sorting={sorting}
        setView={setCurrentView}
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <h1>Under Construction</h1> }
        }
        isLoading={settings.isLoading}
      >
        {currentView === "GRID"
          ? artists.map((a, i) => <SimpleArtistCard key={i} artist={a} />)
          : []}
      </GenericCardView>
    </>
  );
}

export default ArtistView;
