import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import { trackViewSettings } from "interfaces/Track";
import dynamic from "next/dynamic";
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import TrackView from "../TrackView";
import Styled from "./TrackSelectorView.styles";
import TracksToPlaylist from "./TracksToPlaylist";
import useTranslation from "next-translate/useTranslation";
interface ITrackSelectorViewProps {
  tracks: Track[];
  settings?: trackViewSettings;
}

function TrackSelectorView({ tracks, settings }: ITrackSelectorViewProps) {
  const { trackSet, toggleFromPlaylist, contains, addAll, removeAll } =
    useTrackToPlaylistSelector();
  const scrollRef = createRef<HTMLDivElement>();
  const toastId = useRef<React.ReactText>();
    const {t} = useTranslation();
  const NotificationMsg = useMemo(
    () => (
      <>
        <div>
          <a onClick={() => scrollRef.current?.scrollIntoView()}>
            {t('cards:selected_tracks_finish_playlist', {'%size%': trackSet.size})}
          </a>
        </div>
      </>
    ),
    [scrollRef, trackSet.size]
  );

  const notify = useCallback(
    () =>
      (toastId.current = toast.info(NotificationMsg, {
        progress: 20000,
        hideProgressBar: false,
        autoClose: 0,
      })),
    [NotificationMsg]
  );

  const updateNotification = useCallback(
    () =>
      toast.update(toastId.current || "", {
        render: NotificationMsg,
        type: "info",
        progress: 10000,
        autoClose: 0,
      }),
    [NotificationMsg]
  );

  const [viewRef, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (!inView && trackSet.size > 0) {
      if (!toastId.current) {
        notify();
      } else {
        updateNotification();
      }
    }
  }, [inView, notify, trackSet.size, updateNotification]);

  const selectManager = useMemo(
    () => ({
      isSelected: contains,
      toggleSelected: toggleFromPlaylist,
      selectAll: addAll,
      unselectAll: removeAll,
      selectedCount: trackSet.size,
    }),
    [addAll, contains, removeAll, toggleFromPlaylist, trackSet]
  );

  return (
    <>
      <div ref={viewRef}></div>
      <div style={{ position: "relative" }} ref={scrollRef}>
        {trackSet.size > 0 ? (
          <>
            <TracksToPlaylist
              tracks={Array.from(trackSet.values()).map((t) => t.spotifyUri)}
              unselectAll={removeAll}
            />
          </>
        ) : null}

        <TrackView
          tracks={tracks}
          settings={settings}
          selectManager={selectManager}
        />
      </div>
    </>
  );
}

export default TrackSelectorView;
