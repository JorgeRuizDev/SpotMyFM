import _ from "lodash";
import { Track } from "../models/Track";
import { db, getGenericBySpotifyId, getMissingGeneric } from "./db";

/**
 * Gets all tracks given an array of Spotify Track Ids
 *
 * @export
 * @param {string[]} trackIds Spotify Track Ids
 * @return {*} Tracks in the same order as the TrackIds
 */
export async function getTracksBySpotifyId(
  trackIds: string[]
): Promise<Track[]> {
  return await getGenericBySpotifyId(trackIds, db.tracks);
}

/**
 * Gets the spotify ids that are not stored in the db.
 * @param {string[]} spotifyIds List of ids to check.
 * @returns { Promise<string[]>} a list of strings
 */
export async function getMissingTracks(
  spotifyIds: string[]
): Promise<string[]> {
  return await getMissingGeneric(spotifyIds, db.tracks);
}

/**
 * Persists a batch of tracks in the cache.
 * @param {Track[]} tracks Array of Tracks.
 */
export async function addTracks(tracks: Track[]) {
  try {
    await db.tracks.bulkPut(tracks);
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Returns every cached track
 * @returns
 */
export async function getAllTracks(): Promise<Track[]> {
  return await db.tracks.toArray();
}

/**
 * Returns the tracks that contain a saved date
 * @returns
 */
export async function getSavedTracks(): Promise<Track[]> {
  return await db.tracks.where("savedAt").belowOrEqual(new Date()).toArray();
}

/**
 * Joins a selected number of tracks and saves them in the DB.
 *
 * @export
 * @param {Track[]} tracks
 * @return {*} Joined Track Array.
 */
export async function joinTracks(tracks: Track[], persist = true) {
  // Join the tracks:

  await Promise.all(
    tracks.map(async (track) => {
      [track.album, track.artists] = await Promise.all([
        db.albums.where("spotifyId").equals(track.spotifyAlbumId).first(),
        db.artists.where("spotifyId").anyOf(track.spotifyArtistsIds).toArray(),
      ]);
    })
  );

  // Save them
  try {
    persist && (await db.tracks.bulkPut(tracks));
  } catch (e) {
    console.warn(e);
  }

  return tracks;
}

/**
 * Joins a selected number of cached tracks by ID.
 *
 * @export
 * @param {string[]} trackIds
 * @return {*}
 */
export async function joinTracksBySpotifyId(
  trackIds: string[],
  persist = true
) {
  const tracks = await getTracksBySpotifyId(trackIds);
  return joinTracks(tracks, persist);
}
/**
 * Returns the number of total tracks stored in the DB.
 *
 * @export
 * @return {*}
 */
export async function getNumberOfTracks() {
  return (await db.tracks.toArray()).length;
}
