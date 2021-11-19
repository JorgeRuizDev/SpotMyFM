import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";

function sortByName<E extends { name: string }>(a?: E, b?: E) {
  return a?.name.localeCompare(b?.name || "") || 0;
}

function sortByArtistPop(a: Track | Album, b: Track | Album) {
  return (
    (b.artists?.[0]?.spotifyPopularity || 0) -
    (a.artists?.[0]?.spotifyPopularity || 0)
  );
}

function sortByArtistName(a: Track | Album, b: Track | Album) {
  return sortByName(a.artists?.[0], b.artists?.[0]);
}

export { sortByArtistName, sortByName, sortByArtistPop };
