import Modal from "components/core/display/molecules/Modal";
import AdvancedSpotifyFilters from "components/core/input/organisms/AdvancedTrackFilters";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackSorter, {
  trackSortingOptions,
} from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { selectManager, trackViewSettings } from "interfaces/Track";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillCursorFill } from "react-icons/bs";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
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
import useTranslation from "next-translate/useTranslation";
import FilterButton from "../../buttons/FilterButton";
import SelectAllButton from "../../buttons/SelectAllButton";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import CompleteStats from "components/stats/molecule/CompleteStats";
import { IoStatsChart } from "react-icons/io5";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import RecommendationView from "../RecommendationView";
interface ITrackViewProps {
  tracks: Track[];
  settings?: trackViewSettings;
  selectManager?: selectManager;
  isDemo?: boolean;
}

/**
 * Renders multiple tracks as a grid or list.
 * Playlist Button Controls
 * Advanced Filter
 * Preview on Toggle controls
 * @returns
 */
function TrackView({
  tracks,
  settings = {
    defaultTrackSort: trackSortingOptions.DEFAULT,
    isLoading: false,
    isNested: false,
  },
  selectManager,
  isDemo = false,
}: ITrackViewProps): JSX.Element {
  const { t } = useTranslation();
  const [mute, setMute] = useState(false);
  const [hover, setHover] = useState(!isMobile);
  const [advancedFilteredTracks, setAdvancedFilteredTracks] =
    useState<Track[]>(tracks);
  const [resetAdvFilter, setResetAdvFilter] = useState(false);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  const [currentView, setCurrentView] = useState<ViewTypeOption>(
    settings.defaultView ? settings.defaultView : isMobile ? "LIST" : "GRID"
  );

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const [selectedRecommendations, setSelectedRecommendations] = useState<
    Track[]
  >([]);

  // Sort Item:
  const {
    sortedTracks,
    optionState,
    setOptionState,
    isAscendentState,
    setIsAscendentState,
  } = useTrackSorter(advancedFilteredTracks, settings.defaultTrackSort);

  const sorting: IGenericCardViewSortProps = {
    sortTitle: t("views:sort-tracks"),
    options: trackSortingOptions,
    isAscendant: isAscendentState,
    selected: optionState,
    setIsAscendant: setIsAscendentState,
    setSorting: (s: string) => {
      setOptionState(s);
    },
  };

  const [recWasSelected, setRecWasSelected] = useState(new Set<string>());
  useEffect(() => {
    setFilteredTracks([...selectedRecommendations, ...advancedFilteredTracks]);

    if (selectManager) {
      selectedRecommendations.forEach((t) => {
        if (!selectManager.isSelected(t) && !recWasSelected.has(t.spotifyId)) {
          selectManager.toggleSelected(t);
          setRecWasSelected((s) => new Set([...s, t.spotifyId]));
        }
      });
    }
  }, [
    advancedFilteredTracks,
    recWasSelected,
    selectManager,
    selectedRecommendations,
  ]);

  // Set the Advanced Filtered Tracks
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

  const toggleMute = useCallback(() => {
    setMute((s) => !s);
  }, []);

  const toggleHover = useCallback(() => {
    setHover((s) => !s);
  }, []);

  const emptyToggle = useCallback((t: Track) => {}, []);

  // Get all the albums without dupes
  const albums = useMemo(() => {
    const albumMap = new Map<string, Album>();

    tracks
      .flatMap((t) => (t.album ? [t.album] : []))
      .forEach((a) => albumMap.set(a.spotifyId, a));
    return Array.from(albumMap.values());
  }, [tracks]);

  const artists = useMemo(() => {
    const artistMap = new Map<string, Artist>();

    tracks
      .flatMap((t) => (t.artists ? [...t.artists] : []))
      .forEach((a) => artistMap.set(a.spotifyId, a));
    return Array.from(artistMap.values());
  }, [tracks]);

  const selectedTracks = useMemo(
    () => tracks.filter((t) => selectManager?.isSelected(t)),
    [selectManager, tracks]
  );

  return (
    <>
      <Modal
        isOpen={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        doNotUmount={!resetAdvFilter}
      >
        <AdvancedSpotifyFilters
          tracks={tracks}
          albums={albums}
          setFilteredTracks={setAdvancedFilteredTracks}
        />
      </Modal>
      <Modal isOpen={showStats} onClose={() => setShowStats(false)}>
        <CompleteStats tracks={tracks} albums={albums} />
      </Modal>
      <Modal
        isOpen={showRecommendations}
        onClose={() => setShowRecommendations(false)}
      >
        <RecommendationView
          setRecommendations={setSelectedRecommendations}
          tracks={selectedTracks}
          selectedTracks={selectedRecommendations}
        />
      </Modal>
      <CardLayoutButtons
        advancedFilteredTracks={advancedFilteredTracks}
        mute={mute}
        hover={hover}
        filteredTracks={filteredTracks}
        setAdvancedFilteredTracks={setAdvancedFilteredTracks}
        setResetAdvFilter={setResetAdvFilter}
        setShowAdvancedFilter={setShowAdvancedFilter}
        toggleHover={toggleHover}
        toggleMute={toggleMute}
        tracks={tracks}
        selectManager={selectManager}
        setShowStats={setShowStats}
        showRecommendations={showRecommendations}
        setShowRecommendations={setShowRecommendations}
        isDemo={isDemo}
      />
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
        scrollableTargetId={settings.scrollableTargetId}
        defaultPageSize={isDemo ? 4 : undefined}
      >
        {currentView === "GRID"
          ? filteredTracks.map((t, i) => (
              <SimpleTrackCard
                track={t}
                key={i}
                inPlaylist={selectManager?.isSelected(t)}
                toggleFromPlaylist={
                  selectManager ? selectManager.toggleSelected : emptyToggle
                }
                isDemo={isDemo}
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
                isDemo={isDemo}
              />
            ))}
      </GenericCardView>
    </>
  );
}

interface ICardLayoutButtons extends ITrackViewProps {
  filteredTracks: Track[];
  setAdvancedFilteredTracks: (t: Track[]) => void;
  advancedFilteredTracks: Track[];
  mute: boolean;
  hover: boolean;

  toggleMute: () => void;
  toggleHover: () => void;
  setShowAdvancedFilter: (b: boolean) => void;
  setResetAdvFilter: (b: boolean) => void;
  setShowStats: (b: boolean) => void;

  showRecommendations: boolean;
  setShowRecommendations: (b: boolean) => void;
  isDemo: boolean;
}

function CardLayoutButtons({
  tracks,
  selectManager,
  hover,
  toggleHover,
  advancedFilteredTracks,
  setAdvancedFilteredTracks,
  filteredTracks,
  mute,
  setResetAdvFilter,
  setShowAdvancedFilter,
  showRecommendations,
  setShowRecommendations,
  toggleMute,
  setShowStats,
  isDemo,
}: ICardLayoutButtons) {
  const { t } = useTranslation();
  return (
    <Buttons.LayoutCenter>
      {selectManager && (
        <SelectAllButton
          onSelect={() => {
            selectManager.selectAll(filteredTracks);
          }}
          onUnselect={() => selectManager.unselectAll()}
          disableUnselect={selectManager.selectedCount == 0}
          disableSelect={!filteredTracks.length}
        />
      )}

      <FilterButton
        onFilter={() => {
          setShowAdvancedFilter(true);
          setResetAdvFilter(false);
        }}
        onReset={() => {
          setAdvancedFilteredTracks(tracks);
          setResetAdvFilter(true);
        }}
        disableReset={tracks.length == advancedFilteredTracks.length}
        disableFilter={!advancedFilteredTracks.length}
      />

      <Buttons.SecondaryGreenButton
        onClick={() => setShowStats(true)}
        disabled={!tracks.length}
      >
        <IoStatsChart />
        <span>{t("cards:show_stats")}</span>
      </Buttons.SecondaryGreenButton>
      {!isDemo && (
        <span
          onClick={() =>
            selectManager?.selectedCount == 0 &&
            toast.info(
              "Select / Add tracks to a playlist to see recommendations!"
            )
          }
        >
          <Buttons.SecondaryGreenButton
            onClick={() => setShowRecommendations(true)}
            disabled={selectManager?.selectedCount == 0}
          >
            <AiFillLike />
            <span>{t("cards:recommended")}</span>
          </Buttons.SecondaryGreenButton>
        </span>
      )}
      <DropdownMenu
        items={[
          {
            component: (
              <>
                {" "}
                <BsFillCursorFill />
                <span>
                  {hover ? t("views:disable-hover") : t("views:enable-hover")}
                </span>
              </>
            ),
            onClick: toggleHover,
          },

          {
            component: mute ? (
              <>
                <FaVolumeMute /> <span>{t("views:unmute")}</span>
              </>
            ) : (
              <>
                <FaVolumeUp /> <span>{t("views:mute")}</span>
              </>
            ),
            onClick: toggleMute,
          },
        ]}
      >
        <FiMoreHorizontal />
        <span>{t("views:more")}</span>
      </DropdownMenu>
    </Buttons.LayoutCenter>
  );
}

export default React.memo(TrackView);
