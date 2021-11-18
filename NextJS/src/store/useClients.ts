import { LastfmClient } from "./../restClients/lastFM/lastfmClient";
import { SpotifyClient } from "restClients/spotify/spotifyClient";
import { CacheAdapter, CacheDb } from "./../data/cacheDB/CacheDB";
import create from "zustand";
import env from "env";

interface IClientStore {
  cacheClient: CacheAdapter;
  spotifyApi: SpotifyClient;
  lastfmApi: LastfmClient;
}

/**
 * Store that manages the current clients
 * @returns {IClientStore} A state consumer that returns the current rest clients
 */
export const useClientsStore = create<IClientStore>((set, get) => {
  const cacheClient = CacheDb;
  const spotifyApi = new SpotifyClient();
  const lastfmApi = new LastfmClient(env.LASTFM_KEY);
  return { cacheClient, spotifyApi, lastfmApi };
});
