import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import _ from "lodash";
import SpotifyWebApi from "spotify-web-api-js";
import { parse } from "date-fns";
import { IRestClient, RestError } from "interfaces/RestClient";
import SpotifyResponse from "./spotifyResponseCodes";
import { parseAxiosError } from "util/axios/parseError";
import asyncPool from "tiny-async-pool";
/**
 * Spotify Api Rest Client
 */
export class SpotifyClient extends SpotifyWebApi implements IRestClient {
  parse(e: any): RestError {
    if (!!e.status && !!e.response) {
      const msg = JSON.parse(e.response)?.error?.message || "";
      return { status: parseInt(e.status), message: msg };
    }
    return parseAxiosError(e);
  }

  /**
   * Fetches all the tracks given an array of ids
   * @param trackIds
   * @returns
   */
  async getFullTracks(
    trackIds: string[]
  ): Promise<SpotifyApi.TrackObjectFull[]> {
    const tracks = [];

    for (const idChunks of _.chunk(trackIds, 50)) {
      const res = await this.getTracks(idChunks);
      tracks.push(...res.tracks);
    }

    return tracks;
  }

  /**
   * Fetches all the albums given an array of ids
   * @param albumIds
   * @returns
   */
  async getFullAlbums(
    albumIds: string[]
  ): Promise<SpotifyApi.AlbumObjectFull[]> {
    const albums: SpotifyApi.AlbumObjectFull[] = [];

    const chunks = _.chunk(albumIds, 20);

    await asyncPool(2, chunks, async (idChunk) => {
      const res = await this.getAlbums(idChunk);
      albums.push(...res.albums);
    });

    return albums;
  }

  /**
   * Retrieves the current user saved albums
   */
  async getAllMySavedAlbums(): Promise<SpotifyApi.AlbumObjectFull[]> {
    const limit = 50;
    let offset = 0;

    const savedAlbums = [];
    console.log("Entra");
    while (true) {
      const albums = await this.getMySavedAlbums({ limit, offset });

      savedAlbums.push(...albums.items.map((a) => a.album));

      if (offset > albums.total) {
        break;
      }

      offset += limit;
    }

    return savedAlbums;
  }

  /**
   * Fetches the complete object from a list of ids.
   * @param artistIds
   * @returns
   */
  async getFullArtists(
    artistIds: string[]
  ): Promise<SpotifyApi.ArtistObjectFull[]> {
    const artists: SpotifyApi.ArtistObjectFull[] = [];
    const chunks = _.chunk(artistIds, 50);
    await asyncPool(2, chunks, async (idChunk) => {
      const res = await this.getArtists(idChunk);
      artists.push(...res.artists);
    });

    return artists;
  }

  /**
   * Methods that retrieves all the playlists from an specific user.
   * @param userId optional: The user we want to retrieve the playlists from
   * @returns
   */
  async getAllPlaylists(
    userId: string
  ): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    const playlists = [];
    let offset = 0;
    let limit = 50;

