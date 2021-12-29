import { Popover } from "@headlessui/react";
import SimpleTrackCard from "components/core/cards/simpleCards/SimpleTrackCard";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";
import React, { useEffect, useState } from "react";
import Transition from "../../molecules/Transition";
import SpotifyPlayerButton from "./SpotifyPlayerButton";
interface ISpotifyPlayerProps {}
import { usePopper } from "react-popper";
import Styled from "./SpotifyPlayer.styles";

function SpotifyPlayer(props: ISpotifyPlayerProps): JSX.Element {
  const { nowPlaying, refreshPlaying } = useSpotifyPlayer();

  useEffect(() => {
    refreshPlaying();
  }, [refreshPlaying]);

  let [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {placement: "bottom-start"});

  return (
    <Popover tw="relative" as="div" style={{ position: "relative" }}>
      <div onClick={refreshPlaying}>
        <Popover.Button
          as="div"
          ref={setReferenceElement}
          style={{ cursor: "pointer" }}
        >
          <SpotifyPlayerButton playing={nowPlaying} />
        </Popover.Button>
      </div>

      <div
        ref={setPopperElement}
        style={{
          ...styles.popper,
          position: "absolute",
          zIndex: 41,
          top: 0,
          left: 0,
        }}
        {...attributes.popper}
      >
        <Transition>
          <Popover.Panel as="div">
            <button onClick={refreshPlaying}>refresh</button>
            {nowPlaying && <SimpleTrackCard track={nowPlaying} />}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}

export default React.memo(SpotifyPlayer);
