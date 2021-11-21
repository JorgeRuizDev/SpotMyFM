import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useState } from "react";

interface IReturn {
  trackSet: Map<string, Track>;
  toggleFromPlaylist(track: Track): void;
  contains(track: Track): boolean;
  addAll(tracks: Track[]): void;
  removeAll(): void;
}

function useTrackToPlaylistSelector(): IReturn {
  const [trackSet, setTrackSet] = useState<Map<string, Track>>(new Map());

  function addToPlaylist(track: Track) {
    trackSet.set(track.spotifyId, track);
    setTrackSet(new Map(trackSet));
  }
  function removeFromPlaylist(track: Track) {
    if (trackSet.has(track.spotifyId)) {
      trackSet.delete(track.spotifyId);
      setTrackSet(new Map(trackSet));
    }
  }

  function toggleFromPlaylist(track: Track) {
    if (trackSet.has(track.spotifyId)) {
      removeFromPlaylist(track);
    } else {
      addToPlaylist(track);
    }
  }

  const contains = (track: Track) => trackSet.has(track.spotifyId);

  const removeAll = () => setTrackSet(new Map());

  function addAll(tracks: Track[]) {
    for (let t of tracks) {
      trackSet.set(t.spotifyId, t);
    }
    setTrackSet(new Map(trackSet));
  }

  return { trackSet, toggleFromPlaylist, contains, addAll, removeAll };
}

export default useTrackToPlaylistSelector;
