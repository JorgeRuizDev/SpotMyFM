import SpotifyWebApi from "spotify-web-api-node";

function isPreviewBroken(track: SpotifyApi.TrackObjectSimplified) {
  return !track.preview_url || track.preview_url.length == 0;
}

/**
 * Function that replaces two tracks in one playlist.
 * @param api Spotify API Object
 * @param playlist Playlist to work with
 * @param oldTrack Track to replace
 * @param newTrack New Track (If null, oldTrack gets deleted from the playlist)
 */
async function updatePlaylistTrack(
  api: SpotifyWebApi,
  playlist: SpotifyApi.PlaylistBaseObject,
  oldTrack: SpotifyApi.TrackObjectSimplified,
  newTrack: SpotifyApi.TrackObjectSimplified | undefined | null
) {
  await api.removeTracksFromPlaylist(playlist.id, [oldTrack]);

  await api.addTracksToPlaylist(playlist.id, [newTrack.id]);
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
) {
  if (!isPreviewBroken(track)) {
    return track;
  }

  const res = await api.searchTracks(
    `${track.name.split("-")[0]} + ${track.artists[0].name}`
  );
  const fixed_candidates = res.body.tracks.items
    .filter(
      (t) => !isPreviewBroken(t) && t.artists[0].id == track.artists[0].id
    )
    .sort((a, b) => a.popularity - b.popularity);

  if (fixed_candidates.length == 0) {
    return null;
  }
  return fixed_candidates[0];
}

export { findTrackWithPreview, isPreviewBroken, updatePlaylistTrack };
