import SpotifyWebApi from "spotify-web-api-node";

export async function getPlaylist(api: SpotifyWebApi, id: string) {
  const limit = 50;
  let offset = 0;
  const tracks: SpotifyApi.TrackObjectFull[] = [];
  while (true) {
    const res = await api.getPlaylistTracks(id, {
      offset,
      limit,
      fields: "items",
    });
    const resTracks = res.body.items
      .filter((i) => !i.is_local)
      .map((i) => i.track);
    tracks.push(...resTracks);
    if (res.body.items.length < limit) {
      break;
    }
    offset += limit;
  }

  return tracks;
}
