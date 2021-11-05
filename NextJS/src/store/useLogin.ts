import { useEffect } from "react";
import create from "zustand";
import Spotify from "spotify-web-api-js";
import cookieManager from "util/cookies/loginCookieManager";
import { toast } from "react-toastify";
import getAuthToken from "util/cookies/loginFromCookies";

interface ILoginStore {
  isLogged: boolean | undefined;
  spotifyApi: Spotify.SpotifyWebApiJs;
  logOut: () => void;
  logIn: (token: string) => void;
}

const useLoginStore = create<ILoginStore>((set, get) => {
  const isLogged = undefined;

  const spotifyApi = new Spotify();
  const logIn = async (token: string) => {
    if (!token || token.length == 0) {
      set(() => {
        isLogged: false;
      });
    }
    const api = new Spotify();
    api.setAccessToken(token);
    set(() => {
      isLogged: true;
      spotifyApi: api;
    });
  };

  const logOut = () => {
    cookieManager.removeAll();
    window.localStorage.clear();
    // TODO: Reset Database
    set(() => {
      isLogged: false;
    });
    toast.info("User Logged Out");
  };

  useEffect(() => {
    const { isLogged } = get();

    if (isLogged === undefined) {
      getAuthToken().then((t) => logIn(t || ""));
    }
  });

  return { isLogged, logIn, logOut, spotifyApi };
});

export { useLoginStore };
