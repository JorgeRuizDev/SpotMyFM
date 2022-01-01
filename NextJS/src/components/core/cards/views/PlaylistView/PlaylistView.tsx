import Modal from "components/core/display/molecules/Modal";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import usePlaylistSorter, {
  playlistSortingOptions,
} from "hooks/sorters/usePlaylistSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { IPlaylistViewSettings } from "interfaces/Playlist";
import { useEffect, useState } from "react";
import filterSpotifyPlaylist from "util/filters/filterSpotifyPlaylist";
import PlaylistTrackDetails from "../../detailedCards/PlaylistTrackDetails";
import SimplePlaylistCard from "../../simpleCards/SimplePlaylistCard";
import GenericCardView from "../GenericCardView";
import { IGenericCardViewSortProps } from "../GenericCardView/GenericCardView";
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
  },
}: IPlaylistViewProps) {
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
    sortTitle: "Sort Playlists",
  };
  useEffect(() => {
    console.log("cambia");
  }, [sortedPlaylists]);

  const [modalPlaylist, setModalPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified>();
  const [modalTracks, setModalTracks] = useState<Track[]>([]);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [filtered, setFiltered] = useState(sortedPlaylists);

  const filter: IFilterInputProps<SpotifyApi.PlaylistObjectSimplified> = {
    array: sortedPlaylists,
    filterFunction: filterSpotifyPlaylist,
    setFilteredArray: setFiltered,
  };

  return (
    <>
      <GenericCardView
        isLoading={settings.isLoading}
        filterInputProps={filter}
        sorting={sorting}
      >
        {filtered.map((p, i) => (
          <SimplePlaylistCard
            playlist={p}
            key={i}
            onDetailsClick={() => {
              setModalPlaylist(p);
            }}
          />
        ))}
      </GenericCardView>
      {
        <PlaylistTrackDetails
          playlist={modalPlaylist}
          setPlaylist={setModalPlaylist}
        />
      }
    </>
  );
}

export default PlaylistView;
