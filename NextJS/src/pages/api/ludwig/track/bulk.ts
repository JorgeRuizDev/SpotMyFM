import env from "env";
import ApiError from "interfaces/apiError";
import { IMirResult } from "interfaces/ludwig";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cfg from "config";
import asyncPool from "tiny-async-pool";
import _ from "lodash";
interface IBulkRequest {
  tracks: { id: string; url: string }[];
  moods: boolean;
  genres: boolean;
}

export interface IResponse {
  tracks: {
    genres: IMirResult[];
    moods: IMirResult[];
    subgenres: IMirResult[];
  }[];
}
/**
 * It takes a POST request with a body containing an array of tracks, and returns an array of tracks
 * with the moods and genres of each track
 * @param {NextApiRequest} req - NextApiRequest
 * @param res - NextApiResponse<ApiError | IResponse>
 * @returns An array of tracks
 */

const bulk = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | IResponse>
) => {
  // Check the method
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST is the only method allowed" });
  }

  // Get the body from the petition
  const body: IBulkRequest = req.body;

  // Check that the body has an albums attribute
  if (!body.tracks) {
    return res
      .status(400)
      .json({ error: "There are no tracks in the request body" });
  }

  const chunkLength =
    body.tracks.length > 20 ? Math.ceil(body.tracks.length / 10) : 10;

  const chunks = _.chunk(body.tracks, chunkLength);

  const responseTracks: any[] = [];

  await asyncPool(Math.max(chunks.length, 1), chunks, async (chunk) => {
    try {
      const response = await axios.post(
        `${env.LUDWIG_BASE_URL}/${cfg.api_endpoints.ludwig.track_bulk}`,
        {
          moods: body.moods || false,
          genres: body.genres || false,
          tracks: chunk,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${env.LUDWIG_SECRET}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      responseTracks.push(...data.tracks);
    } catch (e) {
      console.error(e);
    }
  });

  res.status(200).json({
    tracks: responseTracks,
  });
};

export default bulk;
