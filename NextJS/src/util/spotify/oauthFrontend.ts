import Oauth2Frontend from "util/Oauth2/Oauth2Frontend";
import env from "env";

/**
 * Quick functions that returns an already builded Oauth2Frontend object
 * @returns
 */
export function getOauth() {
  let callbackUri = "";

  if (typeof window !== "undefined") {
    callbackUri = `${window.location.origin}/spotify/callback`;
  }

  const oauth = new Oauth2Frontend(
    "https://accounts.spotify.com/authorize",
    env.SPOTIFY_PUBLIC,
    scopes,
    callbackUri
  );

  return oauth;
}

// Configured scopes for this api
const scopes = [
  // Images
  //"ugc-image-upload",

  // Listening History
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",

  // Spotify Connect
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  // Playback - PlaySDK
  /*
  "app-remote-control",
  "streaming",
  */

  // Playlists
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",

  // Follow
  //"user-follow-modify",
  //"user-follow-read",

  // Library
  "user-library-modify",
  "user-library-read",

  // User
  /*
  "user-read-email",
  */
  // Subscription Details
  "user-read-private",
];
