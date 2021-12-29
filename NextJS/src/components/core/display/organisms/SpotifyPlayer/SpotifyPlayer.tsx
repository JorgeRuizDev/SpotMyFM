import { Popover } from "@headlessui/react";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";
import React, { useEffect, useState } from "react";
import Transition from "../../molecules/Transition";
import SpotifyPlayerButton from "./SpotifyPlayerButton";
interface ISpotifyPlayerProps {}
import { usePopper } from "react-popper";
import Styled from "./SpotifyPlayer.styles";
import SpotifyPlayerCard from "./SpotifyPlayerCard";

/**
 * Small Spotify Player Pop-Over
 *
 * Returns an small component that when clicked pops out a player.
 *
 * Uses the useSpotifyPlayer Hook
 *
 * @param props
 * @returns
 */

function SpotifyPlayer(props: ISpotifyPlayerProps): JSX.Element {
  const {
    nowPlaying,
    refreshPlaying,
    isPlaying,
    abvPlayers,
    currentPlayer,
    setPlayer,
    next,
    pause,
    resume,
    previous,
    refreshPlayers,
  } = useSpotifyPlayer();

  useEffect(() => {
    refreshPlaying();
    refreshPlayers();
  }, [refreshPlaying, refreshPlayers]);

  let [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
  });

  return (
    <Popover tw="relative" as="div" style={{ position: "relative" }}>
      <div
        onClick={() => {
          refreshPlaying();
          refreshPlayers();
        }}
      >
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
            <SpotifyPlayerCard
              track={nowPlaying}
              isPlaying={isPlaying}
              next={next}
              prev={previous}
              pause={pause}
              resume={resume}
              refreshPlaying={refreshPlaying}
              setPlayer={setPlayer}
              abvPlayers={abvPlayers}
              currentPlayer={currentPlayer}
            />
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}

export default React.memo(SpotifyPlayer);
