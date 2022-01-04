import axios from "axios";
import { IRestClient, RestError } from "interfaces/RestClient";
import { parseAxiosError } from "util/axios/parseError";
import cfg from "config";
export class BackendDBClient implements IRestClient {
  jwt: string;
  headers: {};
  constructor(jwt: string) {
    const jwtStatus = this._checkJWT(jwt);
    if (jwtStatus) {
      throw "Empty of Null JWT";
    }

    this.jwt = jwt;
    this.headers = { Authorization: "Bearer " + this.jwt };
  }

  _buildTagMap(res: any): Map<string, string[]> | null {
    const tags = new Map<string, string[]>();
    try {
      const taggedAlbums = res.data.tags;

      for (const taggedAlbum of taggedAlbums) {
        tags.set(taggedAlbum.id, taggedAlbum.tags);
      }
      return tags;
    } catch (e) {
      return null;
    }
  }

  /**
   * Gets all the album tags of a user
   * @param jwt: Signed Json Token
   * @returns A map that identifies the tags
   */
  async getAllAlbumTags(): Promise<
    [Map<string, string[]> | null, null | RestError]
  > {
    try {
      const res = await axios.get(cfg.api_endpoints.database.get_album_tags, {
        headers: this.headers,
      });

      const tags = this._buildTagMap(res);

      if (!tags) {
        return [
          null,
          {
            status: 500,
            message: "There was an error while parsing the response",
          },
        ];
      }
      return [tags, null];
    } catch (e) {
      return [null, this.parse(e)];
    }
  }

  /**
   * Bulk Updates multiple album tags given an array of album ids and tags
   * @param albums
   * @returns
   */
  async updateAlbumTags(
    albums: { id: string; tags: string[] }[]
  ): Promise<[Map<string, string[]> | null, RestError | null]> {
    try {
      const res = axios.post(
        cfg.api_endpoints.database.post_album_tags,
        albums,
        { headers: this.headers }
      );

      const tags = this._buildTagMap(res);

      if (!tags) {
        return [
          null,
          {
            status: 500,
            message: "There was an error while parsing the response",
          },
        ];
      }
      return [tags, null];
    } catch (e) {
      return [null, this.parse(e)];
    }
  }

  _checkJWT(jwt: string): null | RestError {
    if (!jwt || jwt.length === 0) {
      return { status: 403, message: "The JWT Token is empty" };
    }
    return null;
  }

  parse(e: any): RestError {
    return parseAxiosError(e);
  }
}
