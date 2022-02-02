import { Album } from "data/cacheDB/dexieDB/models/Album";

export function filterArtist(album: Album, query: string): boolean {
  query = query.toUpperCase();
  return (
    album.name.toUpperCase().includes(query) ||
    album.artists?.[0].name.toUpperCase().includes(query) ||
    album.spotifyReleaseDate?.getFullYear().toString().includes(query) ||
    false
  );
}
