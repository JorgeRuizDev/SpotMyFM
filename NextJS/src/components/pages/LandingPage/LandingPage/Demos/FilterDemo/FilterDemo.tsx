import PillSearch from "components/atoms/PillSearch";
import DateIntervalSelector from "components/molecules/DateIntervalSelector";
import { getGenres } from "components/organisms/LibraryFilter/LibraryFilter";
import { Album } from "models/Album";
import { Track } from "models/Track";
import React, { useCallback } from "react";
import demoTracks from "../TrackDemo/tracks";
import Styled from "./FilterDemo.styles";
interface IFilterDemoProps {}

function FilterDemo(props: IFilterDemoProps) {
  const genres = getGenres(demoTracks.map(a => a.artists?.[0]));
  const albums = demoTracks.map(t => t.album).filter(a => a !== undefined);
  return (
    <Styled.Col>
      <Styled.Card>
        <PillSearch
          title={<h4>🎸Filter by Artist Genres:</h4>}
          type={"genre"}
          examplePill={"Example: Minecraft Ambient"}
          items={genres}
          setFilteredItems={useCallback((items, isAnd) => {}, [])}
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
