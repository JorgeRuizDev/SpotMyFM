import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import React from "react";
import TrackView from "../TrackView";
import Styled from "./TrackSelectorView.styles";
import TracksToPlaylist from "./TracksToPlaylist";
interface ITrackSelectorViewProps {
  tracks: Track[];
}

function TrackSelectorView({ tracks }: ITrackSelectorViewProps) {
  const {
    trackSet,
    toggleFromPlaylist,
    contains,
    addAll,
    removeAll,
  } = useTrackToPlaylistSelector();

  return (
    <>
      {trackSet.size > 0 ? (
        <TracksToPlaylist
          tracks={Array.from(trackSet.values()).map((t) => t.spotifyUri)}
          unselectAll={removeAll}
        />
      ) : null}
      <TrackView
        tracks={tracks}
        selectManager={{
          isSelected: contains,
          toggleSelected: toggleFromPlaylist,
        }}
      />
    </>
  );
}

export default TrackSelectorView;
