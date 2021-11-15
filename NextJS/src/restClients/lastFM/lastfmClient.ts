import axios from "axios";
import { ILastFMAlbum, LastfmTag } from "interfaces/lastFM";
import { IRestClient, RestError } from "interfaces/RestClient";
import { parseAxiosError } from "util/axios/parseError";

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
      const tags = res.data?.toptags?.tag;
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
    album: string
  ): Promise<[null | ILastFMAlbum, RestError | null]> {
    const params = {
      method: "album.getinfo",
      artist: artist,
      album: album,
      api_key: this.key,
      format: "json",
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

  public parse(e: any) {
    return parseAxiosError(e);
  }
}
