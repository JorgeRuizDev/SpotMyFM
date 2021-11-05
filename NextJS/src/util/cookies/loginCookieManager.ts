import Cookies from "js-cookie";
import cfg from "config";

/**
 * Saves the Spotify Token in a browser cookie.
 * @param token Spotify Auth Token.
 * @param lifespan lifespan in seconds.
 */
function saveAuthToken(token: string, lifespan: number) {
  const expireDate = new Date(new Date().getTime() + (lifespan - 15) * 1000);
  Cookies.set(cfg.cookie_spotify_auth, token, { expires: expireDate });
}

/**
 * Loads the auth token from the cookie storage
 * @returns Spotify Auth Token
 */
function loadAuthToken() {
  return Cookies.get(cfg.cookie_spotify_auth);
}

/**
 * Saves the spotify refresh token in a broweser cookie
 * @param token Current spotify token
 */
function saveRefreshToken(token: string) {
  Cookies.set(cfg.cookie_spotify_refresh, token, { expires: 14 });
}

/**
 * Loads the refresh token from the cookie storage
 * @returns Spotify Refresh Token
 */
function loadRefreshToken() {
  return Cookies.get(cfg.cookie_spotify_refresh);
}

/**
 * Removes every cookie from the current storage
 */
function removeAll() {
  Cookies.remove(cfg.cookie_spotify_auth);
  Cookies.remove(cfg.cookie_spotify_refresh);
}

const functions = {
  saveAuthToken,
  loadAuthToken,
  saveRefreshToken,
  loadRefreshToken,
  removeAll,
};

export default functions;
