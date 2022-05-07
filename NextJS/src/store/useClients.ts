import { LastfmClient } from "./../restClients/lastFM/lastfmClient";
import { SpotifyClient } from "restClients/spotify/spotifyClient";
import { CacheAdapter, CacheDb } from "./../data/cacheDB/CacheDB";
import create from "zustand";
import env from "env";
import { BackendDBClient } from "restClients/backendDB/backendDBclient";
import { LudwigClient } from "restClients/ludwigClient/ludwigClient";

interface IClientStore {
  cacheClient: CacheAdapter;
  spotifyApi: SpotifyClient;
  lastfmApi: LastfmClient;
  backendDbApi: BackendDBClient;
  ludwigApi: LudwigClient;
  getUser: (
    isLogged?: boolean
  ) => Promise<SpotifyApi.CurrentUsersProfileResponse | null>;
  user: IStoreUser;
  setIsPremium: (is: boolean) => void;
}

interface IStoreUser {
  isPremium: boolean;
  spotifyUser: SpotifyApi.CurrentUsersProfileResponse | null;
}

/**
 * Store that manages the current clients
 * @returns {IClientStore} A state consumer that returns the current rest clients
 */
export const useClientsStore = create<IClientStore>((set, get) => {
  const cacheClient = CacheDb;
  const spotifyApi = new SpotifyClient();
  const lastfmApi = new LastfmClient(env.LASTFM_KEY);
  const backendDbApi = new BackendDBClient();
  const ludwigApi = new LudwigClient();
  const user: IStoreUser = { isPremium: false, spotifyUser: null };

  const setIsPremium = (is: boolean) => {
    set((s) => ({ user: { isPremium: is, spotifyUser: s.user.spotifyUser } }));
  };

  const getUser = async (isLogged: boolean = false) => {
    // Exit if the user is already fetched or the user is not logged in
    if (!isLogged || get().user.spotifyUser) {
      return null;
    }

    try {
      const res = await spotifyApi.getMe();
      set({
        user: { isPremium: res.product == "premium", spotifyUser: res },
      });
      return res;
    } catch (e) {
      return null;
    }
  };
  return {
    cacheClient,
    spotifyApi,
    backendDbApi,
    lastfmApi,
    ludwigApi,
    getUser,
    user,
    setIsPremium,
  };
});
