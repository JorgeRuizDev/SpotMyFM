import { LastfmClient } from "./../restClients/lastFM/lastfmClient";
import { SpotifyClient } from "restClients/spotify/spotifyClient";
import { CacheAdapter, CacheDb } from "./../data/cacheDB/CacheDB";
import create from "zustand";
import env from "env";

interface IClientStore {
  cacheClient: CacheAdapter;
  spotifyApi: SpotifyClient;
  lastfmApi: LastfmClient;
  getUser: (
    isLogged?: boolean
  ) => Promise<SpotifyApi.CurrentUsersProfileResponse | null>;
  user: IStoreUser;
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

  const user: IStoreUser = { isPremium: false, spotifyUser: null };

  const getUser = async (isLogged: boolean = false) => {
    if (!isLogged) {
      return null;
    }

    try {
      const res = await spotifyApi.getMe();
      set({
        user: { isPremium: res.product == "premium", spotifyUser: res },
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return { cacheClient, spotifyApi, lastfmApi, getUser, user };
});
