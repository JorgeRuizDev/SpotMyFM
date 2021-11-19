import { Track } from "data/cacheDB/dexieDB/models/Track";
import { sortByReleaseDate } from "./albumSoters";
import { sortByName } from "./commonSoters";

function sortByTrackLength(a: Track, b: Track) {
  return a.spotifyDurationMS - b.spotifyDurationMS;
}

function sortTrackByAlbumName(a: Track, b: Track) {
  // Sort by album name + Track Name
  return sortByName(a.album, b.album);
}

function sortByAlbumReleaseDate(a: Track, b: Track) {
  return sortByReleaseDate(a.album, b.album);
}

export { sortByAlbumReleaseDate, sortByTrackLength, sortTrackByAlbumName };
