import { toast } from "react-toastify";
import Spotify from "spotify-web-api-js";
import CookieManager from "util/cookies/loginCookieManager";
import { getOauth } from "util/spotify/oauthFrontend";
import LoginCookieManager from "./loginCookieManager";
import cfg from "config";

/**
 * Reads the Auth Token from the Cookies and validates it.
 * If there is a Refresh Token, the function will try to refresh the auth token with the refresh token
 * @returns A valid auth token or null
 */
export default async function getAuthToken(): Promise<string | null> {
  let authToken = LoginCookieManager.loadAuthToken();
  let jwt = LoginCookieManager.loadJWT();
  const refreshToken = LoginCookieManager.loadRefreshToken();
  const spotifyApi = new Spotify();
  let lifespan = -1;
  const oauth = getOauth();

  // If the auth token has expired but we can refresh it
  if (authToken === undefined && refreshToken !== undefined) {
    let endpoint = cfg.api_spotify_refresh;

    if (typeof window !== "undefined") {
      endpoint = `${window.location.origin}/${endpoint}`;
    }

    const [res, err] = await oauth.refreshAuthToken(endpoint, refreshToken);

    if (err || !res) {
      CookieManager.removeAll();
      toast.error(err);
      return null;
    }

    authToken = res.access_token;
    lifespan = res.expires_in;
    jwt = res.token;
  }

  // Try using the authToken if it is still valid.
  if (authToken !== undefined && jwt !== undefined) {
    try {
      spotifyApi.setAccessToken(authToken);
      spotifyApi.getMe();

      // If we have refreshed the Auth Token: save it as a Cookie.
      if (lifespan > 0) {
        CookieManager.saveAuthToken(authToken, lifespan);
        CookieManager.saveJWT(jwt);
      }

      // Auth Token is valid:
      return authToken;
    } catch (e) {
      // If the token is not valid:
      CookieManager.removeAll();
      return null;
    }
  }

  return null;
}
