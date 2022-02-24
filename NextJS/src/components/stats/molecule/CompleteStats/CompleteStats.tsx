import FavDecades from "components/stats/atoms/FavDecades";
import GenreEvolution from "components/stats/atoms/GenreEvolution";
import GenrePie from "components/stats/atoms/GenrePie";
import TrackFavDistribution from "components/stats/atoms/TrackFavDistribution";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useEffect, useState } from "react";
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
  // State that stores all the decades found
  const [decades, setDecades] = useState<number[]>([]);
  // State that stores all the years in which the user has saved at least one track
  const [userActiveYears, setUserActiveYears] = useState<number[]>([]);

  const updateYearsDecades = useCallback(() => {
    const years = new Set<number>();
    const decades = new Set<number>();
    for (const t of tracks) {
      if (t.savedAt) {
        years.add(t.savedAt.getFullYear());
      }
      if (t.album?.spotifyReleaseDate) {
        decades.add(
          Math.floor(t.album.spotifyReleaseDate.getFullYear() / 10) * 10
        );
      }
    }

    setUserActiveYears(Array.from(years.values()).sort());
    setDecades(Array.from(decades.values()).sort());
  }, [tracks]);

  // On Load, update the years an decades list
  useEffect(updateYearsDecades, [updateYearsDecades]);
  return (
    <Styled.Layout>
      {!!tracks.length && (
        <Styled.OverScroll>
          <GenreEvolution tracks={tracks} years={userActiveYears} />
        </Styled.OverScroll>
      )}
      {!!tracks.length && (
        <Styled.OverScroll>
          <GenrePie tracks={tracks} years={userActiveYears} decades={decades} />
        </Styled.OverScroll>
      )}
      {!!tracks.length && !!albums.length && (
        <Styled.OverScroll>
          <FavDecades tracks={tracks} albums={albums} years={userActiveYears} />
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
