import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import filterTrack from "util/filters/filterTrack";
import {
  ListTrackCard,
  ListTrackCardHeader,
} from "../../listCards/ListTrackCard";
import SimpleTrackCard from "../../simpleCards/SimpleTrackCard";
import GenericCardView from "../GenericCardView";
import {
  IGenericCardViewSort,
  ViewType,
} from "../GenericCardView/GenericCardView";
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
}: ITrackViewProps): JSX.Element {
  const [mute, setMute] = useState(false);
  const [hover, setHover] = useState(!isMobile);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>(
    isMobile ? "list" : "card"
  );

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

  const {
    trackSet,
    toggleFromPlaylist,
    contains,
    addAll,
    removeAll,
  } = useTrackToPlaylistSelector();

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
        setView={setCurrentView}
        view={currentView}
        isLoading={isLoading}
      >
        {currentView == "card"
          ? filteredTracks.map((t, i) => (
              <SimpleTrackCard
                track={t}
                key={i}
                inPlaylist={contains(t)}
                toggleFromPlaylist={() => toggleFromPlaylist(t)}
                isMuted={mute}
                playOnHover={hover}
              />
            ))
          : [
              <ListTrackCardHeader pos key={-1} />,
              ...filteredTracks.map((t, i) => (
                <ListTrackCard
                  track={t}
                  pos={i + 1}
                  key={i}
                  inPlaylist={contains(t)}
                  toggleFromPlaylist={() => toggleFromPlaylist(t)}
                />
              )),
            ]}
      </GenericCardView>
    </>
  );
}

export default TrackView;
