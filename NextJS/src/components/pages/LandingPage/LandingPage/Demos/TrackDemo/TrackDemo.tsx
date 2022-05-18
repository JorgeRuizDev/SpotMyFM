import DropdownMenu from "components/atoms/DropdownMenu";
import Paginate from "components/atoms/Paginate";
import SimpleTrackCard from "components/molecules/cards/SimpleTrackCard";
import FilterInput from "components/molecules/FilterInput";
import usePaginatedArray from "hooks/usePaginatedArray";
import useTrackSorter from "hooks/useTrackSorter";
import { Track } from "models/Track";
import React, { createRef, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiAddToQueue } from "react-icons/bi";
import { BsFillCursorFill } from "react-icons/bs";
import { FaShareAlt, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { MdRemove } from "react-icons/md";
import Buttons from "styles/Buttons";
import Styled from "./TrackDemo.styles";
import demoTracks from "./tracks";
interface ITrackDemoProps {}

function TrackDemo(props: ITrackDemoProps): JSX.Element {
  const [mute, setMute] = useState(false);
  const [hover, setHover] = useState(!isMobile);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const trackLayoutStartRef = createRef<HTMLDivElement>();

  // Sort Item:
  const {
    sortedTracks,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
    sortOptions
  } = useTrackSorter(demoTracks);

  useEffect(() => {
    setFilteredTracks(sortedTracks);
  }, [sortedTracks]);

  function toggleMute() {
    setMute(!mute);
  }

  function toggleHover() {
    setHover(!hover);
  }

  // Pagination:
  const pageSize = isMobile ? 2 : 4;

  const {
    activePageItems: pageTracks,
    currentPage,
    setCurrentPage
  } = usePaginatedArray<Track>(filteredTracks, pageSize, 0);

  return (
    <div>
      <div ref={trackLayoutStartRef}></div>
      <FilterInput
        array={sortedTracks}
        setFilteredArray={setFilteredTracks}
        filterFunction={filterFunction}
      />
      <PaginationBar />

      <CardLayoutButtons />
      <SortSelector />
      <CardLayout />

      <PaginationBar />
    </div>
  );

  function CardLayout() {
    return (
      <Styled.CardLayout>
        {pageTracks.map((t, i) => (
          <SimpleTrackCard
            key={i}
            track={t}
            album={t.album}
            artists={t.artists}
            playOnHover={hover}
            isMuted={mute}
          />
        ))}
      </Styled.CardLayout>
    );
  }

  function CardLayoutButtons() {
    return (
      <Styled.LayoutButtonsWrap>
        <Buttons.PrimaryGreenButton>
          <BiAddToQueue />
          <span>Select All</span>
        </Buttons.PrimaryGreenButton>
        <Buttons.PrimaryGreenButton disabled={true}>
          <MdRemove />
          <span>Unselect All</span>
        </Buttons.PrimaryGreenButton>

        {!isMobile ? (
          <Buttons.PrimaryGreenButton onClick={toggleHover}>
            <BsFillCursorFill />
            <span>{hover ? "Disable Hover" : "Enable Hover"}</span>
          </Buttons.PrimaryGreenButton>
        ) : null}
        <Buttons.PrimaryGreenButton disabled={true}>
          <FaShareAlt />
          <span>Share Selected</span>
        </Buttons.PrimaryGreenButton>

        <Styled.ButtonRound onClick={toggleMute}>
          {mute ? <FaVolumeMute /> : <FaVolumeUp />}
        </Styled.ButtonRound>
      </Styled.LayoutButtonsWrap>
    );
  }

  function SortSelector() {
    return (
      <Styled.LayoutButtonsWrap>
        <DropdownMenu
          items={Object.entries(sortOptions).map(o => {
            return {
              component: o[1],
              onClick: () => {
                setOptionState(o[1]);
              }
            };
          })}
        >
          <span>Sort Tracks</span>
        </DropdownMenu>
        <Buttons.SecondaryGreenButton
          onClick={() => setIsAscendentState(p => !p)}
        >
          <span>
            {optionState} {isAscendentState ? "Ascending" : "Descending"}
          </span>
        </Buttons.SecondaryGreenButton>
      </Styled.LayoutButtonsWrap>
    );
  }

  /**
   * Small Pagination menu
   *
   * @return {Pagination component}
   */
  function PaginationBar() {
    return (
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={pageSize}
        total={filteredTracks.length}
        onChange={() => {
          trackLayoutStartRef?.current?.scrollIntoView();
        }}
      />
    );
  }
}

/**
 * Function used in the Filter input field
 *
 * @param {Track} t
 * @param {string} value
 * @return {*}
 */
function filterFunction(t: Track, value: string) {
  return (
    t.name.toUpperCase().includes(value) ||
    t.album?.name.toUpperCase().includes(value) ||
    t?.artists?.map(a => a.name.toUpperCase().includes(value)).includes(true) ||
    t.album?.spotifyReleaseDate
      ?.getFullYear()
      .toString()
      .includes(value) ||
    false
  );
}

export default TrackDemo;
