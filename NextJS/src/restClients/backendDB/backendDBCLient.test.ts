import axios from "axios";
import { getOauth } from "util/spotify/oauthFrontend";
import { BackendDBClient } from "./backendDBclient";
import env, { envtest } from "env";

export default describe("BackendDB Rest Client Tests", () => {
  let jwt = "";
  const db = new BackendDBClient();
  axios.defaults.adapter = require("axios/lib/adapters/http");
  axios.defaults.baseURL = envtest.TEST_BASE_URL;
  beforeAll(async () => {
    const oauth = getOauth();
    const [res, err] = await oauth.refreshAuthToken(
      envtest.SPOTIFY_REFRESH_ENDPOINT,
      envtest.SPOTIFY_REFRESH_TOKEN
    );

    expect(err).toBe(null);

    jwt = res?.token || "";
  });

  test("GetAlbumTags bad token", async () => {
    const [res, err] = await db.getAllAlbumTags("asdf");

    expect(res).toBeNull();
    expect(err).not.toBeNull();
    expect(err?.status).toBe(403);
  });

  test("GetAlbumTags good token", async () => {
    const [res, err] = await db.getAllAlbumTags(jwt);
    expect(res).not.toBeNull();
    expect(err).toBeNull();
    expect(res?.size).toBeGreaterThan(0);
  });

  test("PutAlbumTags good token", async () => {
    const [res, err] = await db.updateAlbumTags(jwt, [
      { id: "ABC", tags: ["A", "B", "C", "D"] },
    ]);

    expect(res).not.toBeNull();
    expect(err).toBeNull();
    expect(res?.size).toBeGreaterThan(0);
    expect(res?.get("ABC")?.length).toBe(4);
  });
});
