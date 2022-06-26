import axios from "util/axios";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { ILastFMAlbum, ILastFMArtist, LastfmTag } from "interfaces/lastFM";
import { IRestClient, RestError } from "interfaces/RestClient";
import { parseAxiosError } from "util/axios/parseError";
import cfg from "config";
import { ITagResponse } from "pages/api/lastFM/getBulkAlbumTags";

export class LastfmClient implements IRestClient {
  private key: string;
  private apiUrl = "https://ws.audioscrobbler.com/2.0/";

  constructor(apiKey: string) {
    if (!apiKey || apiKey.length == 0) {
      throw "Empty Api Key";
    }
    this.key = apiKey;
  }

  /**
   *
   * @param albums
   * @param token
   * @returns
   */
  async getBulkAlbumTags(
    albums: Album[],
    token: string
  ): Promise<[null | Album[], RestError | null]> {
    if (albums.length > 50) {
      return [
        null,
        { message: "The number of Albums exceeds the limit (50)", status: 400 },
      ];
    }

    const albumMap = new Map<string, Album>();

    // Put the albums into a map indexed by {name:artist}
    for (const album of albums) {
      albumMap.set(album.spotifyId, album);
    }

    const requestBody = {
      albums: albums.map((a) => ({
        album_name: a.name,
        artist_name: a.artists[0].name,
        album_id: a.spotifyId,
      })),
    };

    // POST the Albums
    const res = await axios.post(cfg.last_bulk_tags, requestBody, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status != 200 || !res.data || res.data.length == 0) {
      return [
        null,
        { status: res.status, message: res.data?.error || res.data },
      ];
    }

    for (const tag_res of res.data) {
      const tag: ITagResponse = tag_res;
      const album = albumMap.get(tag.album_id);

      if (album && tag.tags) {
        album.lastfmTagsFull = tag.tags;
        album.lastfmTagsNames = tag.tags.map((t) => t.name);
      }
    }

    return [Array.from(albumMap.values()), null];
  }

  /**
   * Feches the album tags from LastFM Api
   * @param artist name
   * @param album name
   * @returns An array with the response or the error
   */
  async getAlbumTags(
    artist: string,
    album: string
  ): Promise<[null | LastfmTag[], RestError | null]> {
    const params = {
      method: "album.gettoptags",
      artist: artist,
      album: album,
      api_key: this.key,
      format: "json",
    };

    try {
      const res = await axios.get(this.apiUrl, { params });
      const tags = res.data?.toptags?.tag || [];
      const returnTags: LastfmTag[] = [];

      // Get up to 12 tags
      for (let i = 0; i < Math.min(tags.length, 12); i++) {
        returnTags.push({ name: tags[i]?.name, url: tags[i]?.url });
      }

      return [returnTags, null];
    } catch (e) {
      return [null, this.parse(e)];
    }
  }

  /**
   * Gets the LastFM album details
   * @param artist name
   * @param album name
   * @returns Album Details
   */
  async getAlbumDetails(
    artist: string,
    album: string,
    lang = "en"
  ): Promise<[null | ILastFMAlbum, RestError | null]> {
    const params = {
      method: "album.getinfo",
      artist: artist,
      album: album,
      api_key: this.key,
      format: "json",
      lang: lang,
    };

    try {
      const res = await axios.get(this.apiUrl, { params });
      const data = res.data.album;

      return [
        {
          lastfmDescription: data?.wiki?.content,
          lastfmListenersCount: parseInt(data.listeners),
          lastfmPlayCount: parseInt(data.playcount),
          lastfmURL: data.url,
        },
        null,
      ];
    } catch (e) {
      return [null, this.parse(e)];
    }
  }

  /**
   * Gets Artist Details from LastFM API
   * @param artist: Artist Name
   * @param lang : Language to try and fetch
   * @returns
   */
  async getArtistDetails(
    artist: string,
    lang = "en"
  ): Promise<[ILastFMArtist | null, RestError | null]> {
    const params = {
      method: "artist.getinfo",
      artist: artist,
      api_key: this.key,
      format: "json",
      lang: lang,
    };

    try {
      const res = await axios.get(this.apiUrl, { params });
      const { name, stats, tags, bio, url } = res.data.artist;

      return [
        {
          name: name,
          plays: stats.playcount,
          listeners: stats.listeners,
          bio,
          url,
          tags: tags.tag,
        },
        null,
      ];
    } catch (e) {
      return [null, this.parse(e)];
    }
  }

  public parse(e: any) {
    return parseAxiosError(e);
  }
}
