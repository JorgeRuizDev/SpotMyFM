import { Track } from "data/cacheDB/dexieDB/models/Track";

/**
 * Filter function that tells if a string is in:
 * - Track Name
 * - ALbum Name
 * - Any artist name
 * - release date
 * @param track to filter
 * @param query to find inside a track
 * @returns true if the query is in any of the Track attributes
 */
export default function filterTrack(track: Track, query: string): boolean {
  return (
    track.name.toUpperCase().includes(query) ||
    track.album?.name.toUpperCase().includes(query) ||
    track?.artists
      ?.map((a) => a.name.toUpperCase().includes(query))
      .includes(true) ||
    track.album?.spotifyReleaseDate
      ?.getFullYear()
      .toString()
      .includes(query) ||
    false
  );
}
