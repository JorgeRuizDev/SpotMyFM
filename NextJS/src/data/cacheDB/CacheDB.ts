import { DexieDB } from "./dexieDB/DexieDB";
import { Album } from "./dexieDB/models/Album";
import { Artist } from "./dexieDB/models/Artist";
import { Track } from "./dexieDB/models/Track";

export interface CacheAdapter {
  /**
   * Persist an array of tracks in the cache.
   * @param {Track[]} tracks
   * @returns {any}
   */
  addTracks(tracks: Track[]): Promise<void>;

  /**
   * Persist an array of albums in the cache.
   * @param {Album[]} albums
   * @returns {any}
   */
  addAlbums(albums: Album[]): Promise<void>;

  /**
   * Persist an array of artists in the cache.
   * @param {Artist[]} artists
   * @returns {any}
   */
  addArtists(artists: Artist[]): Promise<void>;

  /**
   * Joins and persist the following elements
   * @param {Track[]} tracks
   * @param {Album[]} albums
   * @param {Artist[]} artists
   * @returns {Track[]} return tracks: Joined Tracks
   */
  joinTracks(
    tracks: Track[],
    albums: Album[],
    artists: Artist[]
  ): Promise<Track[]>;

  /**
   * Joins and persists the following elements
   * @param {Album[]} albums
   * @param {Artist[]} artists
   * @returns {Album[]} joined albums.
   */
  joinAlbums(albums: Album[], artists: Artist[]): Promise<Album[]>;

  /**
   * Gets all cached tracks
   * @returns Track[]
   */
  getAllTracks(): Promise<Track[]>;

  /**
   * Gets all cached albums.
   * @returns {any}
   */ getAllAlbums(): Promise<Album[]>;

  /**
   * Gets al cached artists
   */
  getAllArtists(): Promise<Artist[]>;

  /**
   * Retrieves every single track cached by an array of spotifyIds.
   * If the element is missing the position will contain a null.
   * @param spotifyIds
   */
  getTracksBySpotifyId(spotifyIds: string[]): Promise<Track[]>;

  /**
   * Retrieves every single album cached by an array of spotifyIds.
   * If the element is missing the position will contain a null.
   * @param spotifyIds
   */
  getAlbumsBySpotifyId(spotifyIds: string[]): Promise<Album[]>;

  /**
   * Retrieves every single artist cached by an array of spotifyIds.
   * If the element is missing the position will contain a null.
   * @param spotifyIds
   */
  getArtistsBySpotifyId(spotifyIds: string[]): Promise<Artist[]>;

  /**
   * Given an array of spotify Ids, returns the missing ids that are not cached.
   * @param spotifyIds
   */
  getMissingTracks(spotifyIds: string[]): Promise<string[]>;

  /**
   * Given an array of spotify Ids, returns the missing ids that are not cached.
   * @param spotifyIds
   */
  getMissingAlbums(spotifyIds: string[]): Promise<string[]>;

  /**
   * Given an array of spotify Ids, returns the missing ids that are not cached.
   * @param spotifyIds
   */
  getMissingArtists(spotifyIds: string[]): Promise<string[]>;

  /**
   * Destroys the Database
   */
  dropDB(): Promise<void>;

  /**
   * Reset the database.
   */
  resetDB(): Promise<void>;
}

export const CacheDb = new DexieDB();
