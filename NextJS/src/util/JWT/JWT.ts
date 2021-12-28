import { getSpotifyUser } from "backendLogic/spotify/getSpotifyUser";
import { backendDB } from "data/backendDB/BackendDB";
import env from "env";
import { jwtBody } from "interfaces/JWT";
import {
  AuthTokenJWTResponse,
  AuthTokenResponse,
} from "interfaces/oauth2Responses";

import jwt from "jsonwebtoken";
import { BiBody } from "react-icons/bi";
export default class JWT {
  static async addTokenToAuthResponse(
    response: AuthTokenResponse
  ): Promise<[AuthTokenJWTResponse | null, any]> {
    const [token, err] = await this.createSignedToken(response);

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

  static verify(token: string): jwtBody | null {
    try {
      const res = jwt.verify(token, env.JWT_SIGN_KEY);
      return this.decode(token);
    } catch (e) {
      return null;
    }
  }

  static decode(token: string): jwtBody | null {
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

  static async createSignedToken(
    response: AuthTokenResponse
  ): Promise<[string | null, any]> {
    const [user, err] = await getSpotifyUser(response.access_token);

    if (!user || err) {
      return [null, err];
    }

    const spotifyId = user.id;
    const userId = spotifyId;
    const isPremium = user.product === "premium";
    const isAdmin = await backendDB.isUserAdmin(spotifyId);

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
}
