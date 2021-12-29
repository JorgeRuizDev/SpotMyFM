import { Popover } from "@headlessui/react";
import SimpleTrackCard from "components/core/cards/simpleCards/SimpleTrackCard";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import useSpotifyPlayer from "hooks/spotify/useSpotifyPlayer";
import React, { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Transition from "../../molecules/Transition";
import Styled from "./SpotifyPlayer.styles";
import SpotifyPlayerButton from "./SpotifyPlayerButton";
interface ISpotifyPlayerProps {}
import { usePopper } from "react-popper";

function SpotifyPlayer(props: ISpotifyPlayerProps): JSX.Element {
  const { nowPlaying, refreshPlaying } = useSpotifyPlayer();

  let [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  let { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <Popover tw="relative" as="div" style={{ position: "relative" }}>
      <Popover.Button as="div" ref={setReferenceElement}>
        <SpotifyPlayerButton playing={nowPlaying} />
      </Popover.Button>
      <div ref={setPopperElement} style={{...styles.popper, position: "absolute", zIndex: 41, top: 0, left: 0}} {...attributes.popper}>
        <Transition>
          <Popover.Panel as="div">
            {nowPlaying && <SimpleTrackCard track={nowPlaying} />}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}

export default SpotifyPlayer;
