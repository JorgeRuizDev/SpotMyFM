import create from "zustand";
import { CacheDb } from "data/cacheDB/CacheDB";
import cookieManager from "util/cookies/loginCookieManager";
import { toast } from "react-toastify";
import getAuthToken from "util/cookies/loginFromCookies";
import { SpotifyClient } from "restClients/spotify/spotifyClient";

interface ILoginStore {
  isLogged: boolean | undefined;
  spotifyApi: SpotifyClient;
  logOut: () => void;
  logIn: (token: string) => Promise<boolean>;
}

/**
 * Store that manages the login status
 */
const useLoginStore = create<ILoginStore>((set, get) => {
  /**
   * Current Spotify Api Object
   */
  const spotifyApi = new SpotifyClient();

  /**
   * Current boolean flag of the login process
   */
  const isLogged = undefined;

  /**
   * Login function
   * @param token Spotify Auth Token
   * @returns true if the login is successful
   */
  const logIn = async (token: string) => {
    if (!token || token.length == 0) {
      set(() => ({
        isLogged: false,
      }));
      return false;
    }

    spotifyApi.setAccessToken(token);
    set(() => ({
      isLogged: true,
      spotifyApi,
    }));

    return true;
  };

  /**
   * Log out function, clears the current data
   */
  const logOut = () => {
    cookieManager.removeAll();
    window.localStorage.clear();
    CacheDb.resetDB();
    set(() => ({
      isLogged: false,
    }));
    // TODO: Clear Notifications 
    toast.info("User Logged Out");
  };

  /**
   * Function that runs on the first load of the component.
   * It reads the stored credentials in the cookie and logs the use in automatically.
   */
  function onMount() {
    if (isLogged === undefined) {
      getAuthToken().then((t) => logIn(t || ""));
    }
  }

  onMount();

  return { isLogged, logIn, logOut, spotifyApi };
});

export { useLoginStore };
