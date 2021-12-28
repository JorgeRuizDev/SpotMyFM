import jwtFromHeader from "backendLogic/httpHeader/jwtFromHeader";
import env from "env";
import ApiError from "interfaces/apiError";
import { LastfmTag } from "interfaces/lastFM";
import { NextApiRequest, NextApiResponse } from "next";
import { LastfmClient } from "restClients/lastFM/lastfmClient";

import JWT from "util/JWT/JWT";



interface ITagPetition {
  album_name: string;
  artist_name: string;
}

interface ITagResponse extends ITagPetition {
  tags: { name: string; url: string }[];
}

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ITagResponse[]>
) => {
  // Check the method
  if (req.method !== "GET") {
    res.status(405).json({ error: "GET is the only method allowed" });
  }

  const api = new LastfmClient(env.LASTFM_KEY);

  // Verify the Header Token
  const [jwt, jwtErr] = jwtFromHeader(req.headers);

  const body: { albums: ITagPetition[] } = req.body || { albums: [] };

  if (body.albums.length > 50){
    res.status(400).json({error: "The number of albums exceeds the limit (50)"})
  }

  const tagged: ITagResponse[] = [];

  for (const album of body.albums) {
    const [res, err] = await api.getAlbumTags(
      album.artist_name,
      album.album_name
    );

    if (err || !res) {
      continue;
    }
    tagged.push({ ...album, tags: res });
  }

  // Parse the body

  if (jwtErr || !jwt) {
    res.status(400).json({ error: jwtErr });
    return;
  }

  res.status(200).json(tagged);
};

export default auth;
