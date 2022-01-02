import { backendDB } from "data/backendDB/BackendDB";
import env from "env";
import ApiError from "interfaces/apiError";
import { AuthTokenJWTResponse } from "interfaces/oauth2Responses";
import type { NextApiRequest, NextApiResponse } from "next";
import JWT from "util/JWT/JWT";
import Oauth2Backend from "util/Oauth2/Oauth2Backend";

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthTokenJWTResponse | ApiError>
) => {
  const { redirectUri, responseCode } = req.body;

  const tokenURL = "https://accounts.spotify.com/api/token";

  const oauth = new Oauth2Backend(env.SPOTIFY_SECRET, env.SPOTIFY_PUBLIC);

  const [token, err] = await oauth.authUser(
    responseCode,
    tokenURL,
    redirectUri
  );

  if (err || !token) {
    res.status(400).json(err);
  } else {
    // Return the JWT Token
    const [jwt, jwtErr] = await JWT.addTokenToAuthResponse(token, backendDB);

    if (jwt == null || jwtErr) {
      res.status(400).json(jwtErr);
    } else {
      res.status(200).json(jwt);
    }
  }
};

export default auth;
