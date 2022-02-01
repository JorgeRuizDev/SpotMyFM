import { Track } from "data/cacheDB/dexieDB/models/Track";
import usePlaylistSorter, {
  playlistSortingOptions,
} from "hooks/sorters/usePlaylistSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { IPlaylistViewSettings } from "interfaces/Playlist";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import filterSpotifyPlaylist from "util/filters/filterSpotifyPlaylist";
import PlaylistTrackDetails from "../../detailedCards/PlaylistTrackDetails";
import ListPlaylistCard, {
  ListPlaylistCardHeader,
} from "../../listCards/ListPlaylistCard";
import SimplePlaylistCard from "../../simpleCards/SimplePlaylistCard";
import GenericCardView from "../GenericCardView";
import {
  IGenericCardViewSortProps,
  ViewTypeOption,
} from "../GenericCardView/GenericCardView";
import Styled from "./PlaylistView.styles";
interface IPlaylistViewProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  settings?: IPlaylistViewSettings;
}

/**
 * Renders an array of playlists
 * @returns
 */
function PlaylistView({
  playlists,
  settings = {
    isNested: false,
    defaultTrackSort: playlistSortingOptions.DEFAULT,
    defaultView: isMobile ? "LIST" : "GRID",
  },
}: IPlaylistViewProps) {
  const { t } = useTranslation();

  const {
    isAscendentState,
    optionState,
    setIsAscendentState,
    setOptionState,
    sortOptions,
    sortedPlaylists,
  } = usePlaylistSorter(playlists);

  const sorting: IGenericCardViewSortProps = {
    isAscendant: isAscendentState,
    options: sortOptions,
    selected: optionState,
    setIsAscendant: setIsAscendentState,
    setSorting: setOptionState,
    sortTitle: t("views:sort-playlists"),
  };

  const [modalPlaylist, setModalPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified>();
  const [filtered, setFiltered] = useState(sortedPlaylists);

  const filter: IFilterInputProps<SpotifyApi.PlaylistObjectSimplified> = {
    array: sortedPlaylists,
    filterFunction: filterSpotifyPlaylist,
    setFilteredArray: setFiltered,
  };
  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    settings.defaultView || "GRID"
  );

  return (
    <>
      <GenericCardView
        isLoading={settings.isLoading}
        filterInputProps={filter}
        sorting={sorting}
        setView={setCurrentView}
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <ListPlaylistCardHeader pos /> }
        }
      >
        {currentView === "GRID"
          ? filtered.map((p, i) => (
              <SimplePlaylistCard
                playlist={p}
                key={i}
                onDetailsClick={() => {
                  setModalPlaylist(p);
                }}
              />
            ))
          : filtered.map((p, i) => (
              <ListPlaylistCard
                playlist={p}
                pos={i}
                onMore={() => {
                  setModalPlaylist(p);
                }}
                key={i}
              />
            ))}
      </GenericCardView>

      <PlaylistTrackDetails
        playlist={modalPlaylist}
        setPlaylist={setModalPlaylist}
      />
    </>
  );
}

export default PlaylistView;
