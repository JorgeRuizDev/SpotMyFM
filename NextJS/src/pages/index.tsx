import axios from "axios";
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { getArtistsBySpotifyId } from "data/cacheDB/dexieDB/logic/dbArtists";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoginStore } from "store/useLogin";
import Buttons from "styles/Buttons";
import { getOauth } from "util/spotify/oauthFrontend";

export default function Home(): JSX.Element {
  const { isLogged, spotifyApi } = useLoginStore();
  const { getArtists, getArtistsById } = useDataFacade();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLogged) {
      const token = spotifyApi.getAccessToken() || "";

      try {
        axios
          .post("/api/database/user/isAdmin", { spotifyAuthToken: token })
          .then((r) => console.log(r.data))
          .catch((e) => toast.error);
      } catch (e) {
        toast.error(e as any);
      }
    }
  }, [isLogged, spotifyApi]);

  const testFetch = async () => {
    const res = await spotifyApi.getMyTopArtists();
    const artists = res.items;
    const art = await getArtistsById(artists.map((a) => a.id));
    console.log(art);
  };

  return (
    <>
      <Buttons.PrimaryGreenButton
        onClick={() => {
          getOauth().promptCredentials();
        }}
      >
        Log In
      </Buttons.PrimaryGreenButton>
      <ToggleThemeButtonFlip />
      {isLogged && (
        <Buttons.PrimaryGreenButton onClick={testFetch}>
          Test Fetch
        </Buttons.PrimaryGreenButton>
      )}
    </>
  );
}
