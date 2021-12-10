import Modal from "components/core/display/molecules/Modal";
import AdvancedSpotifyFilters from "components/core/input/organisms/AdvancedTrackFilters";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { selectManager, trackViewSettings } from "interfaces/Track";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillCursorFill } from "react-icons/bs";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { HiFilter } from "react-icons/hi";
import { MdRemove } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import Buttons from "styles/Buttons";
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
  const [advancedFilteredTracks, setAdvancedFilteredTracks] =
    useState<Track[]>(tracks);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    isMobile ? "LIST" : "GRID"
  );

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  // Sort Item:
  const {
    sortedTracks,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
  } = useTrackSorter(advancedFilteredTracks, settings.defaultTrackSort);

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
    if (!settings.isLoading && tracks.length > 0) {
      setAdvancedFilteredTracks(tracks);
    } else if (settings.isLoading) {
      setAdvancedFilteredTracks([]);
    }
  }, [settings.isLoading, tracks]);

  // Tracks to Show:
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
      <Modal
        isOpen={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        doNotUmount={true}
      >
        <AdvancedSpotifyFilters
          tracks={tracks}
          setFilteredTracks={setAdvancedFilteredTracks}
        />
      </Modal>
      <CardLayoutButtons />
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

  function CardLayoutButtons() {
    return (
      <Buttons.LayoutCenter>
        {selectManager && (
          <>
            <Buttons.PrimaryGreenButton
              onClick={() => selectManager?.selectAll(filteredTracks)}
            >
              <BiAddToQueue />
              <span>Select All</span>
            </Buttons.PrimaryGreenButton>
            <Buttons.PrimaryGreenButton
              onClick={() => selectManager?.unselectAll()}
              disabled={selectManager.selectedCount == 0}
            >
              <MdRemove />
              <span>Unselect All</span>
            </Buttons.PrimaryGreenButton>
          </>
        )}
        <Buttons.PrimaryGreenButton onClick={() => setShowAdvancedFilter(true)}>
          <HiFilter />
          <span>Advanced Filter</span>
        </Buttons.PrimaryGreenButton>

        <Buttons.PrimaryGreenButton
          rounded
          onClick={() => setAdvancedFilteredTracks(tracks)}
          aria-label={"Reset Advanced Filter"}
          disabled={tracks.length == advancedFilteredTracks.length}
        >
          <BiReset />
        </Buttons.PrimaryGreenButton>

        <Buttons.PrimaryGreenButton onClick={toggleHover}>
          <BsFillCursorFill />
          <span>{hover ? "Disable Hover" : "Enable Hover"}</span>
        </Buttons.PrimaryGreenButton>

        <Buttons.PrimaryGreenButton rounded onClick={toggleMute}>
          {mute ? <FaVolumeMute /> : <FaVolumeUp />}
        </Buttons.PrimaryGreenButton>
      </Buttons.LayoutCenter>
    );
  }
}

export default TrackView;
