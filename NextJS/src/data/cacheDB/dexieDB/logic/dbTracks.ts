import _ from "lodash";
import { Track } from "../models/Track";
import { db } from "./db";

/**
 * Gets all tracks given an array of Spotify Track Ids
 *
 * @export
 * @param {string[]} trackIds Spotify Track Ids
 * @return {*} Tracks in the same order as the TrackIds
 */
export async function getTracksBySpotifyId(trackIds: string[]) {
  const tracks = await db.tracks
    .where("spotifyId")
    .anyOf(trackIds)
    .toArray();

  return _.sortBy(tracks, (t) => trackIds?.indexOf(t.spotifyId));
}

/**
 * Joins a selected number of tracks and saves them in the DB.
 *
 * @export
 * @param {Track[]} tracks
 * @return {*} Joined Track Array.
 */
export async function joinTracks(tracks: Track[]) {
  // Join the tracks:

  await Promise.all(
    tracks.map(async (track) => {
      [track.album, track.artists] = await Promise.all([
        db.albums
          .where("spotifyId")
          .equals(track.spotifyAlbumId)
          .first(),
        db.artists
          .where("spotifyId")
          .anyOf(track.spotifyArtistsIds)
          .toArray(),
      ]);
    })
  );

  // Save them
  await db.tracks.bulkPut(tracks);
  return tracks;
}

/**
 * Joins a selected number of cached tracks by ID.
 *
 * @export
 * @param {string[]} trackIds
 * @return {*}
 */
export async function joinTracksBySpotifyId(trackIds: string[]) {
  const tracks = await getTracksBySpotifyId(trackIds);
  return joinTracks(tracks);
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
