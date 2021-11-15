import _ from "lodash";
import { Album } from "../models/Album";
import { db, getMissingGeneric } from "./db";

/**
 * Gets all tracks given an array of Spotify Album Ids
 *
 * @export
 * @param {string[]} albumIds Spotify Album Ids
 * @return {*} Albums in the same order as the TrackIds
 */
export async function getAlbumsBySpotifyId(
  albumIds: string[]
): Promise<Album[]> {
  const albums = await db.albums
    .where("spotifyId")
    .anyOf(albumIds)
    .toArray();

  return _.sortBy(albums, (t) => albumIds?.indexOf(t.spotifyId));
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
export async function joinAlbums(albums: Album[]): Promise<Album[]> {
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
  try {
    await db.albums.bulkPut(albums);
  } catch (e) {
    console.warn(e);
  }

  return albums;
}
