import { getSpotifyUserId } from "backendLogic/spotify/getSpotifyUserId";
import { backendDB } from "data/backendDB/BackendDB";
import ApiError from "interfaces/apiError";
import { NextApiRequest, NextApiResponse } from "next";

interface IIsAdmin {
  userId: string;
  isAdmin: boolean;
}

export default async function isAdmin(
  req: NextApiRequest,
  res: NextApiResponse<IIsAdmin | ApiError | {}>
) {
  const { spotifyAuthToken } = req.body;
  // Preflight Check:
  if (req.method == "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(202).json({});
  }

  // Check the Method
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const [userId, err] = await getSpotifyUserId(spotifyAuthToken);

  if (err || !userId) {
    res.status(400).json({ error: "Empty/invalid Spotify Auth Token" });
    return;
  }

  const isAdmin = await backendDB.isUserAdmin(userId);

  res.status(200).json({ userId, isAdmin });
}
