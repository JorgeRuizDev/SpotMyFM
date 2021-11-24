import React, { useEffect, useMemo, useState } from "react";
import Buttons from "styles/Buttons";
import Styled from "./SelectPlaylist.styles";
import { MdCancel, MdDeleteForever, MdPlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "components/core/display/molecules/Modal";
import PlaylistCompleteDetails from "components/core/cards/detailedCards/PlaylistCompleteDetails";
import GenericCardView from "components/core/cards/views/GenericCardView";
import { usePlaylistManager } from "hooks/spotify/usePlaylistManger";
import { useClientsStore } from "store/useClients";
import SimplePlaylistCard from "components/core/cards/simpleCards/SimplePlaylistCard";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import filterSpotifyPlaylist from "util/filters/filterSpotifyPlaylist";
import { useCardSelector } from "hooks/cardSelector/useCardSelector";
interface ISelectPlaylistProps {
  playlists?: SpotifyApi.PlaylistObjectSimplified[];
  trackUris: string[];
  unselectAll: () => void;
}

function SelectPlaylist({
  playlists,
  trackUris,
  unselectAll,
}: ISelectPlaylistProps) {
  const [
    owner,
    setOwner,
  ] = useState<null | SpotifyApi.CurrentUsersProfileResponse>(null);

  useClientsStore((s) => s.getUser().then((u) => setOwner(u)));

  const _playlists = useMemo(() => playlists || [], [playlists]);

  const [filteredPlaylist, setFilteredPlaylists] = useState(_playlists);
  // Pagination:

  const [selPlaylist, setSelPlaylist] = useState<
    SpotifyApi.PlaylistObjectSimplified | undefined
  >(undefined);

  const [modalPlaylist, setModalPlaylist] = useState<
    SpotifyApi.PlaylistObjectSimplified | undefined
  >(undefined);

  const filterProps: IFilterInputProps<SpotifyApi.PlaylistObjectSimplified> = {
    array: _playlists,
    filterFunction: filterSpotifyPlaylist,
    setFilteredArray: setFilteredPlaylists,
  };

  const {
    isSelectedElement,
    removeAll,
    selectedArray,
    toggleSelectedElement,
  } = useCardSelector<SpotifyApi.PlaylistObjectSimplified>(1, 1);

  useEffect(() => {
    setSelPlaylist(selectedArray[0]);
  }, [selectedArray]);

  return (
    <div>
      <Styled.MenuWrap>
        <ButtonRow
          selPlaylist={selPlaylist}
          trackUris={trackUris}
          unselectAll={removeAll}
        />
        <Styled.Center>
          <h5>
            {!selPlaylist
              ? "No playlist selected"
              : `Selected ${selPlaylist.name}`}
          </h5>
        </Styled.Center>
      </Styled.MenuWrap>
      <Styled.CardLayoutBg id="playlistScrollid">
        <GenericCardView
          filterInputProps={filterProps}
          scrollableTargetId={"playlistScrollid"}
        >
          {filteredPlaylist
            ?.filter((p) => p.owner.id === owner?.id)
            .map((p, i) => (
              <Styled.ElementSelectWrapper
                key={i}
                isSelected={isSelectedElement(p)}
                isNotSelected={
                  !isSelectedElement(p) && selectedArray.length >= 1
                }
                onClick={() => toggleSelectedElement(p)}
              >
                <SimplePlaylistCard
                  compact
                  playlist={p}
                  onDetailsClick={() => setModalPlaylist(p)}
                />
              </Styled.ElementSelectWrapper>
            ))}
        </GenericCardView>
      </Styled.CardLayoutBg>

      <Modal
        isOpen={modalPlaylist !== undefined}
        onClose={() => setModalPlaylist(undefined)}
      >
        <PlaylistCompleteDetails playlist={modalPlaylist} />
      </Modal>
    </div>
  );
}

interface IButtonRow {
  selPlaylist?: SpotifyApi.PlaylistObjectSimplified;
  trackUris: string[];
  unselectAll: () => void;
}

function ButtonRow({ selPlaylist, trackUris, unselectAll }: IButtonRow) {
  const [showModal, setShowModal] = useState(false);

  const {
    addTracksToPlaylist,
    replacePlaylistTracksWith,
  } = usePlaylistManager();

  return (
    <Styled.Center>
      <Buttons.PrimaryGreenButton
        disabled={selPlaylist === undefined}
        onClick={addTracks}
      >
        <MdPlaylistAdd />
        <span>Append To Playlist</span>
      </Buttons.PrimaryGreenButton>
      <Buttons.SecondaryGreenButton
        disabled={selPlaylist === undefined}
        onClick={() => setShowModal(true)}
      >
        <MdDeleteForever />
        <span>Replace Playlist With Selected</span>
      </Buttons.SecondaryGreenButton>
      <Buttons.SecondaryGreenButton
        disabled={selPlaylist === undefined}
        onClick={unselectAll}
      >
        <MdCancel />
        <span>Unselect</span>
      </Buttons.SecondaryGreenButton>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>
          Are you sure you want to delete {selPlaylist?.tracks.total} tracks?
        </h3>
        <Styled.Center>
          <Buttons.PrimaryRedButton onClick={replaceTracks}>
            I'm Sure
          </Buttons.PrimaryRedButton>
        </Styled.Center>
      </Modal>
    </Styled.Center>
  );

  function addTracks() {
    try {
      addTracksToPlaylist(selPlaylist?.id || "", trackUris);
      toast.info("Tracks Added to playlist");
      unselectAll();
    } catch (e) {
      unselectAll();
    }
  }

  function replaceTracks() {
    try {
      replacePlaylistTracksWith(selPlaylist?.id || "", trackUris);
      toast.info("Tracks Added to playlist");
      unselectAll();
    } catch (e) {
      unselectAll();
    }
  }
}

export default SelectPlaylist;
