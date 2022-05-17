import PlaylistView from "components/core/cards/views/PlaylistView";
import { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Styled from "./PlaylistManager.styles";
import Text from "styles/Text";
import Ms from "styles/Miscellaneous";
import Switch from "components/core/input/atoms/Switch";
import useTranslation from "next-translate/useTranslation";
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

  // Load the Playlists
  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const playlists = await api.getAllPlaylists(user?.spotifyUser?.id || "");

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
  const { t } = useTranslation();
  return (
    <Styled.Wrap>
      <Text.PageTitle>{t("cards:playlist_manager")}</Text.PageTitle>
      <Styled.Center>
        <Styled.CardWrap>
          <Ms.Card>
            <Styled.CardTitle>{t("settings:settings")}</Styled.CardTitle>
            <Switch
              isChecked={showPersonal}
              onToggle={() => {
                setShowPersonal((p) => !p);
              }}
            >
              <p>{t("cards:show_personal_playlists")}</p>
            </Switch>

            <Switch
              isChecked={showLiked}
              onToggle={() => {
                setShowLiked((p) => !p);
              }}
            >
              <p>{t("cards:show_liked_playlists")}</p>
            </Switch>
          </Ms.Card>
        </Styled.CardWrap>
      </Styled.Center>

      <PlaylistView
        playlists={displayPlaylist}
        settings={{ isLoading: isLoading }}
      />
    </Styled.Wrap>
  );
}

export default PlaylistManager;
