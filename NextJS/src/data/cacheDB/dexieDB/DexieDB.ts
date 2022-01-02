import { CacheAdapter } from "data/cacheDB/CacheDB";
import { Album } from "./models/Album";
import { Artist } from "./models/Artist";
import { Track } from "./models/Track";
import * as album from "./logic/dbAlbums";
import * as artist from "./logic/dbArtists";
import * as track from "./logic/dbTracks";
import { dropDatabase, resetDatabase } from "./logic/db";
export class DexieDB implements CacheAdapter {
  constructor() {}

  public addTracks(tracks: Track[]): Promise<void> {
    return track.addTracks(tracks);
  }
  public addAlbums(albums: Album[]): Promise<void> {
    return album.addAlbums(albums);
  }
  public addArtists(artists: Artist[]): Promise<void> {
    return artist.addArtists(artists);
  }
  public joinTracks(tracks: Track[], persist = true): Promise<Track[]> {
    return track.joinTracks(tracks, persist);
  }
  public joinAlbums(albums: Album[], persist = true): Promise<Album[]> {
    return album.joinAlbums(albums, persist);
  }
  public getAllTracks(): Promise<Track[]> {
    return track.getAllTracks();
  }
  public getAllAlbums(): Promise<Album[]> {
    return album.getAllAlbums();
  }
  public getAllArtists(): Promise<Artist[]> {
    return artist.getAllArtists();
  }
  public getSavedTracks(): Promise<Track[]> {
    return track.getSavedTracks();
  }
  public getTracksBySpotifyId(spotifyIds: string[]): Promise<Track[]> {
    return track.getTracksBySpotifyId(spotifyIds);
  }
  public getAlbumsBySpotifyId(spotifyIds: string[]): Promise<Album[]> {
    return album.getAlbumsBySpotifyId(spotifyIds);
  }
  public getArtistsBySpotifyId(spotifyIds: string[]): Promise<Artist[]> {
    return artist.getArtistsBySpotifyId(spotifyIds);
  }
  public getMissingTracks(spotifyIds: string[]): Promise<string[]> {
    return track.getMissingTracks(spotifyIds);
  }
  public getMissingAlbums(spotifyIds: string[]): Promise<string[]> {
    return album.getMissingAlbums(spotifyIds);
  }
  public getMissingArtists(spotifyIds: string[]): Promise<string[]> {
    return artist.getMissingArtists(spotifyIds);
  }
  public dropDB(): Promise<void> {
    return dropDatabase();
  }
  public resetDB(): Promise<void> {
    return resetDatabase();
  }
}
