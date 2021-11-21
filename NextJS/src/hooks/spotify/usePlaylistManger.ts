import _ from "lodash";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";

export function usePlaylistManager() {
  const api = useClientsStore((s) => s.spotifyApi);

  /**
   * Creates a new playlist given the following parameters
   * @param name
   * @param description
   * @param isPublic
   * @param isCollaborative
   * @returns the create playlist response
   */
  async function createPlaylist(
    name: string,
    description: string,
    isPublic: boolean,
    isCollaborative: boolean
  ): Promise<SpotifyApi.CreatePlaylistResponse | undefined> {
    const user = await api.getMe();
    try {
      return await api.createPlaylist(user.id, {
        name,
        description,
        public: isPublic,
        collaborative: isCollaborative,
      });
    } catch (e) {
      toastError("creating playlist", e);
    }
  }

  /**
   * Adds tracks to an specific playlist
   * @param playlistId
   * @param trackUris
   * @param position
   */
  async function addTracksToPlaylist(
    playlistId: string,
    trackUris: string[],
    position?: number
  ) {
    for (const uris of _.chunk(trackUris, 100)) {
      try {
        const res = await api.addTracksToPlaylist(playlistId, uris);
      } catch (e) {
        toastError("adding tracks", e);
      }
    }
  }

  /**
   * Fetches a playlist given a valid playlist ID
   * @param playlistId
   * @returns
   */
  async function getPlaylist(playlistId: string) {
    return await api.getPlaylist(playlistId);
  }

  /**
   * Flushes a playlist
   * @param playlistId
   */
  async function removeAllTracksFromPlaylist(playlistId: string) {
    const limit = 50;

    try {
      while (true) {
        const res = await api.getPlaylistTracks(playlistId, { limit });

        const del = await api.removeTracksFromPlaylist(
          playlistId,
          res.items.map((t) => t.track.uri)
        );

        if (res.next === null) break;
      }
    } catch (e) {
      toastError("removing all tracks", e);
    }
  }

  /**
   * Flushes an existing playlist but adds a set of tracks.
   * @param playlistId
   * @param trackUris
   */
  async function replacePlaylistTracksWith(
    playlistId: string,
    trackUris: string[]
  ) {
    await removeAllTracksFromPlaylist(playlistId);
    await addTracksToPlaylist(playlistId, trackUris);
  }

  return {
    removeAllTracksFromPlaylist,
    replacePlaylistTracksWith,
    getPlaylist,
    addTracksToPlaylist,
    createPlaylist,
  };

  function toastError(action: string, e: any) {
    const error = api.parse(e);
    toast.error(`Error while ${action} (${error?.status}) ${error?.message}`);
    throw e;
  }
}
