import jwtFromHeader from "backendLogic/httpHeader/jwtFromHeader";
import { backendDB } from "data/backendDB/BackendDB";
import ApiError from "interfaces/apiError";
import { NextApiRequest, NextApiResponse } from "next";

interface IRes {
  message: string;
}

const tagAlbums = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | IRes>
) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST is the only method allowed" });
  }

  // Verify the Header Token
  const [jwt, jwtErr] = jwtFromHeader(req.headers);

  if (jwtErr || !jwt) {
    return res.status(403).json({ error: jwtErr });
  }

  const userId = jwt.spotify_id;
  const dropped = await backendDB.dropUser(userId);

  if (!dropped) {
    return res.status(400).json({ error: "The user couldn't be dropped" });
  }

  return res.status(200).json({ message: "User successfully dropped" });
};

export default tagAlbums;
