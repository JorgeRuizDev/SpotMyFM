import type { NextApiRequest, NextApiResponse } from "next";
import Oauth2Backend from "util/Oauth2/Oauth2Backend";
import env from "env";
import {
  AuthTokenJWTResponse,
  AuthTokenResponse,
} from "interfaces/oauth2Responses";
import ApiError from "interfaces/apiError";
import JWT from "util/JWT/JWT";
import { backendDB } from "data/backendDB/BackendDB";

const refresh = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthTokenJWTResponse | ApiError>
) => {
  const { refreshToken } = req.body;

  if (!refreshToken || refreshToken.length === 0) {
    res.status(400).json({ error: "Empty Refresh Token" });
  }

  const oauth = new Oauth2Backend(env.SPOTIFY_SECRET, env.SPOTIFY_PUBLIC);

  const tokenURL = "https://accounts.spotify.com/api/token";

  const [token, err] = await oauth.refreshToken(tokenURL, refreshToken);

  if (err || !token) {
    return res.status(400).json(err);
  }

  const authToken: AuthTokenResponse = {
    ...token,
    token_type: "bearer",
    refresh_token: refreshToken,
  };

  const [authJwtToken, jwtErr] = await JWT.addTokenToAuthResponse(
    authToken,
    backendDB
  );

  if (jwtErr || !authJwtToken) {
    res.status(400).json(jwtErr);
  } else {
    res.status(200).json(authJwtToken);
  }
};

export default refresh;
