import { Popover } from "@headlessui/react";
import SimpleTrackCard from "components/core/cards/simpleCards/SimpleTrackCard";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import React, { useEffect, useState } from "react";
import { useClientsStore } from "store/useClients";
import Transition from "../../molecules/Transition";
import Styled from "./SpotifyPlayer.styles";
interface ISpotifyPlayerProps {}

function SpotifyPlayer(props: ISpotifyPlayerProps): JSX.Element {
  const api = useClientsStore((s) => s.spotifyApi);
  const [playing, setPlaying] = useState<Track>();

  const { getTracksByIds } = useDataFacade();

  useEffect(() => {
    const fn = async () => {
      const track = await api.getMyCurrentPlayingTrack();
      console.log(track);

      const t = await getTracksByIds([track.item?.id || ""]);
      console.log(t);
      setPlaying(t[0]);
    };
    fn();
  }, [api, getTracksByIds]);
  console.log(playing);
  return (
    <Popover tw="relative">
      <div tw="min-w-[100px]">
        <Popover.Button>Player</Popover.Button>
        <Transition>
          <Popover.Panel tw="absolute z-10">
            {playing && <SimpleTrackCard track={playing} />}
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}

export default SpotifyPlayer;
