import React, { useCallback } from "react";
import demoTracks from "../TrackDemo/tracks";
import Styled from "./FilterDemo.styles";
import { Album } from "../../../../../../data/cacheDB/dexieDB/models/Album";
import { Track } from "../../../../../../data/cacheDB/dexieDB/models/Track";
import PillSearch from "../../../../../core/input/molecules/PillSearch";
import DateIntervalSelector from "../../../../../core/input/molecules/DateIntervalSelector";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import useTranslation from "next-translate/useTranslation";
interface IFilterDemoProps {}

function FilterDemo(props: IFilterDemoProps) {

    const {t} = useTranslation()

  //@ts-ignore
  const genres = demoTracks
    .flatMap((a) => a.artists?.flatMap((art: Artist) => art.spotifyGenres))
    .filter((g) => g !== undefined);

  // remove undefined from genres:
  const albums = demoTracks.map((t) => t.album).filter((a) => a !== undefined);
  return (
    <Styled.Col>
      <Styled.Card>
        <PillSearch
          title={<h4>{t('cards:filter_by_artist_genres')}</h4>}
          type={"genre"}
          examplePill={"Example: Minecraft Ambient"}
          // @ts-ignore
          items={genres}
          setFilteredItems={() => {}}
        />
      </Styled.Card>
      <Styled.Card>
        <DateIntervalSelector
          albums={getAlbums(demoTracks)}
          setDateInterval={() => {}}
        />
      </Styled.Card>
    </Styled.Col>
  );
}

function getAlbums(tracks: Track[]) {
  const albums: Album[] = [];
  for (const t of tracks) {
    if (t.album !== undefined) {
      albums.push(t.album);
    }
  }
  return albums;
}

export default FilterDemo;
