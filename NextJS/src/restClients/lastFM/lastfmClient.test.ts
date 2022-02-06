import { LastfmClient } from "./lastfmClient";
import cfg from "config";
import env from "env";
import mockAxios from "jest-mock-axios";

export default describe("LastfmClient Test", () => {
  jest.mock("axios");
  let last = new LastfmClient(env.LASTFM_KEY);

  const artist = "The Beatles";
  const album = "Sgt. Pepper's Lonely Hearts Club Band";

  beforeAll(() => {
    last = new LastfmClient(env.LASTFM_KEY);
    mockAxios.reset();
  });

  test("Get Sgt Pepper Album Details", async () => {
    const promise = last.getAlbumDetails(artist, album);
    const params = {
      method: "album.getinfo",
      artist: artist,
      album: album,
      api_key: env.LASTFM_KEY,
      format: "json",
      lang: "en"
    };
    mockAxios.mockResponseFor(
      {
        url: cfg.api_endpoints.lastFM.base_url,
        method: "GET",
      },
      {
        data: {
          album: {
            wiki: { content: "Paul McCartney is Billy Shears" },
            listeners: 999999999999,
            playcount: 9999999999999,
            url: "https://www.last.fm/music/The+Beatles/Sgt.+Pepper%27s+Lonely+Hearts+Club+Band",
          },
        },
        status: 200,
      }
    );
    const [res, err] = await promise;
    expect(mockAxios.get).toBeCalledTimes(1);
    expect(mockAxios.get).toBeCalledWith(cfg.api_endpoints.lastFM.base_url, {
      params,
    });
    expect(err).toBeNull();
    expect(res?.lastfmListenersCount).toBeGreaterThan(800000);
    expect(res?.lastfmPlayCount).toBeGreaterThan(25000000);
    expect(res?.lastfmURL).toBe(
      "https://www.last.fm/music/The+Beatles/Sgt.+Pepper%27s+Lonely+Hearts+Club+Band"
    );
  });

  test("Get Sgt Pepper Album Tags", async () => {
    const promise = last.getAlbumTags(artist, album);
    mockAxios.mockResponseFor(
      {
        url: cfg.api_endpoints.lastFM.base_url,
        method: "GET",
      },
      {
        data: {
          toptags: {
            tag: [...Array(20).keys()].map((i) => ({
              name: "album" + i,
              url: "url" + i,
            })),
          },
        },
        status: 200,
      }
    );
    const [res, err] = await promise;
    expect(err).toBeNull();
    expect(res?.length).toBe(12);
  });
});
