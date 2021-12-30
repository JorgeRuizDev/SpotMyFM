import PlaylistView from "components/core/cards/views/PlaylistView";
import { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Styled from "./PlaylistManager.styles";
interface IPlaylistManagerProps {}

function PlaylistManager(props: IPlaylistManagerProps): JSX.Element {
  const api = useClientsStore((s) => s.spotifyApi);
  const user = useClientsStore((s) => s.user);

  const [isLoading, setIsLoading] = useState(true);

  const [showLiked, setShowLiked] = useState(true);
  const [showPersonal, setShowPersonal] = useState(true);

  const [displayPlaylist, setDisplayPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  const [personalPlaylists, setPersonalPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [likedPlaylists, setLikedPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  //
  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const playlists = await api.getAllPlaylists();

      const personal = [];
      const liked = [];

      for (const p of playlists) {
        if (p.owner.id === user.spotifyUser?.id) {
          personal.push(p);
        } else {
          liked.push(p);
        }
      }
      setLikedPlaylists(liked);
      setPersonalPlaylists(personal);
      setIsLoading(false);
    };
    fn();
  }, [api, user.spotifyUser?.id]);

  useEffect(() => {
    const playlists = [];
    showLiked && playlists.push(...likedPlaylists);
    showPersonal && playlists.push(...personalPlaylists);
    setDisplayPlaylists(playlists);
  }, [likedPlaylists, personalPlaylists, showLiked, showPersonal]);

  return (
    <>
      <PlaylistView
        playlists={displayPlaylist}
        settings={{ isLoading: isLoading }}
      />
    </>
  );
}

export default PlaylistManager;
