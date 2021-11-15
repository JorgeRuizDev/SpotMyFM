import { SpotifyClient } from "./spotifyClient";
import { getOauth } from "util/spotify/oauthFrontend";
import { envtest } from "env";
import axios from "axios";

export default describe("SpotifyClient Test", () => {
  let api = new SpotifyClient();

  // Fixes an Axios ENV problem:
  axios.defaults.adapter = require("axios/lib/adapters/http");

  beforeAll(async () => {
    const oauth = getOauth();
    const [res, err] = await oauth.refreshAuthToken(
      envtest.SPOTIFY_REFRESH_ENDPOINT,
      envtest.SPOTIFY_REFRESH_TOKEN
    );

    expect(err).toBe(null);
    console.log(res);
    expect(res?.access_token.length).toBeGreaterThan(2);
    api.setAccessToken(res?.access_token || "");
  });

  test("Api Test", async () => {
    api.getMe();
  });
});
