import { Track } from "data/cacheDB/dexieDB/models/Track";
import { motion } from "framer-motion";
import useTrackToPlaylistSelector from "hooks/tracksToPlaylist/useTrackToPlaylistSelector";
import { trackViewSettings } from "interfaces/Track";
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useInView } from "react-hook-inview";
import { toast } from "react-toastify";
import Buttons from "styles/Buttons";
import TrackView from "../TrackView";
import Styled from "./TrackSelectorView.styles";
import TracksToPlaylist from "./TracksToPlaylist";
interface ITrackSelectorViewProps {
  tracks: Track[];
  settings?: trackViewSettings;
}

function TrackSelectorView({ tracks, settings }: ITrackSelectorViewProps) {
  const { trackSet, toggleFromPlaylist, contains, addAll, removeAll } =
    useTrackToPlaylistSelector();
  const scrollRef = createRef<HTMLDivElement>();
  const toastId = useRef<React.ReactText>();

  const NotificationMsg = useMemo(
    () => (
      <>
        <div>
          <a onClick={() => scrollRef.current?.scrollIntoView()}>
            {trackSet.size} Selected Tracks. Finish Playlist
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
          selectManager={{
            isSelected: contains,
            toggleSelected: toggleFromPlaylist,
            selectAll: addAll,
            unselectAll: removeAll,
            selectedCount: trackSet.size,
          }}
        />
      </div>
    </>
  );
}

export default TrackSelectorView;
