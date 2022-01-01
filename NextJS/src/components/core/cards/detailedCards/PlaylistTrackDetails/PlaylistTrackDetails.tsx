import Modal from "components/core/display/molecules/Modal";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useEffect, useState } from "react";
import cfg from "config";
import Styled from "./PlaylistTrackDetails.styles";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import TrackSelectorView from "../../views/TrackSelectorView";
import PlaylistCompleteDetails from "../PlaylistCompleteDetails";
interface IPlaylistTrackDetailsProps {
  playlist?: SpotifyApi.PlaylistObjectSimplified;
  setPlaylist: (p: undefined) => void;
}

const max = cfg.playlist_track_view_max_track_count;

function PlaylistTrackDetails({
  playlist,
  setPlaylist,
}: IPlaylistTrackDetailsProps): JSX.Element {
  const api = useClientsStore((s) => s.spotifyApi);
  const { getTracks } = useDataFacade();
  const [isLoading, setIsLoading] = useState(true);

  const [showDetailed, setShowDetailed] = useState(true);

  const [tracks, setTracks] = useState<Track[]>([]);

  const fetchTracks = useCallback(async () => {
    if (!playlist || playlist.tracks.total > max) {
      return;
    }

    setIsLoading(true);
    const spotifyTracks = await api.getAllPlaylistTracks(playlist.id);

    const tracks = await getTracks(spotifyTracks);
    setTracks(tracks);
    setIsLoading(false);
  }, [api, getTracks, playlist]);

  useEffect(() => {
    if (playlist === undefined) {
      return;
    }

    if (playlist.tracks.total > max) {
      toast.warn(
        `The Playlist is to large to display all the tracks (Exceeds ${max} items)`
      );
      setShowDetailed(false);
    } else {
      setShowDetailed(true);
      fetchTracks();
    }
  }, [fetchTracks, playlist]);

  return (
    <>
      {playlist ? (
        <Modal
          isOpen={playlist !== undefined}
          onClose={() => {
            setPlaylist(undefined);
          }}
        >
          {showDetailed ? (
            <TrackSelectorView
              tracks={tracks}
              settings={{ isLoading: isLoading }}
            />
          ) : (
            <PlaylistCompleteDetails playlist={playlist} />
          )}
        </Modal>
      ) : null}
    </>
  );
}

export default PlaylistTrackDetails;
