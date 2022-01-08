import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isMobile } from "react-device-detect";
import { FaPause, FaPlay } from "react-icons/fa";
import Buttons from "styles/Buttons";

/**
 * Small hook that allows the control of a track.
 *
 * The user can mute the preview and hide the button depending of two parameters.
 *
 *
 * @param {IuseTrackPreview} {
 *   previewURL,
 *   isMuted,
 *   enablePreviewButton,
 * }
 * @return Two functions to play/pause the preview and a dynamic button.
 */
function useTrackPreview(
  previewURL: string,
  isMuted: boolean,
  enablePreviewButton: boolean
) {
  const tp = useRef(new Audio(previewURL));

  const isPlayable = useMemo(
    () => previewURL !== null && previewURL.length !== 0,
    [previewURL]
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // Do not preload the song until it is required
  useEffect(() => {
    tp.current.preload = "none";
  }, []);

  const play = useCallback(() => {
    if (!isMuted) {
      tp.current.volume = 0.4;
      tp.current.play().catch((e) => e);
      setIsPlaying(true);
    }
  }, [isMuted]);

  const pause = useCallback(() => {
    tp.current.pause();
    tp.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  function toggleAudio() {
    isPlaying ? pause() : play();
  }

  const PreviewButton = () => (
    <>
      {isPlayable && (isMobile || enablePreviewButton) ? (
        <Buttons.PrimaryGreenButton onClick={toggleAudio}>
          {isPlaying ? (
            <>
              <FaPause />
              <span>Pause</span>
            </>
          ) : (
            <>
              <FaPlay />
              <span>Preview</span>
            </>
          )}
        </Buttons.PrimaryGreenButton>
      ) : null}
    </>
  );

  useEffect(pause, [isMuted, tp, pause]);

  return { play, pause, PreviewButton, isPlayable };
}

export default useTrackPreview;
