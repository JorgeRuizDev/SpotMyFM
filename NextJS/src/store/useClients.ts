import { SpotifyClient } from "restClients/spotify/spotifyClient";
import { CacheAdapter } from "./../data/cacheDB/CacheDB";

interface IClientStore {
  cacheClient: CacheAdapter;
  spotifyApi: SpotifyClient;
}
