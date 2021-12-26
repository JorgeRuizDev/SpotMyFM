import { useClientsStore } from "store/useClients";
import { SpotifyClient as spotifyStatic } from "restClients/spotify/spotifyClient";
import _ from "lodash";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import asyncPool from "tiny-async-pool";

export function useDataFacade() {
  const { cacheClient: cache, spotifyApi, lastfmApi } = useClientsStore();
  const [numberCaching, setNumberCaching] = useState(0);
  const [trackStatus, setTrackStatus] = useState("");

  /**
   * Returns and caches a given array of artists.
   * @param artists: SpotifyArtist object.
   * @returns An Artist list.
   */
  const getArtists = useCallback(
    async (artists: SpotifyApi.ArtistObjectFull[]) => {
      setNumberCaching((s) => s + 1);
      const missingIds = await cache.getMissingArtists(
        artists.map((a) => a.id)
      );
      const parsedArtists = spotifyStatic.spotifyArtists2Artists(artists);
      const missing = getMissingObject(parsedArtists, missingIds);
      await cache.addArtists(missing);
      setNumberCaching((s) => s - 1);
      return parsedArtists;
    },
    [cache]
  );

  /**
   * Returns and caches a given array of artists ids.
   * @param spotifyIds
   * @returns An Artist list.
   */
  const getArtistsById = useCallback(
    async (spotifyIds: string[]) => {
      setNumberCaching((s) => s + 1);
      const missingArtists = await cache.getMissingArtists(spotifyIds);
      const missingArtistsObjects = await spotifyApi.getFullArtists(
        missingArtists
      );
      const parsedArtists = spotifyStatic.spotifyArtists2Artists(
        missingArtistsObjects
      );
      await cache.addArtists(parsedArtists);
      setNumberCaching((s) => s - 1);
      return await cache.getArtistsBySpotifyId(spotifyIds);
    },
    [cache, spotifyApi]
  );

  const addTags = useCallback(
    async (albums: Album[]) => {
      const tagged: Album[] = [];
      await asyncPool(4, albums, async (album) => {
        const [res, err] = await lastfmApi.getAlbumTags(
          album.artists[0]?.name,
          album.name
        );

        if (err || !res) {
          toast.error(`LASTFM TAG ${err?.status}: ${err?.message}`);
          tagged.push(album);
        } else {
          album.lastfmTagsFull = res;
          album.lastfmTagsNames = res.map((t) => t.name);
          tagged.push(album);
        }
      });

      return tagged;
    },
    [lastfmApi]
  );

  /**
   * Retrieves from the local cache or fetches a list of albums
   * @param spotifyIds: An array of spotify albums ids
   * @returns Album[]
   */
  const getAlbumsById = useCallback(
    async (spotifyIds: string[]) => {
      setNumberCaching((s) => s + 1);
      const missingIds = await cache.getMissingAlbums(spotifyIds);
      const missingObjects = await spotifyApi.getFullAlbums(missingIds);
      console.log(missingObjects)
      const parsedMissing = spotifyStatic.spotifyAlbums2Albums(missingObjects);
      await getArtistsById(parsedMissing.flatMap((a) => a.spotifyArtistsIds));
      const joined = await cache.joinAlbums(parsedMissing, false);
      const tagged = await addTags(joined);
      await cache.addAlbums(tagged);
      setNumberCaching((s) => s - 1);
      return await cache.getAlbumsBySpotifyId(spotifyIds);
    },
    [addTags, cache, getArtistsById, spotifyApi]
  );

  /**
   * Retrieves from the local cache or fetches a list of albums
   * @param albums: An array of spotify albums
   * @returns Album[]
   */
  const getAlbums = useCallback(
    async (albums: SpotifyApi.AlbumObjectFull[]) => {
      setNumberCaching((s) => s + 1);
      const missingIds = await cache.getMissingAlbums(albums.map((a) => a.id));
      const parsed = spotifyStatic.spotifyAlbums2Albums(albums);
      const missing = getMissingObject(parsed, missingIds);
      await getArtistsById(missing.flatMap((a) => a.spotifyArtistsIds));
      const joined = await cache.joinAlbums(parsed, false);
      const tagged = await addTags(joined);
      await cache.addAlbums(tagged);
      setNumberCaching((s) => s - 1);
      return tagged;
    },
    [addTags, cache, getArtistsById]
  );

  /**
   * Retrieves from the local cache or fetches a list of tracks
   * @param spotifyIds An array of track ids
   * @returns Track[]
   */
  const getTracksByIds = useCallback(
    async (spotifyIds: string[], markAsSaved: boolean = false) => {
      setNumberCaching((s) => s + 1);
      setTrackStatus("Getting Tracks");
      const missingIds = await cache.getMissingTracks(spotifyIds);
      const missingObjects = await spotifyApi.getFullTracks(missingIds);
      setTrackStatus("Parsing Tracks");
      const parsedMissing = spotifyStatic.spotifyTracks2Tracks(
        missingObjects,
        markAsSaved
      );
      setTrackStatus("Getting Albums");
      await getAlbumsById(parsedMissing.map((t) => t.spotifyAlbumId));
      setTrackStatus("Getting Artists");
      await getArtistsById(parsedMissing.flatMap((t) => t.spotifyArtistsIds));
      await cache.joinTracks(parsedMissing, true);
      setTrackStatus("");
      setNumberCaching((s) => s - 1);

      return await cache.getTracksBySpotifyId(spotifyIds);
    },
    [cache, getAlbumsById, getArtistsById, spotifyApi]
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
      setNumberCaching((s) => s + 1);
      setTrackStatus("Getting Tracks");
      const missingIds = await cache.getMissingTracks(tracks.map((t) => t.id));
      setTrackStatus("Parsing Tracks");
      const parsed = spotifyStatic.spotifyTracks2Tracks(tracks, markAsSaved);
      const missing = getMissingObject(parsed, missingIds);
      setTrackStatus("Getting Albums");
      await getAlbumsById(missing.map((t) => t.spotifyAlbumId));
      setTrackStatus("Getting Artists");
      await getArtistsById(missing.flatMap((t) => t.spotifyArtistsIds));
      await cache.joinTracks(missing);
      setNumberCaching((s) => s - 1);
      setTrackStatus("");
      return await cache.getTracksBySpotifyId(tracks.map((t) => t.id));
    },
    [cache, getAlbumsById, getArtistsById]
  );

  return {
    numberCaching,
    trackStatus,
    getTracks,
    getTracksByIds,
    getAlbums,
    getAlbumsById,
    getArtists,
    getArtistsById,
  };
}

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