    while (true) {
      try {
        const res = await this.getUserPlaylists(userId, { offset, limit });
        playlists.push(...res.items);
        if (offset > res.total) {
          break;
        }
        offset += limit;
      } catch (e) {
        throw e;
      }
    }
    return playlists;
  }

  /**
   * Fetches all the tracks inside a playlist.
   * @param playlistId
   * @returns
   */
  async getAllPlaylistTracks(playlistId: string) {
    const tracks: SpotifyApi.TrackObjectFull[] = [];

    const limit = 50;
    var offset = 0;

    while (true) {
      const res = await this.getPlaylistTracks(playlistId, { limit, offset });

      tracks.push(
        //@ts-ignore
        ...res.items
          .map((i) => i.track)
          // Add only the TRACKS
          .filter((t) => t.type === "track")
      );
      if (res.total < offset) {
        break;
      }
      offset += limit;
    }

    return tracks;
  }

  /**
   * Parses a list of spotify tracks into a local track
   * @param tracks
   * @returns tracks list
   */
  static spotifyTracks2Tracks(
    tracks: SpotifyApi.TrackObjectFull[],
    areSaved = false
  ): Track[] {
    const parsedTracks: Track[] = [];

    for (const track of tracks) {
      parsedTracks.push({
        spotifyId: track.id,
        spotifyUri: track.uri,
        spotifyAlbumId: track.album.id,
        name: track.name,
        spotifyArtistsIds: track.artists.map((x) => x.id),
        spotifyDurationMS: track.duration_ms,
        spotifyIsExplicit: track.explicit,
        spotifyIsPlayable: track.is_playable || false,
        spotifyPreviewURL: track.preview_url,
        spotifyTrackAlbumPos: track.track_number,
        spotifyDiscNumber: track.disc_number,
        spotifyUrl: track.external_urls.spotify,
        artists: [],
        genreVersion: 0,
        isSaved: areSaved,
        spotifyPopularity: track.popularity,
        type: track.type,
        markets: track.available_markets,
      });
    }

    return parsedTracks;
  }

  /**
   * Parses a list of spotify tracks into a local track
   * @param tracks
   * @returns tracks list
   */
  static spotifySavedTracks2Tracks(
    tracks: SpotifyApi.SavedTrackObject[]
  ): Track[] {
    const parsedTracks: Track[] = [];

    for (const savedTrack of tracks) {
      const track = savedTrack.track;
      parsedTracks.push({
        spotifyId: track.id,
        spotifyUri: track.uri,
        spotifyAlbumId: track.album.id,
        name: track.name,
        spotifyArtistsIds: track.artists.map((x) => x.id),
        spotifyDurationMS: track.duration_ms,
        spotifyIsExplicit: track.explicit,
        spotifyIsPlayable: track.is_playable || false,
        spotifyPreviewURL: track.preview_url,
        spotifyTrackAlbumPos: track.track_number,
        spotifyDiscNumber: track.disc_number,
        spotifyUrl: track.external_urls.spotify,
        artists: [],
        genreVersion: 0,
        isSaved: true,
        savedAt: new Date(savedTrack.added_at),
        spotifyPopularity: track.popularity,
        type: track.type,
        markets: track.available_markets,
      });
    }

    return parsedTracks;
  }

  /**
   * Parses a list of spotify albums into a local album
   * @param albums
   * @returns album list
   */
  static spotifyAlbums2Albums(albums: SpotifyApi.AlbumObjectFull[]): Album[] {
    const parsedAlbums: Album[] = [];

    for (const album of albums) {
      parsedAlbums.push({
        spotifyId: album.id,
        name: album.name,
        spotifyCoverUrl: album.images.map((x) => x.url),
        spotifyCovers: album.images,
        spotifyUrl: album.external_urls.spotify,
        spotifyReleaseDate: parseReleaseDate(
          album.release_date,
          album.release_date_precision
        ),
        spotifyArtistsIds: album.artists.map((x) => x.id),
        spotifyPopularity: album.popularity,
        spotifyGenres: album.genres,
        spotifyUri: album.uri,
        albumTags: [],
        artists: [],
        lastfmTagsNames: [],
        type: album.type,
        markets: album.available_markets,
      });
    }
    return parsedAlbums;
  }

  /**
   * Parses a list of spotify artists into a local artist
   * @param artists
   * @returns artist list
   */
  static spotifyArtists2Artists(
    artists: SpotifyApi.ArtistObjectFull[]
  ): Artist[] {
    const parsedArtists = [];

    for (const artist of artists) {
      parsedArtists.push({
        name: artist.name,
        spotifyId: artist.id,
        spotifyUri: artist.uri,
        spotifyUrl: artist.external_urls.spotify,
        spotifyGenres: artist.genres,
        spotifyPopularity: artist.popularity,
        spotifyImgs: artist.images.map((x) => x.url),
        spotifyArtistImgs: artist.images,
        type: artist.type,
      });
    }

    return parsedArtists;
  }

  /**
   * Gets all the user library in one single array.
   * @returns
   */
  async getMySavedTracksFull(): Promise<SpotifyApi.SavedTrackObject[]> {
    const tracks: SpotifyApi.SavedTrackObject[] = [];
    const limit = 50;
    let offset = 0;

    while (true) {
      const res = await this.getMySavedTracks({ limit, offset });
      tracks.push(...res.items);

      if (res.total < offset) {
        break;
      }
      offset += limit;
    }

    return tracks;
  }
}
/**
 * Parses an album release date response into a JS Date object
 * @param date: Spotify Date String
 * @param precision: Spotify Precision String
 * @returns A Date
 */
function parseReleaseDate(date: string, precision: string): Date {
  switch (precision) {
    case "year":
      return parse(date, "yyyy", new Date());
    case "day":
      return parse(date, "yyyy-MM-dd", new Date());
    default:
      return new Date(-1);
  }
}
