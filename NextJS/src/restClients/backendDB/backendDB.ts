import { IRestClient, RestError } from "interfaces/RestClient";
import { parseAxiosError } from "util/axios/parseError";

export class BackendDB implements IRestClient {
  getAlbumTags(
    spotifyToken: string,
    albumIds: string[]
  ): [Map<string, string[]>, null | RestError] {
    return [new Map<string, string[]>(), null];
  }

  updateAlbumTags(
    spotifyToken: string,
    albumId: string,
    tags: string[]
  ): [boolean | null, RestError] {
    return [true, null];
  }

  parse(e: any): RestError {
    return parseAxiosError(e);
  }
}
