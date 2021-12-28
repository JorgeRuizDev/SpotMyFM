import jwtFromHeader from "backendLogic/httpHeader/jwtFromHeader";
import env from "env";
import ApiError from "interfaces/apiError";
import { LastfmTag } from "interfaces/lastFM";
import { NextApiRequest, NextApiResponse } from "next";
import { LastfmClient } from "restClients/lastFM/lastfmClient";
import asyncPool from "tiny-async-pool";

import JWT from "util/JWT/JWT";

interface ITagPetition {
  album_name: string;
  artist_name: string;
}

export interface ITagResponse extends ITagPetition {
  tags: { name: string; url: string }[];
}

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ITagResponse[]>
) => {
  // Check the method
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST is the only method allowed" });
  }

  // Verify the Header Token
  const [jwt, jwtErr] = jwtFromHeader(req.headers);

  if (jwtErr || !jwt) {
    res.status(403).json({ error: jwtErr });
    return;
  }
  const body: { albums: ITagPetition[] } = req.body || { albums: [] };

  if (!body.albums) {
    return res
      .status(400)
      .json({ error: "There is no albums attribute in the request body" });
  }

  const api = new LastfmClient(env.LASTFM_KEY);

  console.log(body);

  if (body.albums.length > 50) {
    res
      .status(400)
      .json({ error: "The number of albums exceeds the limit (50)" });
  }

  const tagged: ITagResponse[] = [];

  await asyncPool(3, body.albums, async (album) => {
    const [res, err] = await api.getAlbumTags(
      album.artist_name,
      album.album_name
    );

    if (res) {
      tagged.push({ ...album, tags: res });
    }
  });

  // Parse the body

  if (jwtErr || !jwt) {
    res.status(400).json({ error: jwtErr });
    return;
  }

  res.status(200).json(tagged);
};

export default auth;
