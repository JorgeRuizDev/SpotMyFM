import { Artist } from "./../models/Artist";
import _ from "lodash";
import { db, getMissingGeneric } from "./db";

/**
 * Gets all the artists stored in the DB by their respective spotify Id.
 *
 * @export
 * @param {string[]} artistIds
 * @return {*} Artist array ordered in the same order as the id array.
 */
export async function getArtistsBySpotifyId(
  artistIds: string[]
): Promise<Artist[]> {
  const artists = await db.artists
    .where("spotifyId")
    .anyOf(artistIds)
    .toArray();

  return _.sortBy(artists, (a) => artistIds?.indexOf(a.spotifyId));
}

/**
 * Persists a batch of artists in the local cache.
 * @param artists
 */
export async function addArtists(artists: Artist[]) {
  try {
    await db.artists.bulkPut(artists);
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Gets all the artists stored in the local cache.
 * @returns {Artist[]} An array of artists.
 */
export async function getAllArtists(): Promise<Artist[]> {
  return await db.artists.toArray();
}

/**
 * Gets all the artists that are not stored in the local cache given an array of ids.
 * @param spotifyIds List of spotify ids.
 * @returns {}
 */
export async function getMissingArtists(
  spotifyIds: string[]
): Promise<string[]> {
  return getMissingGeneric(spotifyIds, db.artists);
}
