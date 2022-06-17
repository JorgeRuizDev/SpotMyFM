import { useClientsStore } from "store/useClients";
import { SpotifyClient as spotifyStatic } from "restClients/spotify/spotifyClient";
import _ from "lodash";
import { Album } from "data/cacheDB/dexieDB/models/Album";

import { useCallback, useEffect, useMemo, useState } from "react";
import asyncPool from "tiny-async-pool";
import { useSessionStore } from "store/useSession";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import cookieManager from "util/cookies/loginCookieManager";
import { toast } from "react-toastify";
import { createStore } from "reusable";
import tagAlbums from "pages/api/database/albums/tagAlbums";

export type facadeStatus =
  | "default"
  | "fetchingMissTracks"
  | "gettingTracks"
  | "parsingTracks"
  | "gettingAlbums"
  | "gettingArtists"
  | "gettingAlbumTags"
  | "gettingLastTags";

export const useDataFacade = createStore(() => {
  const cache = useClientsStore((s) => s.cacheClient);
  const spotifyApi = useClientsStore((s) => s.spotifyApi);
  const lastfmApi = useClientsStore((s) => s.lastfmApi);
  const databaseApi = useClientsStore((s) => s.backendDbApi);
  const ludwigApi = useClientsStore((s) => s.ludwigApi);
  const [trackStatus, setTrackStatus] = useState<facadeStatus>("default");

  const { setAsLoading, unsetAsLoading } = useSessionStore();

  const [percentCount, setPercentCount] = useState(0);
  const [percentCountTotal, setPercentCountTotal] = useState(1);

  const incrementPercent = useCallback(() => setPercentCount((p) => p + 1), []);

  const percent = useMemo(
    () => Math.floor((percentCount / percentCountTotal) * 100),
    [percentCount, percentCountTotal]
  );

  /**
   * Returns and caches a given array of artists.
   * @param artists: SpotifyArtist object.
   * @returns An Artist list.
   */
  const getArtists = useCallback(
    async (artists: SpotifyApi.ArtistObjectFull[]) => {
      setAsLoading();
      const missingIds = await cache.getMissingArtists(
        artists.map((a) => a.id)
      );
      const parsedArtists = spotifyStatic.spotifyArtists2Artists(artists);
      const missing = getMissingObject(parsedArtists, missingIds);
      await cache.addArtists(missing);
      unsetAsLoading();
      return parsedArtists;
    },
    [cache, setAsLoading, unsetAsLoading]
  );

  /**
   * Returns and caches a given array of artists ids.
   * @param spotifyIds
   * @returns An Artist list.
   */
  const getArtistsById = useCallback(
    async (spotifyIds: string[]) => {
      setAsLoading();
      const missingArtists = await cache.getMissingArtists(spotifyIds);
      const missingArtistsObjects = await spotifyApi.getFullArtists(
        missingArtists
      );
      const parsedArtists = spotifyStatic.spotifyArtists2Artists(
        missingArtistsObjects
      );
      await cache.addArtists(parsedArtists);
      unsetAsLoading();

      return await cache.getArtistsBySpotifyId(spotifyIds);
    },
    [cache, setAsLoading, spotifyApi, unsetAsLoading]
  );

  /**
   * Adds all the saved album tags to all the user albums.
   * @param albums
   * @returns
   */
  const addAlbumTags = useCallback(
    async (albums: Album[]): Promise<Album[]> => {
      const [tags, err] = await databaseApi.getAllAlbumTags(
        cookieManager.loadJWT() || ""
      );

      const allAlbumTags = [];

      if (err || !tags) {
        toast.error("Couldn't add your tags to your albums: " + err?.message);
        return albums;
      }

      for (const album of albums) {
        const albumTags = tags.get(album.spotifyId);
        if (albumTags) {
          allAlbumTags.push(...albumTags);
          album.allAlbumTags = allAlbumTags;
          album.albumTags = albumTags;
        }
      }

      return albums;
    },
    [databaseApi]
  );

  /**
   * Fills the album object with LastFM Tags
   */
  const addLastTags = useCallback(
    async (albums: Album[]) => {
      const chunks = _.chunk(albums, 50);
      const tagged: Album[] = [];
      setPercentCount(0);
      setPercentCountTotal(chunks.length);
      setTrackStatus("gettingLastTags");

      for (albums of chunks) {
        const [res, err] = await lastfmApi.getBulkAlbumTags(
          albums,
          cookieManager.loadJWT() || ""
        );
        incrementPercent();
        if (err || !res) {
          toast.error(err?.status);
        } else {
          tagged.push(...res);
        }
      }
      return tagged;
    },
    [incrementPercent, lastfmApi]
  );

  const _getAlbums = useCallback(
    async (parsed: Album[]) => {
      const missingIds = await cache.getMissingAlbums(
        parsed.map((a) => a.spotifyId)
      );
      const missing = getMissingObject(parsed, missingIds);
      await getArtistsById(missing.flatMap((a) => a.spotifyArtistsIds));
      const joined = await cache.joinAlbums(missing, false);
      const lastTagged = await addLastTags(joined);
      return await cache.addAlbums(lastTagged);
    },
    [addLastTags, cache, getArtistsById]
  );

  /**
   * Retrieves from the local cache or fetches a list of albums
   * @param spotifyIds: An array of spotify albums ids
   * @returns Album[]
   */
  const getAlbumsById = useCallback(
    async (spotifyIds: string[], addCustomTags = true) => {
      setAsLoading();
      const missingIds = await cache.getMissingAlbums(spotifyIds);
      const missingObjects = await (
        await spotifyApi.getFullAlbums(missingIds)
      ).filter((n) => n);
      const parsedMissing = spotifyStatic.spotifyAlbums2Albums(missingObjects);
      await getArtistsById(parsedMissing.flatMap((a) => a.spotifyArtistsIds));
      const joined = await cache.joinAlbums(parsedMissing, false);
      const lastTagged = await addLastTags(joined);

      // Save the new albums
      await cache.addAlbums(lastTagged);

      const cached = await cache.getAlbumsBySpotifyId(spotifyIds);
      unsetAsLoading();
      return addCustomTags ? await addAlbumTags(cached) : cached;
    },
    [
      addAlbumTags,
      addLastTags,
      cache,
      getArtistsById,
      setAsLoading,
      spotifyApi,
      unsetAsLoading,
    ]
  );

  /**
   * Retrieves from the local cache or fetches a list of albums
   * @param albums: An array of spotify albums
   * @returns Album[]
   */
  const getAlbums = useCallback(
    async (albums: SpotifyApi.AlbumObjectFull[]) => {
      setAsLoading();
      const parsed = spotifyStatic.spotifyAlbums2Albums(albums);
      await _getAlbums(parsed);
      unsetAsLoading();

      const cached = await cache.getAlbumsBySpotifyId(
        parsed.map((p) => p.spotifyId)
      );
      return await addAlbumTags(cached);
    },
    [_getAlbums, addAlbumTags, cache, setAsLoading, unsetAsLoading]
  );

  /**
   * Retrieves from the local cache or fetches a list of saved albums
   * @param albums: An array of spotify albums
   * @returns Album[]
   */
  const getSavedAlbums = useCallback(
    async (albums: SpotifyApi.SavedAlbumObject[]) => {
      setAsLoading();
      const parsed = spotifyStatic.spotifyAlbums2Albums(
        albums.map((a) => a.album)
      );
      await _getAlbums(parsed);
      unsetAsLoading();

      const saved = await cache.getAlbumsBySpotifyId(
        parsed.map((p) => p.spotifyId)
      );

      const savedDates = new Map<string, SpotifyApi.SavedAlbumObject>();
      for (const album of albums) {
        savedDates.set(album.album.id, album);
      }

      for (const album of saved) {
        const date = new Date(savedDates.get(album.spotifyId)?.added_at || 0);
        album.savedAt = date;
      }

      const tagged = await addAlbumTags(saved);

      return tagged;
    },
    [_getAlbums, addAlbumTags, cache, setAsLoading, unsetAsLoading]
  );

  /**
   * "This function takes in an array of tracks and a promise that resolves to a map of track ids to
   * track details. It then adds the track details to the tracks array."
   *
   * The function is called like this:
   * @param {Track[]} tracks - Track[]
   * @param ludwig - Promise<[Map<string, any> | null, any]>
   */
  const addLudwigToTracks = useCallback(
    async (
      tracks: Track[],
      ludwig: Promise<[Map<string, any> | null, any]>
    ) => {
      setAsLoading();
      const [ludwig_res, ludwig_error] = await ludwig;

      if (!ludwig_error && ludwig_res) {
        for (const track of tracks) {
          const details = ludwig_res.get(track.spotifyId);

          if (details) {
            track.ludwigGenres = details.genres;
            track.ludwigMoods = details.moods;
            track.ludwigSubgenres = details.subgenres;
          }
        }
        tracks.length > 20 && toast.info("Track Analysis is ready! ");
        unsetAsLoading();
      } else {
        toast.error(ludwig_error?.message);
        unsetAsLoading();
      }
    },
    [setAsLoading, unsetAsLoading]
  );

  /**
   * Retrieves from the local cache or fetches a list of tracks
   * @param spotifyIds An array of track ids
   * @returns Track[]
   */
  const getTracksByIds = useCallback(
    async (spotifyIds: string[], markAsSaved: boolean = false) => {
      setAsLoading();
      setTrackStatus("fetchingMissTracks");
      const missingIds = await cache.getMissingTracks(spotifyIds);
      const missingObjects = await spotifyApi.getFullTracks(missingIds);

      setTrackStatus("parsingTracks");
      const parsedMissing = spotifyStatic.spotifyTracks2Tracks(
        missingObjects,
        markAsSaved
      );
      setTrackStatus("gettingAlbums");
      await getAlbumsById(
        parsedMissing.map((t) => t.spotifyAlbumId),
        false
      );
      setTrackStatus("gettingAlbums");
      await getArtistsById(parsedMissing.flatMap((t) => t.spotifyArtistsIds));

      await cache.joinTracks(parsedMissing, true);
      setTrackStatus("default");
      unsetAsLoading();

      const tracks = await cache.getTracksBySpotifyId(spotifyIds);
      const ludwig = ludwigApi.getTrackDetailsBulk(tracks, true, true);

      await addAlbumTags(tracks.flatMap((t) => (t.album ? t.album : [])));
      addLudwigToTracks(tracks, ludwig);
      return tracks;
    },
    [
      addAlbumTags,
      addLudwigToTracks,
      cache,
      getAlbumsById,
      getArtistsById,
      ludwigApi,
      setAsLoading,
      spotifyApi,
      unsetAsLoading,
    ]
  );

  /* A function that is called when a user uploads a playlist. */
  const _getTracks = useCallback(
    async (parsed: Track[]) => {
      setTrackStatus("fetchingMissTracks");
      const missingIds = await cache.getMissingTracks(
        parsed.map((t) => t.spotifyId)
      );

      const missing = getMissingObject(parsed, missingIds);

      const ludwig = ludwigApi.getTrackDetailsBulk(parsed, true, true);

      setTrackStatus("gettingAlbums");
      await getAlbumsById(
        missing.map((t) => t.spotifyAlbumId),
        false
      );
      setTrackStatus("gettingArtists");
      await getArtistsById(missing.flatMap((t) => t.spotifyArtistsIds));

      await cache.joinTracks(missing);

      setTrackStatus("default");

      const tracks = await cache.getTracksBySpotifyId(
        parsed.map((t) => t.spotifyId)
      );
      await addAlbumTags(tracks.flatMap((t) => (t.album ? t.album : [])));
      addLudwigToTracks(tracks, ludwig);
      return tracks;
    },
    [
      addAlbumTags,
      cache,
      getAlbumsById,
      getArtistsById,
      ludwigApi,
      addLudwigToTracks,
    ]
  );

  /**
   * Retrieves from the local cache or fetches a list of tracks
   * @param tracks: An array of spotify tracks
   * @returns Track[]
   */
  const getTracks = useCallback(
    async (
      tracks: SpotifyApi.TrackObjectFull[],
      markAsSaved: boolean = false
    ) => {
      setAsLoading();

      setTrackStatus("parsingTracks");
      const parsed = spotifyStatic.spotifyTracks2Tracks(
        tracks.filter((t) => t.id),
        markAsSaved
      );
      const cached = await _getTracks(parsed);
      unsetAsLoading();

      setTrackStatus("default");
      return cached;
    },
    [_getTracks, setAsLoading, unsetAsLoading]
  );

  /**
   * Retrieves from the local cache or fetches a list of tracks
   * @param tracks: An array of spotify tracks
   * @returns Track[]
   */
  const getSavedTracks = useCallback(
    async (savedTracks: SpotifyApi.SavedTrackObject[]) => {
      setAsLoading();

      const parsed = spotifyStatic.spotifySavedTracks2Tracks(
        savedTracks.filter((t) => t.track.id)
      );
      const cached = await _getTracks(parsed);
      unsetAsLoading();
      setTrackStatus("default");
      return cached;
    },
    [_getTracks, setAsLoading, unsetAsLoading]
  );

  return {
    trackStatus,
    percent,
    getTracks,
    getSavedTracks,
    getTracksByIds,
    getAlbums,
    getSavedAlbums,
    getAlbumsById,
    getArtists,
    getArtistsById,
    addAlbumTags,
  };
});

/**
 * Given a collection of spotify api items, returns the ones that are in the missing ids.
 * @param col SpotifyObject
 * @param ids: Missing ids
 * @returns
 */
function getMissingObject<E extends { spotifyId: string }>(
  col: E[],
  ids: string[]
) {
  const set = new Set(ids);
  return col.filter((a) => set.has(a.spotifyId));
}
