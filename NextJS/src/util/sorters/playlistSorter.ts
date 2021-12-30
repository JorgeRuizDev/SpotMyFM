import { sortByName } from "./commonSoters";

function sortByPlaylistTrackCount(
  a: SpotifyApi.PlaylistObjectSimplified,
  b: SpotifyApi.PlaylistObjectSimplified
) {
  return a.tracks.total - b.tracks.total;
}

/**
 * Sorts a Playlist by the Owner Name
 * @param a PlaylistObjectSimplified
 * @param b PlaylistObjectSimplified
 * @returns number
 */
function sortByPlaylistOwner(
  a: SpotifyApi.PlaylistObjectSimplified,
  b: SpotifyApi.PlaylistObjectSimplified
) {
  return (
    (a.owner?.display_name || "").localeCompare(b.owner.display_name || "") || 0
  );
}

export { sortByPlaylistOwner, sortByPlaylistTrackCount };
