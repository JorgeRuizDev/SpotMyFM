import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { selectManager, trackViewSettings } from "interfaces/Track";
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
  settings?: trackViewSettings;
  selectManager?: selectManager;
}

function TrackView({
  tracks,
  settings = {
    defaultTrackSort: trackSortingOptions.DEFAULT,
    isLoading: false,
    isNested: false,
  },
  selectManager,
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
  } = useTrackSorter(tracks, settings.defaultTrackSort);

  const sorting: IGenericCardViewSort = {
    options: trackSortingOptions,
    isAscendant: isAscendentState,
    selected: optionState,
    setIsAscendant: setIsAscendentState,
    setSorting: (s: string) => {
      setOptionState(s);
    },
  };

  useEffect(() => {
    setFilteredTracks(sortedTracks);
  }, [sortedTracks]);

  // Button Controls:

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
        sorting={sorting}
        setView={setCurrentView}
        view={currentView}
        isLoading={settings.isLoading}
      >
        {currentView == "card"
          ? filteredTracks.map((t, i) => (
              <SimpleTrackCard
                track={t}
                key={i}
                inPlaylist={selectManager?.isSelected(t)}
                toggleFromPlaylist={() => selectManager?.toggleSelected(t)}
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
                  inPlaylist={selectManager?.isSelected(t)}
                  toggleFromPlaylist={() => selectManager?.toggleSelected(t)}
                />
              )),
            ]}
      </GenericCardView>
    </>
  );
}

export default TrackView;
