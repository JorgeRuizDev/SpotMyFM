import Modal from "components/core/display/molecules/Modal";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useEffect, useMemo, useState } from "react";
import cfg from "config";
import Styled from "./PlaylistTrackDetails.styles";
import Text from "styles/Text";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import TrackSelectorView from "../../views/TrackSelectorView";
import PlaylistCompleteDetails from "../PlaylistCompleteDetails";
import ViewHeading from "components/core/display/atoms/ViewHeading";
import parse from "html-react-parser";
import PlaylistPublicFormat from "components/core/display/atoms/PlaylistPublicFormat";
import useTranslation from "next-translate/useTranslation";

interface IPlaylistTrackDetailsProps {
  playlist?: SpotifyApi.PlaylistObjectSimplified;
  setPlaylist: (p: undefined) => void;
}

const max = cfg.playlist_track_view_max_track_count;

function PlaylistTrackDetails({
  playlist,
  setPlaylist,
}: IPlaylistTrackDetailsProps): JSX.Element {
  const [divId, setDivId] = useState("");

  const api = useClientsStore((s) => s.spotifyApi);
  const { getTracks } = useDataFacade();
  const [isLoading, setIsLoading] = useState(true);

  const [showDetailed, setShowDetailed] = useState(true);

  const [tracks, setTracks] = useState<Track[]>([]);

  const [playlistOwner, setPlaylistOwner] = useState<
    SpotifyApi.UserObjectPublic | undefined
  >(playlist?.owner);

  const fetchTracks = useCallback(async () => {
    if (!playlist || playlist.tracks.total > max) {
      return;
    }

    setIsLoading(true);
    const spotifyTracks = await api.getAllPlaylistTracks(playlist.id);
    const user = await api.getUser(playlist.owner.id);
    const tracks = await getTracks(spotifyTracks);
    setTracks(tracks);
    setPlaylistOwner(user);
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

  const img = useMemo(
    () => playlist?.images?.[playlist?.images.length - 1],
    [playlist?.images]
  );
  const { t } = useTranslation();
  return (
    <>
      <Modal
        isOpen={playlist !== undefined}
        onClose={() => {
          setPlaylist(undefined);
        }}
        setModalBodyId={setDivId}
      >
        {playlist ? (
          <>
            <Styled.Wrap>
              <ViewHeading
                img={{ src: img?.url || "", alt: playlist?.name || "" }}
              >
                <h2>{playlist.name}</h2>
                {playlistOwner && (
                  <a href={playlist.owner.href}>
                    <Text.Inline>
                      <h4>
                        By
                        {playlist.owner.display_name}{" "}
                      </h4>
                      <Styled.ProfilePic
                        src={
                          playlistOwner.images?.[1]?.url ||
                          playlistOwner.images?.[0]?.url ||
                          ""
                        }
                        alt={playlistOwner.display_name}
                      />
                    </Text.Inline>
                  </a>
                )}
                <h5>
                  <PlaylistPublicFormat playlist={playlist} />
                </h5>
                <h5>
                  <Text.green>{t('cards:tracks2', {'total': playlist.tracks.total})}</Text.green>
                </h5>
                {playlist.description && (
                  <div>
                    <h6>
                      <Text.green>Description</Text.green>
                    </h6>
                    <p>{parse(playlist.description || "")}</p>
                  </div>
                )}
              </ViewHeading>
            </Styled.Wrap>
            {showDetailed ? (
              <TrackSelectorView
                tracks={tracks}
                settings={{
                  isLoading: isLoading,
                  scrollableTargetId: divId,
                  defaultView: "LIST",
                }}
              />
            ) : (
              <iframe
                src={`https://open.spotify.com/embed/playlist/${playlist?.id}`}
                width="90%"
                height="360"
                frameBorder="0"
                allow="encrypted-media"
              ></iframe>
            )}
          </>
        ) : (
          <></>
        )}
        <p style={{ opacity: "30" }}>{t('cards:uri', {'uri%': playlist?.uri})}</p>
      </Modal>
    </>
  );
}

export default PlaylistTrackDetails;
