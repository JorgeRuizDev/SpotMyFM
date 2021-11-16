import { LastfmClient } from "./lastfmClient";
import env from "env";

export default describe("LastfmClient Test", () => {
  let last = new LastfmClient(env.LASTFM_KEY);

  const artist = "The Beatles";
  const album = "Sgt. Pepper's Lonely Hearts Club Band";

  beforeAll(() => {
    last = new LastfmClient(env.LASTFM_KEY);
  });

  test("Get Sgt Pepper Album Details", async () => {
    const [res, err] = await last.getAlbumDetails(artist, album);

    expect(err).toBeNull();
    expect(res?.lastfmListenersCount).toBeGreaterThan(800000);
    expect(res?.lastfmPlayCount).toBeGreaterThan(25000000);
    expect(res?.lastfmURL).toBe(
      "https://www.last.fm/music/The+Beatles/Sgt.+Pepper%27s+Lonely+Hearts+Club+Band"
    );
  });

  test("Get Sgt Pepper Album Tags", async () => {
    const [res, err] = await last.getAlbumTags(artist, album);
    expect(err).toBeNull();
    expect(res?.length).toBe(12);
  });

  test("Axios Error", async () => {
    const [res, err] = await last.getAlbumTags("", "");
    expect(res).toBe(null);
    expect(err).not.toBe(null);
    expect(err?.status).toBe(400);
    expect(err?.message.length).not.toBe(0);
  });
});
