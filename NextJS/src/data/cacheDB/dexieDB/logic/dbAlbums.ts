import _ from "lodash";
import { Album } from "../models/Album";
import { db } from "./db";

/**
 * Gets all tracks given an array of Spotify Album Ids
 *
 * @export
 * @param {string[]} albumIds Spotify Album Ids
 * @return {*} Albums in the same order as the TrackIds
 */
export async function getAlbumsBySpotifyId(albumIds: string[]) {
  const albums = await db.albums
    .where("spotifyId")
    .anyOf(albumIds)
    .toArray();

  return _.sortBy(albums, (t) => albumIds?.indexOf(t.spotifyId));
}

/**
 * Joins an string of albums with their references and returns
 * the joined albums.
 *
 * @export
 * @param {Album[]} albums
 * @return {*}
 */
export async function joinAlbums(albums: Album[]) {
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

  await db.albums.bulkPut(albums);
  return albums;
}
