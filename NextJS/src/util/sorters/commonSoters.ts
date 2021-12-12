import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";

function sortByName<E extends { name: string }>(a?: E, b?: E) {
  return a?.name.localeCompare(b?.name || "") || 0;
}

function sortByPopularity(
  a: { spotifyPopularity?: number },
  b: { spotifyPopularity?: number }
) {
  return (a?.spotifyPopularity || 0) - (b?.spotifyPopularity || 0);
}

function sortByArtistPop(a: Track | Album, b: Track | Album) {
  return sortByPopularity(b.artists?.[0], a.artists?.[0]);
}

function sortByArtistName(a: Track | Album, b: Track | Album) {
  return sortByName(a.artists?.[0], b.artists?.[0]);
}

export { sortByArtistName, sortByName, sortByArtistPop, sortByPopularity };
