import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import filterTrack from "util/filters/filterTrack";
import Styled from "./TrackView.styles";
interface ITrackViewProps {
  tracks: Track[];
  defaultTrackSort?: trackSortingOptions;
  isNested?: boolean;
}

function TrackView({
  tracks,
  defaultTrackSort = trackSortingOptions.DEFAULT,
  isNested = false,
}: ITrackViewProps) {
  const [mute, setMute] = useState(false);
  const [hover, setHover] = useState(!isMobile);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  // Sort Item:
  const {
    sortedTracks,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    sortOptions,
  } = useTrackSorter(tracks, defaultTrackSort);

  useEffect(() => {
    setFilteredTracks(sortedTracks);
  }, [sortedTracks]);

  // Button Controls:
  /*TODO: 
  const {
    trackSet,
    toggleFromPlaylist,
    contains,
    addAll,
    removeAll,
  } = useTrackToPlaylistSelector();*/

  const filter: IFilterInputProps<Track> = {
    array: sortedTracks,
    filterFunction: filterTrack,
    setFilteredArray: setFilteredTracks,
  };

  function toggleMute() {
    setMute(!mute);
  }

  function toggleHover() {
    setHover(!hover);
  }
  return <></>;
}

export default TrackView;
