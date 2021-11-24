/**
 * Filter function that tells if a string is in:
 * - Name
 * - Owner
 * - Description
 * @param playlist to filter
 * @param query to find inside a track
 * @returns true if the query matches any of the attributes
 */
export default function filterSpotifyPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified,
  query: string
): boolean {
  query = query.toUpperCase();
  return (
    playlist.name.toUpperCase().includes(query) ||
    playlist.description?.toUpperCase().includes(query) ||
    playlist.owner.display_name?.toUpperCase()?.includes(query) ||
    false
  );
}
