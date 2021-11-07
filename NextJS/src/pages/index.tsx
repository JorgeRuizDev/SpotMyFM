import axios from "axios";
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoginStore } from "store/useLogin";
import Buttons from "styles/Buttons";
import { getOauth } from "util/spotify/oauthFrontend";

export default function Home() {
  const { isLogged, spotifyApi } = useLoginStore();
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
        toast.error(e);
      }
    }
  }, [isLogged, spotifyApi]);

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
      {isLogged && <h1>Logueado</h1>}
    </>
  );
}
