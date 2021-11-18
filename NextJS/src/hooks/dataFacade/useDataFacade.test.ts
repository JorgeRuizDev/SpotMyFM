import { renderHook } from "@testing-library/react-hooks";
import { useClientsStore } from "store/useClients";
import axios from "axios";
import { envtest } from "env";
import { getOauth } from "util/spotify/oauthFrontend";
import { useDataFacade } from "./useDataFacade";
import { isAssetError } from "next/dist/client/route-loader";
export default describe("data facade hook test", () => {
  const { result } = renderHook(() => useDataFacade());
  const { result: rClient } = renderHook(() => useClientsStore());
  const spotifyApi = rClient.current.spotifyApi;
  const cache = rClient.current.cacheClient;
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

  beforeEach(async () => {
    await cache.resetDB();
  });

  test("getTracks()", async () => {
    try {
      expect((await cache.getAllTracks()).length).toBe(0);
      const tracks = await spotifyApi.getMyTopTracks({ limit: 5 });
      const cached = await result.current.getTracks(tracks.items);

      expect(cached.length).toBe(5);
      expect((await cache.getAllTracks()).length).toBe(5);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  test("getTracks() - Test if fetches from cache", async () => {
    try {
      expect((await cache.getAllTracks()).length).toBe(0);
      const tracks = await spotifyApi.getMyTopTracks({ limit: 5 });
      let start = performance.now();
      const cached = await result.current.getTracks(tracks.items);
      let end = performance.now();

      const nonCached = end - start;

      expect(cached.length).toBe(5);
      start = performance.now();
      end = performance.now();
      expect((await cache.getAllTracks()).length).toBe(5);

      const cachedT = end - start;

      expect(cachedT).toBeLessThanOrEqual(nonCached * 0.7);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  test("getTracksById()", async () => {
    try {
      expect((await cache.getAllTracks()).length).toBe(0);
      const tracks = await spotifyApi.getMyTopTracks({ limit: 5 });
      const cached = await result.current.getTracksByIds(
        tracks.items.map((t) => t.id)
      );

      expect(cached.length).toBe(5);
      expect((await cache.getAllTracks()).length).toBe(5);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  test("getArtists()", async () => {
    try {
      expect((await cache.getAllArtists()).length).toBe(0);
      const artists = await spotifyApi.getMyTopArtists({ limit: 5 });
      const cached = await result.current.getArtists(artists.items);

      expect(cached.length).toBe(5);
      expect((await cache.getAllArtists()).length).toBe(5);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  test("getArtistsById()", async () => {
    try {
      expect((await cache.getAllArtists()).length).toBe(0);
      const artists = await spotifyApi.getMyTopArtists({ limit: 5 });
      const cached = await result.current.getArtistsById(
        artists.items.map((a) => a.id)
      );

      expect(cached.length).toBe(5);
      expect((await cache.getAllArtists()).length).toBe(5);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  test("getAlbumsById()", async () => {
    try {
      expect((await cache.getAllAlbums()).length).toBe(0);
      const artists = await spotifyApi.getMySavedAlbums({ limit: 5 });
      const cached = await result.current.getAlbumsById(
        artists.items.map((a) => a.album.id)
      );

      expect(cached.length).toBe(5);
      expect((await cache.getAllAlbums()).length).toBe(5);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });

  test("getAlbums()", async () => {
    try {
      expect((await cache.getAllAlbums()).length).toBe(0);
      const artists = await spotifyApi.getMySavedAlbums({ limit: 5 });
      const cached = await result.current.getAlbums(
        artists.items.map((a) => a.album)
      );

      expect(cached.length).toBe(5);
      expect((await cache.getAllAlbums()).length).toBe(5);
    } catch (e) {
      console.log(e);
      throw e;
    }
  });
});
