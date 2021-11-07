import SpotifyWebApi from "spotify-web-api-node";

/**
 * Given a spotify api token, get the api token user Id.
 * @param spotifyApiToken Spotify Token
 * @returns
 */
export async function getSpotifyUserId(
  spotifyApiToken: string = ""
): Promise<[string | null, any]> {
  if (spotifyApiToken === null || spotifyApiToken.length === 0) {
    return ["", "Empty Token!"];
  }

  try {
    // Configure the api
    // TODO: Replace the object with the improved one
    const api = new SpotifyWebApi();
    api.setAccessToken(spotifyApiToken);

    // Get the user and return
    const user = await api.getMe();
    return [user.body.id, null];
  } catch (e) {
    // TODO: Parse the error

    return [null, e];
  }
}
