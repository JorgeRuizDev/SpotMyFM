import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import filterTrack from "util/filters/filterTrack";
import SimpleTrackCard from "../../simpleCards/SimpleTrackCard";
import GenericCardView from "../GenericCardView";
import { IGenericCardViewSort } from "../GenericCardView/GenericCardView";
import Styled from "./TrackView.styles";
interface ITrackViewProps {
  tracks: Track[];
  defaultTrackSort?: string;
  isLoading?: boolean;
  isNested?: boolean;
}

function TrackView({
  tracks,
  defaultTrackSort = trackSortingOptions.DEFAULT,
  isLoading = false,
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

  const sorting: IGenericCardViewSort = {
    options: trackSortingOptions,
    isAscendant: isAscendentState,
    selected: optionState,
  };

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

  return (
    <>
      <GenericCardView
        filterInputProps={filter}
        setIsAscendant={setIsAscendentState}
        setSorting={setOptionState}
        sorting={sorting}
        toggleView={() => {}}
      >
        {filteredTracks.map((t, i) => (
          <SimpleTrackCard track={t} key={i} />
        ))}
      </GenericCardView>
    </>
  );
}

export default TrackView;
