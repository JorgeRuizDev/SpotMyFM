import { IRestClient, RestError } from "interfaces/RestClient";
import { parseAxiosError } from "util/axios/parseError";
import cfg from "config";
import env from "env";
import { IMirResult } from "interfaces/ludwig";
import axios from "util/axios/axios";

interface ILudwigTrack {
  spotifyId: string;
  spotifyPreviewURL: string;
}

interface ILudwigResponse {
  genres: IMirResult[];
  moods: IMirResult[];
  subgenres: IMirResult[];
}

export class LudwigClient implements IRestClient {
  LudwigClient() {}

  getHeaders() {
    return {
      accept: "application/json",
      
      "Content-Type": "application/json",
    };
  }

  async getTrackDetails(
    track: ILudwigTrack,
    moods: boolean,
    genres: boolean
  ): Promise<any> {
    const response = await axios.post(
      cfg.api_endpoints.ludwig_mir.track_single,
      {
        moods: moods,
        genres: genres,
        id: track.spotifyId,
        url: track.spotifyPreviewURL,
      },
      {
        headers: this.getHeaders(),
      }
    );

    const data = response.data;

    return {
      genres: data.genres || [],
      moods: data.moods || [],
      subgenres: data.subgenres || [],
    };
  }

  async getTrackDetailsBulk(
    tracks: ILudwigTrack[],
    moods: boolean,
    genres: boolean
  ) {
    const response = await axios.post(
      cfg.api_endpoints.ludwig_mir.track_bulk,
      {
        moods: moods,
        genres: genres,
        tracks: tracks.map((t) => ({
          id: t.spotifyId,
          url: t.spotifyPreviewURL,
        })),
      },
      {
        headers: this.getHeaders(),
      }
    );
  }

  parse(e: any): RestError {
    return parseAxiosError(e);
  }
}
