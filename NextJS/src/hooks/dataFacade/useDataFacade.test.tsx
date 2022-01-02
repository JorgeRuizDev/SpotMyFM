import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { envtest } from "env";
import { ReactNode } from "react";
import { ReusableProvider } from "reusable";
import { useClientsStore } from "store/useClients";
import { getOauth } from "util/spotify/oauthFrontend";
import { useDataFacade } from "./useDataFacade";
export default describe("data facade hook test", () => {
  const wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => (
    <ReusableProvider>{children}</ReusableProvider>
  );

  const { result } = renderHook(() => useDataFacade(), { wrapper });
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
      const spotifyTracks = await spotifyApi.getMyTopTracks({
        limit: 5,
        time_range: "long_term",
      });
      const tracks = await result.current.getTracks(spotifyTracks.items);
      const cached = await cache.getAllTracks();
      expect(tracks.length).toBe(5);
      expect(cached.length).toBe(5);
      expect(tracks[0].album).not.toBe(null);
      expect(tracks[0].artists.length).toBeGreaterThan(0);
      expect(cached[0].album?.name).not.toBe(null);

      expect(cached[0].artists.length).toBeGreaterThan(0);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("getTracks() - Test if fetches from cache", async () => {
    try {
      expect((await cache.getAllTracks()).length).toBe(0);
      const tracks = await spotifyApi.getMyTopTracks({
        limit: 5,
        time_range: "long_term",
      });
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
      console.error(e);
      throw e;
    }
  });

  test("getSavedTracks() - Tests if it caches saved tracks object", async () => {
    try {
      expect((await cache.getAllTracks()).length).toBe(0);
      const spotifyTracks = await spotifyApi.getMySavedTracks({
        limit: 5,
        time_range: "long_term",
      });
      const tracks = await result.current.getSavedTracks(spotifyTracks.items);
      const cached = await cache.getAllTracks();
      expect(tracks.length).toBe(5);
      expect(cached.length).toBe(5);
      expect(tracks[0].album).not.toBe(null);
      expect(tracks[0].artists.length).toBeGreaterThan(0);
      expect(cached[0].album?.name).not.toBe(null);

      expect(cached[0].artists.length).toBeGreaterThan(0);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("getTracksById()", async () => {
    try {
      expect((await cache.getAllTracks()).length).toBe(0);
      const spotifyTracks = await spotifyApi.getMyTopTracks({ limit: 5 });
      const tracks = await result.current.getTracksByIds(
        spotifyTracks.items.map((t) => t.id)
      );
      const cached = await cache.getAllTracks();
      expect(tracks.length).toBe(5);
      expect(cached.length).toBe(5);
      expect(tracks[0].album).not.toBe(null);
      expect(tracks[0].artists.length).toBeGreaterThan(0);
      expect(cached[0].album).not.toBe(null);
      expect(cached[0].artists.length).toBeGreaterThan(0);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("getArtists()", async () => {
    try {
      expect((await cache.getAllArtists()).length).toBe(0);
      const artists = await spotifyApi.getMyTopArtists({
        limit: 5,
        time_range: "long_term",
      });
      const cached = await result.current.getArtists(artists.items);

      expect(cached.length).toBe(5);
      expect((await cache.getAllArtists()).length).toBe(5);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("getArtistsById()", async () => {
    try {
      expect((await cache.getAllArtists()).length).toBe(0);
      const artists = await spotifyApi.getMyTopArtists({
        limit: 5,
        time_range: "long_term",
      });
      const cached = await result.current.getArtistsById(
        artists.items.map((a) => a.id)
      );

      expect(cached.length).toBe(5);
      expect((await cache.getAllArtists()).length).toBe(5);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("getAlbumsById()", async () => {
    try {
      expect((await cache.getAllAlbums()).length).toBe(0);
      const spotifyAlbums = await spotifyApi.getMySavedAlbums({
        limit: 5,
      });
      const albums = await result.current.getAlbumsById(
        spotifyAlbums.items.map((a) => a.album.id)
      );
      const cached = await cache.getAllAlbums();
      expect(albums.length).toBe(5);
      expect(cached.length).toBe(5);
      expect(albums[0].artists.length).toBeGreaterThan(0);
      expect(cached[0].artists.length).toBeGreaterThan(0);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });

  test("getAlbums()", async () => {
    try {
      expect((await cache.getAllAlbums()).length).toBe(0);
      const spotifyArtists = await spotifyApi.getMySavedAlbums({ limit: 5 });
      const albums = await result.current.getAlbums(
        spotifyArtists.items.map((a) => a.album)
      );
      const cached = await cache.getAllAlbums();
      expect(albums.length).toBe(5);
      expect(cached.length).toBe(5);
      expect(albums[0].artists.length).toBeGreaterThan(0);
      expect(cached[0].artists.length).toBeGreaterThan(0);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
});
