import { Artist } from "data/cacheDB/dexieDB/models/Artist";

export function filterArtist(artist: Artist, query: string): boolean {
  query = query.toUpperCase();
  return (
    artist.name.toUpperCase().includes(query) ||
    !!artist.spotifyGenres?.find((g) => g.includes(query)) ||
    false
  );
}
