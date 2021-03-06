import { IRestClient, RestError } from "interfaces/RestClient";
import { parseAxiosError } from "util/axios/parseError";
import cfg from "config";
import env from "env";
import { IMirResult } from "interfaces/ludwig";
import axios from "util/axios/axios";

interface ILudwigTrack {
  spotifyId: string;
  spotifyPreviewURL?: string | null;
}

interface ILudwigResponse {
  genres: IMirResult[];
  moods: IMirResult[];
  subgenres: IMirResult[];
}

interface IRecItem {
  id: string;
  spotify_ids: string[];
}

/**
 * Ludwig Backend Rest client
 */
export class LudwigClient implements IRestClient {
  LudwigClient() {}

  getHeaders() {
    return {
      accept: "application/json",

      "Content-Type": "application/json",
    };
  }

  /**
   * It takes in a track object, and two booleans, and returns an array of two elements, the first being
   * a response object, and the second being an error object.
   *
   * @param {ILudwigTrack} track - ILudwigTrack,
   * @param {boolean} moods - boolean,
   * @param {boolean} genres - boolean
   * @returns An array of two elements. The first element is an object with three properties: genres,
   * moods, and subgenres. The second element is null.
   */
  async getTrackDetails(
    track: ILudwigTrack,
    moods: boolean,
    genres: boolean
  ): Promise<[ILudwigResponse | null, RestError | null]> {
    if (!track.spotifyPreviewURL) {
      return [{ genres: [], subgenres: [], moods: [] }, null];
    }

    try {
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

      return [
        {
          genres: data.genres || [],
          moods: data.moods || [],
          subgenres: data.subgenres || [],
        },
        null,
      ];
    } catch (e: any) {
      return [null, this.parse(e)];
    }
  }

  /**
   *  A function that takes in an array of tracks, a boolean for moods, and a boolean for genres. It
   *  returns a promise that resolves to an array of two elements. The first element is a map of track ids
   *  to ILudwigResponse objects. The second element is null.
   * @param tracks - An array of ILudwigTrack objects.
   * @param moods - If true, the response will include moods.
   * @param genres  - If true, the response will include genres.
   * @returns array of two elements. The first element is a map of track ids to ILudwigResponse objects.
   */
  async getTrackDetailsBulk(
    tracks: ILudwigTrack[],
    moods: boolean,
    genres: boolean
  ): Promise<[Map<string, ILudwigResponse> | null, RestError | null]> {
    tracks = tracks.filter((t) => t.spotifyPreviewURL);

    try {
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

      const data = response.data;

      const track_details = new Map<string, ILudwigResponse>();

      for (const track of data.tracks) {
        track_details.set(track.id, track);
      }

      return [track_details, null];
    } catch (e: any) {
      return [null, this.parse(e)];
    }
  }

  /**
   * It takes a track object, and returns an array of two elements: the first element is an object
   * containing two arrays, and the second element is either null or an error object
   *
   * A recommendation is an Spotify Track ID
   *
   * @param {ILudwigTrack} track - ILudwigTrack
   * @returns An array of two elements. The first element is an object with two properties: similar and
   * users. The second element is null.
   */
  async getRecommendation(
    track: ILudwigTrack
  ): Promise<[any | null, RestError | null]> {
    try {
      const response = await axios.post(
        cfg.api_endpoints.ludwig_mir.recommender,
        {
          id: track.spotifyId,
          url: track.spotifyPreviewURL,
        },
        {
          headers: this.getHeaders(),
        }
      );
      const data = response.data;

      return [
        {
          similar: data.similar || [],
          users: data.users || [],
        },
        null,
      ];
    } catch (e: any) {
      return [null, this.parse(e)];
    }
  }

  /**
   * It takes a track object, and returns an array of two elements: the first element is an object
   * containing two arrays, and the second element is either null or an error object
   *
   * A recommendation is an Spotify Track ID
   *
   * @param {ILudwigTrack} track - ILudwigTrack
   * @returns An array of two elements. The first element is an object with two properties: similar and
   * users. The second element is null.
   */
  async getRecommendationsBulk(
    tracks: ILudwigTrack[]
  ): Promise<[Map<string, string[]> | null, RestError | null]> {
    const ids = tracks.map((t) => t.spotifyId);

    try {
      const response = await axios.post(
        cfg.api_endpoints.ludwig_mir.recommender_bulk,
        {
          tracks: tracks.map((t) => ({
            id: t.spotifyId,
            url: t.spotifyPreviewURL,
          })),
        },
        {
          headers: this.getHeaders(),
        }
      );
      const data: { tracks: { id: string; spotify_ids: string[] }[] } =
        response.data;

      const track_recommendations = new Map<string, string[]>();

      for (const track of data.tracks) {
        track_recommendations.set(
          track.id,
          track.spotify_ids.filter((id) => !ids.includes(id))
        );
      }

      console.log(track_recommendations);
      return [track_recommendations, null];
    } catch (e: any) {
      return [null, this.parse(e)];
    }
  }

  parse(e: any): RestError {
    return parseAxiosError(e);
  }
}
