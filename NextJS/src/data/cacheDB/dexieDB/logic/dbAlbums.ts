import _ from "lodash";
import { Album } from "../models/Album";
import { db, getGenericBySpotifyId, getMissingGeneric } from "./db";

/**
 * Gets all albums given an array of Spotify Album Ids
 *
 * @export
 * @param {string[]} albumIds Spotify Album Ids
 * @return {*} Albums in the same order as the TrackIds
 */
export async function getAlbumsBySpotifyId(
  albumIds: string[]
): Promise<Album[]> {
  return getGenericBySpotifyId(albumIds, db.albums);
}

/**
 * Function that retrieves every single cached album
 * @returns
 */
export async function getAllAlbums(): Promise<Album[]> {
  return await db.albums.toArray();
}

/**
 * Stores multiple albums in the Database.
 * @param albums Album Object list.
 */
export async function addAlbums(albums: Album[]) {
  try {
    await db.albums.bulkPut(albums);
  } catch (e) {
    console.warn(e);
  }
}

export async function getMissingAlbums(spotifyIds: string[]) {
  return getMissingGeneric(spotifyIds, db.albums);
}

/**
 * Joins an string of albums with their references and returns
 * the joined albums.
 *
 * @export
 * @param {Album[]} albums
 * @return {*}
 */
export async function joinAlbums(
  albums: Album[],
  persist = true
): Promise<Album[]> {
  try {
    await Promise.all(
      albums.map(async (album) => {
        [album.artists] = await Promise.all([
          db.artists
            .where("spotifyId")
            .anyOf(album.spotifyArtistsIds)
            .toArray(),
        ]);
      })
    );

    persist && (await db.albums.bulkPut(albums));
  } catch (e) {
    console.warn(e);
  }

  return albums;
}
