import { renderHook } from "@testing-library/react-hooks";
import { useClientsStore } from "store/useClients";
import axios from "axios";
import { SpotifyClient } from "restClients/spotify/spotifyClient";
import { envtest } from "env";
import { getOauth } from "util/spotify/oauthFrontend";
import { useDataFacade } from "./useDataFacade";
export default describe("data facade hook test", () => {
  const { result } = renderHook(() => useDataFacade());

  let spotifyApi = new SpotifyClient();

  // Fixes an Axios ENV problem:
  axios.defaults.adapter = require("axios/lib/adapters/http");

  beforeAll(async () => {
    const oauth = getOauth();
    const [res, err] = await oauth.refreshAuthToken(
      envtest.SPOTIFY_REFRESH_ENDPOINT,
      envtest.SPOTIFY_REFRESH_TOKEN
    );

    expect(err).toBe(null);
    spotifyApi.setAccessToken(res?.access_token || "");
  });

  test("getTracks", async () => {
    try {
      const tracks = await spotifyApi.getMyTopTracks({ limit: 50 });
      const cached = result.current.getTracks(tracks.items);
      console.log(cached);
    } catch (e) {
      console.error(e);
      expect(null).toBe("");
    }
  });
});
