import FavDecades from "components/stats/atoms/FavDecades";
import GenreEvolution from "components/stats/atoms/GenreEvolution";
import GenrePie from "components/stats/atoms/GenrePie";
import TrackFavDistribution from "components/stats/atoms/TrackFavDistribution";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import Styled from "./CompleteStats.styles";

interface IStatsSettings {
  isLoading?: boolean;
}

interface ICompleteStatsProps {
  tracks?: Track[];
  albums?: Album[];
  artists?: Artist[];
  settings?: IStatsSettings;
}

function CompleteStats({
  tracks = [],
  albums = [],
  artists = [],
  settings = { isLoading: false },
}: ICompleteStatsProps): JSX.Element {
  return (
    <Styled.Layout>
      {!!tracks.length && (
        <Styled.OverScroll>
          <GenreEvolution tracks={tracks} />
        </Styled.OverScroll>
      )}
      {!!tracks.length && (
        <Styled.OverScroll>
          <GenrePie tracks={tracks} />
        </Styled.OverScroll>
      )}
      {!!tracks.length && !!albums.length && (
        <Styled.OverScroll>
          <FavDecades tracks={tracks} albums={albums} />
        </Styled.OverScroll>
      )}

      {!!tracks.length && (
        <Styled.OverScroll>
          <TrackFavDistribution tracks={tracks} />
        </Styled.OverScroll>
      )}
    </Styled.Layout>
  );
}

export default CompleteStats;
