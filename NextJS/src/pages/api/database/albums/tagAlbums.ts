import jwtFromHeader from "backendLogic/httpHeader/jwtFromHeader";
import { backendDB } from "data/backendDB/BackendDB";
import { DynamoDB } from "data/backendDB/dynamoDB/DynamoDB";
import ApiError from "interfaces/apiError";
import { NextApiRequest, NextApiResponse } from "next";
import { BackendDB } from "restClients/backendDB/backendDB";

export interface ITaggedAlbum {
  id: string;
  tags: string[];
}

interface ITagAlbumsResponse {
  albums: ITaggedAlbum[];
}

const tagAlbums = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ITagAlbumsResponse | { ok: "ok" }>
) => {
  // Verify the Header Token
  const [jwt, jwtErr] = jwtFromHeader(req.headers);

  if (jwtErr || !jwt) {
    return res.status(403).json({ error: jwtErr });
  }

  const userId = jwt.spotify_id;

  switch (req.method) {
    case "POST":
      const { tags } = req.body;
      const [putRes, putErr] = await backendDB.putAlbumTags(userId, tags);

      if (putErr || !putRes) {
        return res.status(400).json({ error: putErr });
      }
      return res.status(200).json({ ok: "ok" });

    case "GET":
      const [dbRes, dbErr] = await backendDB.getAllAlbumTags(userId);

      if (dbErr || !dbRes) {
        return res.status(400).json({ error: dbErr });
      }
      return res.status(200).json({ albums: dbRes });

    default:
      return res
        .status(405)
        .json({ error: "POST / GET Are the only methods allowed" });
  }
};

export default tagAlbums;
