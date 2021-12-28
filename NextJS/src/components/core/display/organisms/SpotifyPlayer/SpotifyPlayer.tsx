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

function SpotifyPlayer(props: ISpotifyPlayerProps): JSX.Element {
  const api = useClientsStore((s) => s.spotifyApi);
  const [isOpen, setIsOpen] = useState(true);
  const { nowPlaying, refreshPlaying } = useSpotifyPlayer();

  return (
    <Popover
      tw="relative"
      onMouseEnter={() => setIsOpen(true)}
      style={{ width: "300px" }}
      as="div"
    >
      <div>
        <Popover.Button as="div">
          <SpotifyPlayerButton playing={nowPlaying} />
        </Popover.Button>
        <Transition>
          <Popover.Panel tw="absolute z-10">
            {nowPlaying && <SimpleTrackCard track={nowPlaying} />}
          </Popover.Panel>
        </Transition>
      </div>
      <button onClick={refreshPlaying}>Refresh</button>
    </Popover>
  );
}

export default SpotifyPlayer;
