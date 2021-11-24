import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import { trackViewSettings } from "interfaces/Track";
import React from "react";
import TrackView from "../TrackView";
import Styled from "./TrackSelectorView.styles";
import TracksToPlaylist from "./TracksToPlaylist";
interface ITrackSelectorViewProps {
  tracks: Track[];
  settings?: trackViewSettings;
}

function TrackSelectorView({ tracks, settings }: ITrackSelectorViewProps) {
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
        settings={settings}
        selectManager={{
          isSelected: contains,
          toggleSelected: toggleFromPlaylist,
          selectAll: addAll,
          unselectAll: removeAll,
          selectedCount: trackSet.size,
        }}
      />
    </>
  );
}

export default TrackSelectorView;
