import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { selectManager, trackViewSettings } from "interfaces/Track";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import filterTrack from "util/filters/filterTrack";
import {
  ListTrackCard,
  ListTrackCardHeader,
} from "../../listCards/ListTrackCard";
import SimpleTrackCard from "../../simpleCards/SimpleTrackCard";
import GenericCardView from "../GenericCardView";
import {
  IGenericCardViewSortProps,
  ViewTypeOption,
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
  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    isMobile ? "LIST" : "GRID"
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

  const sorting: IGenericCardViewSortProps = {
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
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <ListTrackCardHeader /> }
        }
        isLoading={settings.isLoading}
        cardSelector={{
          maxSel: 1,
          minSel: 0,
          selectedRingStyles: {},
          setSelected: (s) => {
            console.log(s);
          },
        }}
      >
        {currentView === "GRID"
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
          : filteredTracks.map((t, i) => (
              <ListTrackCard
                track={t}
                pos={i + 1}
                key={i}
                inPlaylist={selectManager?.isSelected(t)}
                toggleFromPlaylist={() => selectManager?.toggleSelected(t)}
              />
            ))}
      </GenericCardView>
    </>
  );
}

export default TrackView;
