import env from "env";
import ApiError from "interfaces/apiError";
import { IMirResult } from "interfaces/ludwig";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cfg from "config";
import asyncPool from "tiny-async-pool";
import _ from "lodash";
import { backendDB } from "../../../../data/backendDB/BackendDB";

interface IBulkRequest {
  tracks: { id: string; url: string }[];
  moods: boolean;
  genres: boolean;
}

interface ILudwigResponse {
  tracks: {
    id: string;
    moods: IMirResult[];
    genres: IMirResult[];
    subgenres: IMirResult[];
  }[];
}

export interface IResponse {
  tracks: {
    id: string;
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
  res: NextApiResponse<ApiError | IResponse | {}>
) => {

  if (req.method == "OPTIONS") {
    return res.status(200).json({});
  }

  // Check the method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST is the only method allowed" });
  }



  // Get the body from the petition
  const body: IBulkRequest = req.body;

  // Check that the body has an albums attribute
  if (!body.tracks || body.tracks.length == 0) {
    return res
      .status(400)
      .json({ error: "There are no tracks in the request body" });
  }

  const [database_res, error] = await backendDB.getTracksDetails(
    body.tracks.map((t) => t.id)
  );

  let missingTracks: { id: string; url: string }[] = [];
  let trackDetails: {
    id: string;
    genres: IMirResult[];
    moods: IMirResult[];
    subgenres: IMirResult[];
  }[] = [];

  if (error || !database_res) {
    console.error("Error getting tracks from database", error);
    missingTracks = body.tracks;
  } else {
    const missing_ids = database_res[1];
    missingTracks = body.tracks.filter((t) => missing_ids.includes(t.id));

    //@ts-ignore
    trackDetails = database_res[0].map((t) => {
      return {
        id: t.PK,
        genres:
          t.genres?.map((g) => ({
            label: g.label,
            confidence: g.confidence,
          })) || [],
        moods: [
          t.happy,
          t.sad,
          t.acoustic,
          t.aggressive,
          t.relaxed,
          t.electronic,
        ],
        subgenres: t.subgenres,
      };
    });
  }

  const chunks = _.chunk(missingTracks, 25);

  let failures = 0;
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

      const data: ILudwigResponse = response.data;
      const [_, putError] = await backendDB.addTrackDetails(data.tracks);

      if (putError) {
        console.error(putError);
      } else {
        console.log("Successfully added tracks to DB");
      }
      trackDetails.push(...data.tracks);
    } catch (e) {
      failures++;
      console.error(e);
    }
  });

  if (failures > 0 && failures == chunks.length) {
    return res.status(400).json({
      error: `Track analysis for ${body.tracks.length} tracks failed`,
    });
  }

  res.status(200).json({
    tracks: trackDetails,
  });
};

export default bulk;
