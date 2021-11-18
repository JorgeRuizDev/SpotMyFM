import { SpotifyClient } from "./spotifyClient";
import { getOauth } from "util/spotify/oauthFrontend";
import { envtest } from "env";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

export default describe("SpotifyClient Test", () => {
  let api = new SpotifyClient();

  // Fixes an Axios ENV problem:
  axios.defaults.adapter = require("axios/lib/adapters/http");

  test("xD", () => {
    console.log("Sin nada " + new SpotifyClient().getAccessToken());
    const x = new SpotifyClient();
    x.setAccessToken("288");
    console.log("Token Asociado");
    console.log(x.getAccessToken());
    console.log(new SpotifyClient().getAccessToken());

    console.log("Original:");
    console.log(new SpotifyWebApi());
    const y = new SpotifyWebApi();
    y.setAccessToken("LA B");
    console.log(new SpotifyWebApi().getAccessToken());
    console.log(y.getAccessToken());
  });

  beforeAll(async () => {
    return;
    const oauth = getOauth();
    const [res, err] = await oauth.refreshAuthToken(
      envtest.SPOTIFY_REFRESH_ENDPOINT,
      envtest.SPOTIFY_REFRESH_TOKEN
    );

    expect(err).toBe(null);
    expect(res?.access_token.length).toBeGreaterThan(2);
    expect(res?.expires_in).toBeGreaterThan(3000);
    api.setAccessToken(res?.access_token || "");
  });

  test("Api Test", async () => {
    const res = await api.getMe();
    expect(res?.id).not.toBe(null);
  });
  jest.setTimeout(60000);
  test("getFullLibrary()", async () => {
    const res = await api.getMySavedTracksFull();
    console.log(res.length);
  });
});
