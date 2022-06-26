import env from "env";
import ApiError from "interfaces/apiError";
import { IMirResult } from "interfaces/ludwig";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cfg from "config";
interface ITagPetition {
  url: string;
  id: string;
  moods: boolean;
  genres: boolean;
}

export interface ITagResponse {
  genres: IMirResult[];
  moods: IMirResult[];
  subgenres: IMirResult[];
}

const track = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ITagResponse | {}>
) => {
  if (req.method == "OPTIONS") {
    return res.status(200).json({});
  }

  // Check the method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST is the only method allowed" });
  }

  // Get the body from the petition
  const body: { url: string; id: string; moods?: boolean; genres?: boolean } =
    req.body;

  // Check that the body has an albums attribute
  if (!body.url || !body.id) {
    return res
      .status(400)
      .json({ error: "There is no url/id attribute in the request body" });
  }

  try {
    const response = await axios.post(
      `${env.LUDWIG_BASE_URL}/${cfg.api_endpoints.ludwig.track_single}`,
      {
        moods: body.moods || false,
        genres: body.genres || false,
        url: body.url,
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
    return res.status(200).json({
      moods: data.moods || [],
      genres: data.genres || [],
      subgenres: data.subgenres || [],
    });
  } catch (e: any) {
    res.status(500).json({ error: "Error getting the track" });
  }
};

export default track;
