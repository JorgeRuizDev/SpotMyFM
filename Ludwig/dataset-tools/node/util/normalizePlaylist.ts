import SpotifyWebApi from "spotify-web-api-node";

function isPreviewBroken(track: SpotifyApi.TrackObjectSimplified) {
  return !track.preview_url || track.preview_url.length == 0;
}

/**
 * Function that replaces two tracks in one playlist.
 * @param api Spotify API Object
 * @param playlist Playlist to work with
 * @param replace Track to replace
 * @param replacements New Track (If null, oldTrack gets deleted from the playlist)
 */
async function updatePlaylistTrack(
  api: SpotifyWebApi,
  playlist: SpotifyApi.PlaylistBaseObject,
  replace: SpotifyApi.TrackObjectSimplified[],
  replacements: SpotifyApi.TrackObjectSimplified[] | undefined | null
) {
  await api.addTracksToPlaylist(
    playlist.id,
    replacements.map((t) => t.uri)
  );

  await api.removeTracksFromPlaylist(
    playlist.id,
    replace.map((t) => ({ uri: t.uri }))
  );
}

/**
 * Find an alternative track that includes a preview
 * @param api Spotify API Object
 * @param track Spotify Track Object
 * @returns A track with a preview, null if no alternative track was found.
 */
async function findTrackWithPreview(
  api: SpotifyWebApi,
  track: SpotifyApi.TrackObjectSimplified
): Promise<SpotifyApi.TrackObjectFull> {
  let q = `${track.name.split("-")[0]}`;

  if (!q || q.length <= 1) {
    return null;
  }

  const res = await api.searchTracks(q, { limit: 50 });
  const fixed_candidates = res.body.tracks.items
    .filter(
      (t) => !isPreviewBroken(t) && t.artists[0].name == track.artists[0].name
    )
    .sort((a, b) => a.popularity - b.popularity)
    .reverse();

  if (fixed_candidates.length == 0) {
    return null;
  }
  return fixed_candidates[0];
}

export { findTrackWithPreview, isPreviewBroken, updatePlaylistTrack };
