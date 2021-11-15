import Dexie, { Table } from "dexie";
import _ from "lodash";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import SpotifyBaseObject from "../models/SpotifyObject";
import { Track } from "../models/Track";

export class DexieCache extends Dexie {
  albums!: Table<Album, number>;
  tracks!: Table<Track, number>;
  artists!: Table<Artist, number>;

  constructor() {
    super("SpotifyLibraryCache");
    this.version(2).stores({
      albums: "++id, &spotifyId",
      tracks: "++id, &spotifyId",
      artists: "++id, &spotifyId",
    });
  }
}
export const db = new DexieCache();

export function dropDatabase() {
  return db.delete();
}

export async function getMissingGeneric(
  spotifyIds: string[],
  table: Table<SpotifyBaseObject, number>
): Promise<string[]> {
  const items = await table
    .where("spotifyId")
    .noneOf(spotifyIds)
    .toArray();

  return items.map((i) => i.spotifyId);
}

/**
 * Gets all the items that exist in an specific table given the spotify ids.
 *
 * @export
 * @param {string[]} spotifyIds Spotify Album Ids
 * @param {Table} table A cache table
 * @return {*} Albums in the same order as the TrackIds
 */
export async function getGenericBySpotifyId<E extends SpotifyBaseObject>(
  spotifyIds: string[],
  table: Table<E, number>
): Promise<E[]> {
  const items = await table
    .where("spotifyId")
    .anyOf(spotifyIds)
    .toArray();

  return _.sortBy(items, (t) => spotifyIds?.indexOf(t.spotifyId));
}

export function resetDatabase() {
  return db.transaction("rw", db.tracks, db.albums, db.artists, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}
