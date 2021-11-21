import React, { useCallback, useEffect, useState } from "react";
import Buttons from "styles/Buttons";
import Styled from "./SelectPlaylist.styles";
import { MdCancel, MdDeleteForever, MdPlaylistAdd } from "react-icons/md";

import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "components/core/display/molecules/Modal";
import PlaylistCompleteDetails from "components/core/cards/detailedCards/PlaylistCompleteDetails";
import GenericCardView from "components/core/cards/views/GenericCardView";
import { usePlaylistManager } from "hooks/spotify/usePlaylistManger";
import { useClientsStore } from "store/useClients";
import SimplePlaylistCard from "components/core/cards/simpleCards/SimplePlaylistCard";
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

  const [filteredPlaylist, setFilteredPlaylists] = useState(playlists);
  // PaginatioN:

  const [selPlaylist, setSelPlaylist] = useState<
    SpotifyApi.PlaylistObjectSimplified | undefined
  >(undefined);

  const [modalPlaylist, setModalPlaylist] = useState<
    SpotifyApi.PlaylistObjectSimplified | undefined
  >(undefined);

  return (
    <div>
      <Styled.MenuWrap>
        <ButtonRow
          selPlaylist={selPlaylist}
          setSelPlaylist={setSelPlaylist}
          trackUris={trackUris}
          unselectAll={unselectAll}
        />
        <Filter
          playlists={playlists}
          setFilteredPlaylists={setFilteredPlaylists}
        />
        <Styled.Center>
          <h5>
            {selPlaylist == undefined
              ? "No playlist selected"
              : `Selected ${selPlaylist?.name}`}
          </h5>
        </Styled.Center>
      </Styled.MenuWrap>

      <GenericCardView>
        {filteredPlaylist
          ?.filter((p) => p.owner.id === owner?.id)
          .map((p, i) => (
            <SimplePlaylistCard
              key={i}
              compact
              playlist={p}
              onDetailsClick={() => setModalPlaylist(p)}
            />
          ))}
        <></>
      </GenericCardView>
      <Modal
        isOpen={modalPlaylist !== undefined}
        onClose={() => setModalPlaylist(undefined)}
      >
        <PlaylistCompleteDetails playlist={modalPlaylist} />
      </Modal>
    </div>
  );
}

interface IFilter {
  playlists?: SpotifyApi.PlaylistObjectSimplified[];
  setFilteredPlaylists: (
    p: SpotifyApi.PlaylistObjectSimplified[] | undefined
  ) => void;
}
function Filter({ playlists, setFilteredPlaylists }: IFilter) {
  const [value, setValue] = useState("");

  const filter = useCallback(() => {
    if (value.length > 1) {
      setFilteredPlaylists(
        playlists?.filter(
          (p) =>
            p.name.toUpperCase().includes(value) ||
            p.owner?.display_name?.toUpperCase().includes(value) ||
            (p.collaborative && "collaborative".includes(value)) ||
            (p.public ? "public" : "private").includes(value)
        )
      );
    } else {
      setFilteredPlaylists(playlists);
    }
  }, [setFilteredPlaylists, playlists, value]);

  // On tracks change: filter again
  useEffect(filter, [playlists, filter, value]);

  return (
    <Styled.Center>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        placeholder={"Fortnite Workout"}
      />
    </Styled.Center>
  );
}

interface IButtonRow {
  selPlaylist?: SpotifyApi.PlaylistObjectSimplified;
  setSelPlaylist: (p: SpotifyApi.PlaylistObjectSimplified | undefined) => void;
  trackUris: string[];
  unselectAll: () => void;
}

function ButtonRow({
  selPlaylist,
  setSelPlaylist,
  trackUris,
  unselectAll,
}: IButtonRow) {
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
        onClick={() => setSelPlaylist(undefined)}
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
