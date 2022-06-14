import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import useArtistSorter, {
  artistSortingOptions,
} from "hooks/sorters/userArtistSorter";
import { IArtistViewSettings } from "interfaces/Artist";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { filterArtist } from "util/filters/filterArtist";
import {
  ListArtistCard,
  ListArtistCardHeader,
} from "../../listCards/ListArtistCard";
import SimpleArtistCard from "../../simpleCards/SimpleArtistCard";
import GenericCardView, {
  IGenericCardViewSortProps,
  ViewTypeOption,
} from "../GenericCardView/GenericCardView";
import Styled from "./ArtistView.styles";
import useTranslation from "next-translate/useTranslation";
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
    defaultView: isMobile ? "LIST" : "GRID",
  },
}: IArtistViewProps) {
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artists);
  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    settings.defaultView || "GRID"
  );

  const {
    sortedArtists,
    artistSortingOptions,
    isAscendentState,
    setIsAscendentState,
    optionState,
    setOptionState,
  } = useArtistSorter(artists, settings.defaultArtistSort);
  const {t} = useTranslation()
  const sorting: IGenericCardViewSortProps = {
    sortTitle: t('cards:sort_artists'),
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
            : { type: currentView, ListHeader: <ListArtistCardHeader /> }
        }
        isLoading={settings.isLoading}
      >
        {currentView === "GRID"
          ? filteredArtists.map((a, i) => (
              <SimpleArtistCard key={i} artist={a} />
            ))
          : filteredArtists.map((a, i) => (
              <ListArtistCard artist={a} pos={i + 1} key={i} />
            ))}
      </GenericCardView>
    </>
  );
}

export default ArtistView;
