import jwtFromHeader from "backendLogic/httpHeader/jwtFromHeader";
import { backendDB } from "data/backendDB/BackendDB";
import ApiError from "interfaces/apiError";
import { NextApiRequest, NextApiResponse } from "next";

export interface ITaggedAlbum {
  id: string;
  tags: string[];
}

interface ITagAlbumsResponse {
  albums: ITaggedAlbum[];
}

interface IPutResponse {
  tags: ITaggedAlbum[];
}

const tagAlbums = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ITagAlbumsResponse | IPutResponse | {}>
) => {
  if (req.method == "OPTIONS") {
    return res.status(200).json({});
  }

  // Verify the Header Token
  const [jwt, jwtErr] = jwtFromHeader(req.headers);

  if (jwtErr || !jwt) {
    return res.status(403).json({ error: jwtErr });
  }

  const userId = jwt.spotify_id;

  switch (req.method) {
    case "POST":
      const { albums } = req.body;
      if (!albums || !albums.length) {
        return res
          .status(400)
          .json({ error: "No albums attribute in the request body" });
      }

      if (albums.length > 50) {
        return res
          .status(400)
          .json({ error: "Tags Exceed the maximin number (50)" });
      }

      const [putRes, putErr] = await backendDB.putAlbumTags(userId, albums);

      if (putErr || !putRes) {
        return res.status(400).json({ error: putErr });
      }
      return res.status(200).json({ tags: albums });

    case "GET":
      const [dbRes, dbErr] = await backendDB.getAllAlbumTags(userId);

      if (dbErr || !dbRes) {
        return res.status(400).json({ error: dbErr });
      }
      return res.status(200).json({ tags: dbRes });

    default:
      return res
        .status(405)
        .json({ error: "POST / GET Are the only methods allowed" });
  }
};

export default tagAlbums;
