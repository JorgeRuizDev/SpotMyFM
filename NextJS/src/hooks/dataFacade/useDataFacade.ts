import { useClientsStore } from "store/useClients";
import { SpotifyClient as spotifyStatic } from "restClients/spotify/spotifyClient";
import _ from "lodash";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { toast } from "react-toastify";

export function useDataFacade() {
  const { cacheClient: cache, spotifyApi, lastfmApi } = useClientsStore();

  /**
   * Retrieves from the local cache or fetches a list of tracks
   * @param spotifyIds An array of track ids
   * @returns Track[]
   */
  const getTracksByIds = async (spotifyIds: string[]) => {
    const missingIds = await cache.getMissingTracks(spotifyIds);
    const missingObjects = await spotifyApi.getFullTracks(missingIds);
    const parsedMissing = spotifyStatic.spotifyTracks2Tracks(missingObjects);
    await getAlbumsById(parsedMissing.map((t) => t.spotifyAlbumId));
    await getArtistsById(parsedMissing.flatMap((t) => t.spotifyArtistsIds));
    await cache.joinTracks(parsedMissing);
    return await cache.getTracksBySpotifyId(spotifyIds);
  };

  /**
   * Retrieves from the local cache or fetches a list of tracks
   * @param tracks: An array of spotify tracks
   * @returns Track[]
   */
  const getTracks = async (tracks: SpotifyApi.TrackObjectFull[]) => {
    const missingIds = await cache.getMissingTracks(tracks.map((t) => t.id));
    const parsed = spotifyStatic.spotifyTracks2Tracks(tracks);
    const missing = getMissingObject(parsed, missingIds);
    await getAlbumsById(missing.map((t) => t.spotifyAlbumId));
    await getArtistsById(missing.flatMap((t) => t.spotifyArtistsIds));

    return await cache.joinTracks(parsed);
  };

  /**
   * Retrieves from the local cache or fetches a list of albums
   * @param spotifyIds: An array of spotify albums ids
   * @returns Album[]
   */
  const getAlbumsById = async (spotifyIds: string[]) => {
    const missingIds = await cache.getMissingAlbums(spotifyIds);
    const missingObjects = await spotifyApi.getFullAlbums(missingIds);
    const parsedMissing = spotifyStatic.spotifyAlbums2Albums(missingObjects);
    await getArtistsById(parsedMissing.flatMap((a) => a.spotifyArtistsIds));
    const joined = await cache.joinAlbums(parsedMissing, false);
    const tagged = await addTags(joined);
    await cache.addAlbums(tagged);
    return await cache.getAlbumsBySpotifyId(spotifyIds);
  };

  /**
   * Retrieves from the local cache or fetches a list of albums
   * @param albums: An array of spotify albums
   * @returns Album[]
   */
  const getAlbums = async (albums: SpotifyApi.AlbumObjectFull[]) => {
    const missingIds = await cache.getMissingAlbums(albums.map((a) => a.id));
    const parsed = spotifyStatic.spotifyAlbums2Albums(albums);
    const missing = getMissingObject(parsed, missingIds);
    await getArtistsById(missing.flatMap((a) => a.spotifyArtistsIds));
    const joined = await cache.joinAlbums(parsed, false);
    const tagged = await addTags(joined);
    await cache.addAlbums(tagged);
    return tagged;
  };

  /**
   * Returns and caches a given array of artists.
   * @param artists: SpotifyArtist object.
   * @returns An Artist list.
   */
  const getArtists = async (artists: SpotifyApi.ArtistObjectFull[]) => {
    const missingIds = await cache.getMissingArtists(artists.map((a) => a.id));
    const parsedArtists = spotifyStatic.spotifyArtists2Artists(artists);
    const missing = getMissingObject(parsedArtists, missingIds);
    await cache.addArtists(missing);
    return parsedArtists;
  };

  /**
   * Returns and caches a given array of artists ids.
   * @param spotifyIds
   * @returns An Artist list.
   */
  const getArtistsById = async (spotifyIds: string[]) => {
    const missingArtists = await cache.getMissingArtists(spotifyIds);
    const missingArtistsObjects = await spotifyApi.getFullArtists(
      missingArtists
    );
    const parsedArtists = spotifyStatic.spotifyArtists2Artists(
      missingArtistsObjects
    );
    await cache.addArtists(parsedArtists);

    return await cache.getArtistsBySpotifyId(spotifyIds);
  };

  return {
    getTracks,
    getTracksByIds,
    getAlbums,
    getAlbumsById,
    getArtists,
    getArtistsById,
  };

  async function addTags(albums: Album[]) {
    const tagged: Album[] = [];
    for (const album of albums) {
      const [res, err] = await lastfmApi.getAlbumTags(
        album.artists[0]?.name,
        album.name
      );

      if (err || !res) {
        toast.error(`LASTFM TAG ${err?.status}: ${err?.message}`);
        tagged.push(album);
        continue;
      }

      album.lastfmTagsFull = res;
      album.lastfmTagsNames = res.map((t) => t.name);
      tagged.push(album);
    }

    return tagged;
  }
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
