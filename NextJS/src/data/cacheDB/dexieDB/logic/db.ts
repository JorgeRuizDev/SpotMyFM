import Dexie, { Table } from "dexie";
import _ from "lodash";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
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

export function resetDatabase() {
  return db.transaction("rw", db.tracks, db.albums, db.artists, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}
