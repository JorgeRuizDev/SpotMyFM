import axios from "util/axios";
import { BackendDBClient } from "./backendDBclient";
import cfg from "config";
import mockAxios from "jest-mock-axios";
export default describe("BackendDB Rest Client Tests", () => {
  let jwt = "A.jwt.token";
  const db = new BackendDBClient();
  jest.mock("axios");
  beforeAll(async () => {});

  test("GetAlbumTags good token", async () => {
    const promise = db.getAllAlbumTags(jwt);
    mockAxios.mockResponseFor(
      { url: cfg.api_endpoints.database.get_album_tags, method: "GET" },
      {
        data: { tags: [{ id: "1234", tags: ["tag1", "tag2", "tag3"] }] },
        status: 200,
      }
    );
    const [res, err] = await promise;
    expect(err).toBeNull();

    expect(res).not.toBeNull();
    expect(res?.size).toBeGreaterThan(0);
  });

  test("PutAlbumTags good token", async () => {
    const promise = db.updateAlbumTags(jwt, [
      { id: "ABC", tags: ["A", "B", "C", "D"] },
    ]);
    mockAxios.mockResponseFor(
      { url: cfg.api_endpoints.database.post_album_tags, method: "POST" },
      {
        data: { tags: [{ id: "ABC", tags: ["A", "B", "C", "D"] }] },
        status: 200,
      }
    );
    const [res, err] = await promise;
    expect(res).not.toBeNull();
    expect(err).toBeNull();
    expect(res?.size).toBeGreaterThan(0);
    expect(res?.get("ABC")?.length).toBe(4);
  });
});
