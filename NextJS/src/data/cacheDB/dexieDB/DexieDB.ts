import { CacheAdapter } from "data/cacheDB/CacheDB";
import { Album } from "./models/Album";
import { Artist } from "./models/Artist";
import { Track } from "./models/Track";
import * as album from "./logic/dbAlbums";
import * as artist from "./logic/dbArtists";
import * as track from "./logic/dbTracks";

export class DexieDB implements CacheAdapter {
  addTracks(tracks: Track[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addAlbums(albums: Album[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addArtists(artists: Artist[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  joinTracks(
    tracks: Track[],
    albums: Album[],
    artists: Artist[]
  ): Promise<Track[]> {
    throw new Error("Method not implemented.");
  }
  joinAlbums(albums: Album[], artists: Artist[]): Promise<Album[]> {
    throw new Error("Method not implemented.");
  }
  getAllTracks(): Promise<Track[]> {
    throw new Error("Method not implemented.");
  }
  getAllAlbums(): Promise<Album[]> {
    throw new Error("Method not implemented.");
  }
  getAllArtists(): Promise<Artist[]> {
    throw new Error("Method not implemented.");
  }
  getTracksBySpotifyId(spotifyIds: string[]): Promise<Track[]> {
    throw new Error("Method not implemented.");
  }
  getAlbumsBySpotifyId(spotifyIds: string[]): Promise<Album[]> {
    throw new Error("Method not implemented.");
  }
  getArtistsBySpotifyId(spotifyIds: string[]): Promise<Artist[]> {
    throw new Error("Method not implemented.");
  }
  getMissingTracks(spotifyIds: string[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  getMissingAlbums(spotifyIds: string[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  getMissingArtists(spotifyIds: string[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  dropDB(): void {
    throw new Error("Method not implemented.");
  }
  resetDB(): void {
    throw new Error("Method not implemented.");
  }
}
