import type { NextApiRequest, NextApiResponse } from "next";
import Oauth2Backend from "util/Oauth2/Oauth2Backend";
import env from "env";
import { RefreshTokenResponse } from "interfaces/oauth2Responses";
import ApiError from "interfaces/apiError";
const refresh = async (
  req: NextApiRequest,
  res: NextApiResponse<RefreshTokenResponse | ApiError>
) => {
  const { refreshToken } = req.body;

  if (!refreshToken || refreshToken.length === 0) {
    res.status(400).json({ error: "Empty Refresh Token" });
  }

  const oauth = new Oauth2Backend(env.SPOTIFY_SECRET, env.SPOTIFY_PUBLIC);

  const tokenURL = "https://accounts.spotify.com/api/token";

  const [token, err] = await oauth.refreshToken(tokenURL, refreshToken);

  if (err || !token) {
    res.status(400).json(err);
  } else {
    res.status(200).json(token);
  }
};

export default refresh;
