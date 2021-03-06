import { getSpotifyUser } from "backendLogic/spotify/getSpotifyUser";
import { IBackendDB } from "data/backendDB/BackendDB";
import env from "env";
import { jwtBody } from "interfaces/JWT";
import {
  AuthTokenJWTResponse,
  AuthTokenResponse,
} from "interfaces/oauth2Responses";

import jwt from "jsonwebtoken";

async function addTokenToAuthResponse(
  response: AuthTokenResponse,
  db: IBackendDB
): Promise<[AuthTokenJWTResponse | null, any]> {
  const [token, err] = await createSignedToken(response, db);

  if (!token || err) {
    return [null, err];
  }

  return [
    {
      ...response,
      token,
    },
    null,
  ];
}

function verify(token: string): jwtBody | null {
  try {
    jwt.verify(token, env.JWT_SIGN_KEY);
    return decode(token);
  } catch (e) {
    return null;
  }
}

function decode(token: string): jwtBody | null {
  const decoded = jwt.decode(token, { json: true });

  if (!decoded) {
    return null;
  }
  const t = decoded;

  try {
    const body: jwtBody = {
      access_token: t["access_token"],
      expires_in: parseInt(t["expires_in"]),
      is_admin: !!t["is_admin"],
      is_premium: !!t["is_premium"],
      spotify_id: t["spotify_id"],
      user_id: t["user_id"],
      refresh_token: t["refresh_token"],
      token_type: t["token_type"],
      scope: t["scope"],
    };

    return body;
  } catch (e) {
    return null;
  }
}

async function createSignedToken(
  response: AuthTokenResponse,
  db: IBackendDB
): Promise<[string | null, any]> {
  const [user, err] = await getSpotifyUser(response.access_token);

  if (!user || err) {
    return [null, err];
  }

  const spotifyId = user.id;
  const userId = spotifyId;
  const isPremium = user.product === "premium";

  const isAdmin = await db.isUserAdmin(spotifyId);

  const token: jwtBody = {
    ...response,
    is_admin: isAdmin,
    spotify_id: spotifyId,
    is_premium: isPremium,
    user_id: userId,
  };

  const signed = jwt.sign(token, env.JWT_SIGN_KEY, {
    expiresIn: response.expires_in,
  });

  return [signed, null];
}

const JWT = { createSignedToken, verify, decode, addTokenToAuthResponse };

export default JWT;
