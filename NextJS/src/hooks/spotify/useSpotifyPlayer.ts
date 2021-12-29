import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { RestError } from "interfaces/RestClient";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useIdle } from "react-use";
import { useClientsStore } from "store/useClients";
import create from "zustand";

interface ISpotifyPlayerStore {
  nowPlaying?: Track;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setPlayingTrack: (t: Track) => void;
  currentPlayer?: SpotifyApi.UserDevice;
  abvPlayers: SpotifyApi.UserDevice[];
  setPlayer: (dev: SpotifyApi.UserDevice) => void;
  setAbvPlayers: (devices: SpotifyApi.UserDevice[]) => void;
}

const useSpotifyPlayerStore = create<ISpotifyPlayerStore>((set, get) => {
  const initial = {
    nowPlaying: undefined,
    currentPlayer: undefined,
    isPlaying: false,
    abvPlayers: [],
  };

  const setPlayingTrack = (t: Track) => {
    set(() => ({ nowPlaying: t }));
  };
  const setPlayer = (dev: SpotifyApi.UserDevice) => {
    set(() => ({ currentPlayer: dev }));
  };

  const setAbvPlayers = (devices: SpotifyApi.UserDevice[]) => {
    set(() => ({ abvPlayers: devices }));
  };

  const setPaused = () => {
    set(() => ({ isPlaying: true }));
  };
  const setIsPlaying = (isPlaying: boolean) => {
    set(() => ({ isPlaying: !isPlaying }));
  };

  const setResumed = () => {
    set(() => ({ isPlaying: false }));
  };

  return {
    ...initial,
    setPlayingTrack,
    setAbvPlayers,
    setPlayer,
    setPaused,
    setResumed,
    setIsPlaying,
  };
});

/**
 * A helper hook that manages the spotify api player controls.
 * @returns
 */
export default function useSpotifyPlayer() {
  const isPremium = useClientsStore((s) => s.user.isPremium);
  const api = useClientsStore((s) => s.spotifyApi);
  const { getTracksByIds } = useDataFacade();

  const {
    nowPlaying,
    setPlayingTrack,
    setPlayer,
    isPlaying,
    setIsPlaying,
    abvPlayers,
    currentPlayer,
    setAbvPlayers,
  } = useSpotifyPlayerStore();

  const isIdle = useIdle(10e3);

  const refreshPlaying = useCallback(async (): Promise<void> => {
    const res = await api.getMyCurrentPlayingTrack();
    setPlayer(res.device);
    setIsPlaying(res.is_playing);

    // if the track has changed: Update it
    if (res.item && res.item.id !== nowPlaying?.spotifyId) {
      setPlayingTrack((await getTracksByIds([res.item?.id || ""]))[0]);
    }
  }, [
    api,
    getTracksByIds,
    nowPlaying?.spotifyId,
    setIsPlaying,
    setPlayer,
    setPlayingTrack,
  ]);

  const refreshPlayers = useCallback(async (): Promise<void> => {
    const res = await api.getMyDevices();
    setAbvPlayers(res.devices);
  }, [api, setAbvPlayers]);



  // Refresh the playing status every 5 seconds
  useEffect(() => {
    refreshPlaying();
    const interval = setInterval(() => {
      !isIdle && refreshPlaying();

    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [isIdle, refreshPlaying]);

  // On Load: Get the initial information
  useEffect(() => {
    refreshPlayers();
  }, [refreshPlayers]);

  /**
   * Plays a given track
   * [Only Premium Users]
   * @param track Track object
   */
  const playTrack = useCallback(
    async (track: Track): Promise<void> => {
      if (!isPremium) {
        return toastNoPremium();
      }

      try {
        const album = await api.getAlbumTracks(track.album?.spotifyId || "");
        await api.setShuffle(false);
        await api.play({
          uris: [track.spotifyUri, ...album.items.map((t) => t.uri)], //context_uri: track.spotifyUri,
        });
        toast.info(
          `🎵 Now Playing "${track.name}" by "${track.artists[0]?.name}".`
        );
      } catch (e) {
        const parsed = api.parse(e);
        toastError(parsed);
      }

      await refreshPlaying();
    },
    [api, isPremium, refreshPlaying]
  );

  /**
   * Plays a given album
   * [Only Premium Users]
   * @param album Album object
   */
  const playAlbum = useCallback(
    async (album: Album): Promise<void> => {
      if (!isPremium) {
        return toastNoPremium();
      }

      try {
        await api.setShuffle(false);
        api.play({
          context_uri: album.spotifyUri,
        });
        toast.info(
          `🎵 Now Playing "${album.name}" by "${album.artists[0]?.name}".`
        );
      } catch (e) {
        const parsed = api.parse(e);
        toastError(parsed);
      }
      refreshPlaying();
    },
    [api, isPremium, refreshPlaying]
  );

  /**
   * Pauses the playback
   * [Only Premium Users]
   * @returns
   */
  const pause = useCallback(async (): Promise<void> => {
    try {
      await api.pause();
      setIsPlaying(false);
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  }, [api, setIsPlaying]);

  /**
   * Resumes the playback
   * [Only Premium Users]
   * @returns
   */
  const resume = useCallback(async (): Promise<void> => {
    try {
      await api.play();
      setIsPlaying(true);
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
  }, [api, setIsPlaying]);

  /**
   * Skips to the next track
   * [Only Premium Users]
   * @returns
   */
  const next = useCallback(async (): Promise<void> => {
    try {
      await api.skipToNext();
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
    refreshPlaying();
  }, [api, refreshPlaying]);

  /**
   * Skips to the previous track
   * [Only Premium Users]
   * @returns
   */
  const previous = useCallback(async (): Promise<void> => {
    try {
      await api.skipToPrevious();
    } catch (e) {
      const parsed = api.parse(e);
      toastError(parsed);
    }
    refreshPlaying();
  }, [api, refreshPlaying]);

  /**
   * Adds a new track to the playback queue
   * @param track Track Object
   */
  const enqueue = useCallback(
    (track: Track) => {
      if (!isPremium) {
        toastNoPremium();
        return;
      }

      try {
        api.queue(track.spotifyUri);
        toast.info(`${track.name} was added to the queue.`);
      } catch (e) {
        const parsed = api.parse(e);
        toastError(parsed);
      }
    },
    [api, isPremium]
  );

  return {
    pause,
    resume,
    enqueue,
    playAlbum,
    playTrack,
    next,
    previous,
    nowPlaying,
    isPlaying,
    refreshPlaying,
    currentPlayer,
    abvPlayers,
    refreshPlayers,
  };
}

function toastNoPremium(): void {
  toast.info("This action is locked behind Spotify Premium");
}

function toastError(e: RestError): void {
  toast.error(`[Player] ${e?.status}: ${e?.message}`);
}
