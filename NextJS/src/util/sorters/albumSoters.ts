import { Album } from "data/cacheDB/dexieDB/models/Album";

function sortByReleaseDate(a?: Album, b?: Album) {
  return (
    (a?.spotifyReleaseDate?.getTime() || 0) -
    (b?.spotifyReleaseDate?.getTime() || 0)
  );
}

function sortByAlbumPopularity(a: Album, b: Album) {
  return (a?.spotifyPopularity || 0) - (b?.spotifyPopularity || 0);
}

export { sortByAlbumPopularity, sortByReleaseDate };
