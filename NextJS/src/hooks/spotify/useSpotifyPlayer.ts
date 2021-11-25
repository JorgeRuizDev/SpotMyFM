import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { RestError } from "interfaces/RestClient";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";

/**
 * A helper hook that manages the spotify api player controls.
 * @returns
 */
export default function useSpotifyPlayer() {
  const isPremium = useClientsStore((s) => s.user.isPremium);
  const api = useClientsStore((s) => s.spotifyApi);

  /**
   * Plays a given track
   * [Only Premium Users]
   * @param track Track object
   */
  const playTrack = (track: Track) => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.play({ uris: [track.spotifyUri] });
      toast.info(
        `🎵 Now Playing "${track.name}" by "${track.artists[0]?.name}".`
      );
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  /**
   * Plays a given album
   * [Only Premium Users]
   * @param album Album object
   */
  const playAlbum = (album: Album) => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.play({ uris: [album.spotifyUri] });
      toast.info(
        `🎵 Now Playing "${album.name}" by "${album.artists[0]?.name}".`
      );
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  /**
   * Pauses the playback
   * [Only Premium Users]
   * @returns
   */
  const pause = () => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.pause();
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  /**
   * Resumes the playback
   * [Only Premium Users]
   * @returns
   */
  const resume = () => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.play();
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  /**
   * Skips to the next track
   * [Only Premium Users]
   * @returns
   */
  const next = () => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.skipToNext();
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  /**
   * Skips to the previous track
   * [Only Premium Users]
   * @returns
   */
  const previous = () => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.skipToPrevious();
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  /**
   * Adds a new track to the playback queue
   * @param track Track Object
   */
  const enqueue = (track: Track) => {
    if (!isPremium) {
      return toastNoPremium();
    }
    try {
      api.queue(track.spotifyUri);
      toast.info(`${track.name} was added to the queue.`);
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  };

  return { pause, resume, enqueue, playAlbum, playTrack, next, previous };
}

function toastNoPremium() {
  toast.info("This action is locked behind Spotify Premium");
}

function toastError(e: RestError) {
  toast.error(`[Player] ${e?.status}: ${e?.message}`);
}
