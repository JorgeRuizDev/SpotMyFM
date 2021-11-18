import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import _ from "lodash";
import SpotifyWebApi from "spotify-web-api-js";
import { parse } from "date-fns";

/**
 * Spotify Api Rest Client
 */
export class SpotifyClient extends SpotifyWebApi {
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
    const albums = [];
    for (const idChunk of _.chunk(albumIds, 20)) {
      const res = await this.getAlbums(idChunk);
      albums.push(...res.albums);
    }

    return albums;
  }

  /**
   * Fetches the complete object from a list of ids.
   * @param artistIds
   * @returns
   */
  async getFullArtists(
    artistIds: string[]
  ): Promise<SpotifyApi.ArtistObjectFull[]> {
    const artists = [];
    for (const idChunk of _.chunk(artistIds, 50)) {
      const res = await this.getArtists(idChunk);
      artists.push(...res.artists);
    }

    return artists;
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
        type: artist.type,
      });
    }

    return parsedArtists;
  }

  async getMySavedTracksFull(): Promise<SpotifyApi.TrackObjectFull[]> {
    const tracks: SpotifyApi.TrackObjectFull[] = [];
    const limit = 50;
    let offset = 0;

    while (true) {
      const res = await this.getMySavedTracks({ limit, offset });
      tracks.push(...res.items.map((t) => t.track));

      if (res.total < offset) {
        break;
      }
      offset += limit;
    }

    return tracks;
  }

  /**
   * Parses an album release date response into a JS Date object
   * @param date: Spotify Date String
   * @param precision: Spotify Precision String
   * @returns A Date
   */
  private parseReleaseDate(date: string, precision: string): Date {
    switch (precision) {
      case "year":
        return parse(date, "yyyy", new Date());
      case "day":
        return parse(date, "yyyy-MM-dd", new Date());
      default:
        return new Date(-1);
    }
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
