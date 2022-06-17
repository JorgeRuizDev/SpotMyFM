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
  album_id: string;
}

const MAX_ALBUMS_PER_REQ = 50;

export interface ITagResponse {
  album_id: string;
  tags: { name: string; url: string }[];
}

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ITagResponse[]>
) => {
  // Check the method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST is the only method allowed" });
  }

  // Verify the Header Token
  const [jwt, jwtErr] = jwtFromHeader(req.headers);

  if (jwtErr || !jwt) {
    res.status(403).json({ error: jwtErr });
    return;
  }

  // Get the body from the petition
  const body: { albums: ITagPetition[] } = req.body || { albums: [] };

  // Check that the body has an albums attribute
  if (!body.albums) {
    return res
      .status(400)
      .json({ error: "There is no albums attribute in the request body" });
  }

  // Initialize the lastFM API
  const api = new LastfmClient(env.LASTFM_KEY);

  // Check that the ammount of albums does not exceed the limmit
  if (body.albums.length > MAX_ALBUMS_PER_REQ) {
    return res.status(400).json({
      error: `The number of albums exceeds the limit (${MAX_ALBUMS_PER_REQ})`,
    });
  }

  const tagged: ITagResponse[] = [];

  await asyncPool(4, body.albums, async (album) => {
    const [res_, err] = await api.getAlbumTags(
      album.artist_name,
      album.album_name
    );

    if (res_) {
      tagged.push({ tags: res_, album_id: album.album_id });
    } else {
      console.error(err?.message);
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
