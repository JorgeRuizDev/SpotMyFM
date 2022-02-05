import { Album } from "data/cacheDB/dexieDB/models/Album";
import { albumViewSettings } from "interfaces/Album";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { useEffect, useMemo, useState } from "react";
import SimpleAlbumCard from "../../simpleCards/SimpleAlbumCard";
import GenericCardView from "../GenericCardView";
import { filterAlbum } from "util/filters/filterAlbum";
import useAlbumSorter, {
  albumSortingOptions,
} from "hooks/sorters/useAlbumSorter";
import {
  IGenericCardViewSortProps,
  ViewTypeOption,
} from "../GenericCardView/GenericCardView";
import useTranslation from "next-translate/useTranslation";
import { isMobile } from "react-device-detect";
import ListAlbumCard from "../../listCards/ListAlbumCard";
import Modal from "components/core/display/molecules/Modal";
import AdvancedTrackFilters from "components/core/input/organisms/AdvancedTrackFilters";
import FilterButton from "../../buttons/FilterButton";
import Styled from "./AlbumView.styles";

interface IAlbumViewProps {
  albums: Album[];
  settings?: albumViewSettings;
}

function AlbumView({
  albums,
  settings = {
    defaultTrackSort: albumSortingOptions.ALBUM_NAME,
    defaultView: isMobile ? "LIST" : "GRID",
    isLoading: false,
    isNested: false,
  },
}: IAlbumViewProps): JSX.Element {
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [advancedFilteredAlbums, setAdvancedFilteredAlbums] =
    useState<Album[]>(albums);
  const [resetAdvFilter, setResetAdvFilter] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const { t } = useTranslation();

  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    settings.defaultView || "GRID"
  );

  // Reset on Sort Change
  useEffect(() => {
    setAdvancedFilteredAlbums(albums);
    setFilteredAlbums(albums);
  }, [albums]);

  const {
    sortedAlbums,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    sortOptions,
  } = useAlbumSorter(advancedFilteredAlbums, settings.defaultTrackSort);

  const sorting: IGenericCardViewSortProps = useMemo(
    () => ({
      sortTitle: "Sort Albums",
      options: sortOptions,
      isAscendant: isAscendentState,
      selected: optionState,
      setIsAscendant: setIsAscendentState,
      setSorting: (s: string) => {
        setOptionState(s);
      },
    }),
    [
      isAscendentState,
      optionState,
      setIsAscendentState,
      setOptionState,
      sortOptions,
    ]
  );

  const filter: IFilterInputProps<Album> = {
    array: sortedAlbums,
    filterFunction: filterAlbum,
    setFilteredArray: setFilteredAlbums,
  };

  return (
    <div>
      <Styled.Center>
        <FilterButton
          onFilter={() => {
            setShowAdvancedFilter(true);
            setResetAdvFilter(false);
          }}
          onReset={() => {
            setAdvancedFilteredAlbums(albums);
            setResetAdvFilter(true);
          }}
          disableReset={advancedFilteredAlbums.length === albums.length}
        />
      </Styled.Center>  
      <Modal
        isOpen={showAdvancedFilter}
        onClose={() => {
          setShowAdvancedFilter(false);
        }}
        doNotUmount={!resetAdvFilter}
      >
        <AdvancedTrackFilters
          albums={albums}
          setFilteredAlbums={setAdvancedFilteredAlbums}
        />
      </Modal>
      <GenericCardView
        isLoading={settings.isLoading}
        sorting={sorting}
        filterInputProps={filter}
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <></> }
        }
        setView={setCurrentView}
      >
        {currentView === "GRID"
          ? filteredAlbums.map((a, i) => (
              <SimpleAlbumCard album={a} key={i + 1} />
            ))
          : filteredAlbums.map((a, i) => (
              <ListAlbumCard album={a} pos={i + 1} key={i} />
            ))}
        {}
      </GenericCardView>
    </div>
  );
}

export default AlbumView;
