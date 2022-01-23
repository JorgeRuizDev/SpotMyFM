import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useEffect, useState } from "react";

interface IReturn {
  trackSet: Map<string, Track>;
  toggleFromPlaylist(track: Track): void;
  contains(track: Track): boolean;
  addAll(tracks: Track[]): void;
  removeAll(): void;
}

function useTrackToPlaylistSelector(): IReturn {
  const [trackSet, setTrackSet] = useState<Map<string, Track>>(new Map());

  const addToPlaylist = useCallback((track: Track) => {
    setTrackSet((map) => new Map(map.set(track.spotifyId, track)));
  }, []);

  const removeFromPlaylist = useCallback((track: Track) => {
    setTrackSet((trackSet) => {
      if (trackSet.has(track.spotifyId)) {
        trackSet.delete(track.spotifyId);
        setTrackSet(new Map(trackSet));
        return new Map(trackSet);
      }
      return trackSet;
    });
  }, []);

  const toggleFromPlaylist = useCallback(
    (track: Track) => {
      setTrackSet((trackSet) => {
        if (trackSet.has(track.spotifyId)) {
          removeFromPlaylist(track);
        } else {
          addToPlaylist(track);
        }
        return trackSet;
      });
    },
    [addToPlaylist, removeFromPlaylist]
  );

  const contains = useCallback(
    (track: Track) => trackSet.has(track.spotifyId),
    [trackSet]
  );

  const removeAll = useCallback(() => setTrackSet(new Map()), []);

  function addAll(tracks: Track[]) {
    for (let t of tracks) {
      trackSet.set(t.spotifyId, t);
    }
    setTrackSet(new Map(trackSet));
  }

  return { trackSet, toggleFromPlaylist, contains, addAll, removeAll };
}

export default useTrackToPlaylistSelector;
