import FavDecades from "components/stats/atoms/FavDecades";
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
      {!!tracks.length && !!albums.length && (
        <Styled.OverScroll>
          <FavDecades tracks={tracks} albums={albums} />
        </Styled.OverScroll>
      )}
    </Styled.Layout>
  );
}

export default CompleteStats;
