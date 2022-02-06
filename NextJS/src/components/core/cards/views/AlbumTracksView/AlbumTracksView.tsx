/* eslint-disable react/jsx-no-undef */
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import useTrackSorter from "hooks/sorters/useTrackSorter";
import { IFilterInputProps } from "interfaces/IFilterInputProps";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BsFillVinylFill } from "react-icons/bs";
import { useClientsStore } from "store/useClients";
import filterTrack from "util/filters/filterTrack";
import {
  ListTrackCard,
  ListTrackCardHeader,
} from "../../listCards/ListTrackCard";
import SimpleTrackCard from "../../simpleCards/SimpleTrackCard";
import GenericCardView, {
  ViewTypeOption,
} from "../GenericCardView/GenericCardView";
import Styled from "./AlbumTracksView.styles";
interface IAlbumTracksViewProps {
  album: Album;
  scrollbarTargetId?: string;
  isNested?: boolean;
}

function AlbumTracksView({
  album,
  scrollbarTargetId,
  isNested = false,
}: IAlbumTracksViewProps): JSX.Element {
  const api = useClientsStore().spotifyApi;
  const { getTracksByIds } = useDataFacade();

  // Tracks States
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [tracksDisc, setTracksDisc] = useState<Track[][]>([]);

  // Track Controls
  const [mute, setMute] = useState(false);
  const [hover, setHover] = useState(!isMobile);

  const [currentView, setCurrentView] = useState<ViewTypeOption>("LIST");

  const [isLoading, setIsLoading] = useState(false);

  // Retrieve all the Tracks of an album
  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      const res = await api.getAllAlbumTracks(album.spotifyId);

      const tracks = await getTracksByIds(res.map((t) => t.id));

      setTracks(tracks);
      setIsLoading(false);
    };

    fn();
  }, [album.spotifyId, api, getTracksByIds]);

  // Filter the tracks into a map
  useEffect(() => {
    const map = new Map<number, Track[]>();

    for (const t of filteredTracks) {
      const current = map.get(t.spotifyDiscNumber);
      map.set(t.spotifyDiscNumber, current ? [...current, t] : [t]);
    }

    // Sort the children
    for (const [k, v] of map) {
      map.set(
        k,
        v.sort((x) => x.spotifyTrackAlbumPos)
      );
    }
    const sortedElements = Array.from(map)
      .sort((a, b) => a[0] - b[0])
      .map((t) => t[1]);
    setTracksDisc(sortedElements);
  }, [filteredTracks]);

  const filter: IFilterInputProps<Track> = {
    array: tracks,
    filterFunction: filterTrack,
    setFilteredArray: setFilteredTracks,
  };

  return (
    <>
      <GenericCardView
        filterInputProps={filter}
        setView={setCurrentView}
        view={
          currentView === "GRID"
            ? { type: currentView }
            : { type: currentView, ListHeader: <ListTrackCardHeader /> }
        }
        isLoading={isLoading}
        scrollableTargetId={scrollbarTargetId}
      >
        {currentView === "GRID"
          ? tracksDisc.map((tracks, i) => (
              <>
                <DiscNumber discId={i} key={-i} />
                {tracks.map((t, j) => (
                  <SimpleTrackCard
                    track={t}
                    key={j}
                    isMuted={mute}
                    playOnHover={hover}
                    isNested={true}
                  />
                ))}
              </>
            ))
          : tracksDisc.map((tracks, i) => (
              <>
                <DiscNumber discId={i} key={-i} />
                {tracks.map((t, j) => (
                  <ListTrackCard
                    track={t}
                    pos={j + 1}
                    key={j}
                    isNested={isNested}
                  />
                ))}
              </>
            ))}
      </GenericCardView>
    </>
  );
}

function DiscNumber({ discId }: { discId: number }) {
  return (
    <Styled.FullWidth>
      <Styled.DiscNumber>
        <BsFillVinylFill /> <span>Disc {discId + 1}</span>
      </Styled.DiscNumber>
    </Styled.FullWidth>
  );
}
export default AlbumTracksView;
