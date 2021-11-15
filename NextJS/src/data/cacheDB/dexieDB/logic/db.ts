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
  spotifyIds: String[],
  table: Table<SpotifyBaseObject, number>
) {
  const ids = new Set(spotifyIds);
  const items = await table.toArray();

  for (const i of items) {
    if (ids.has(i.spotifyId)) {
      ids.delete(i.spotifyId);
    }
  }

  return Array.from(ids.values());
}

export function resetDatabase() {
  return db.transaction("rw", db.tracks, db.albums, db.artists, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}
