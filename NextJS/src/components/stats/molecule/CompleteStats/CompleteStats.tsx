import AlbumView from "components/core/cards/views/AlbumView";
import FavDecades from "components/stats/atoms/FavDecades";
import GenreEvolution from "components/stats/atoms/GenreEvolution";
import GenrePie from "components/stats/atoms/GenrePie";
import TrackFavDistribution from "components/stats/atoms/TrackFavDistribution";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import Buttons from "styles/Buttons";
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
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthday, setBirthday] = useState<Album[]>([]);

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

  const updateBirthday = useCallback(() => {
    const birthday = albums.filter(
      (a) =>
        a.spotifyReleaseDate &&
        a.spotifyReleaseDate.getMonth() == birthDate.getMonth() &&
        a.spotifyReleaseDate.getDate() == birthDate.getDate()
    );

    setBirthday(birthday);
  }, [albums, birthDate]);

  useEffect(updateBirthday, [updateBirthday]);
  const { t, lang } = useTranslation();
  return (
    <>
      <Styled.Layout>
        <h1 style={{ width: "100%", textAlign: "center" }}>
          Your Personal Stats
        </h1>
        {!!tracks.length && (
          <Styled.OverScroll>
            <GenreEvolution tracks={tracks} years={userActiveYears} />
          </Styled.OverScroll>
        )}
        {!!tracks.length && (
          <Styled.OverScroll>
            <GenrePie
              tracks={tracks}
              years={userActiveYears}
              decades={decades}
            />
          </Styled.OverScroll>
        )}
        {!!tracks.length && !!albums.length && (
          <Styled.OverScroll>
            <FavDecades
              tracks={tracks}
              albums={albums}
              years={userActiveYears}
            />
          </Styled.OverScroll>
        )}

        {!!tracks.length && (
          <Styled.OverScroll>
            <TrackFavDistribution tracks={tracks} years={userActiveYears} />
          </Styled.OverScroll>
        )}
        <h3 style={{ width: "100%", textAlign: "center" }}>
          🎉These albums are celebrating their birthday (
          {birthDate.toLocaleDateString(lang)})🎉
        </h3>
        <Styled.Inline>
          <Buttons.PrimaryGreenButton
            rounded
            onClick={() =>
              setBirthDate((d) => new Date(d.getTime() - oneDayMs))
            }
          >
            <HiArrowLeft />
          </Buttons.PrimaryGreenButton>
          <Buttons.PrimaryGreenButton
            rounded
            onClick={() =>
              setBirthDate((d) => new Date(d.getTime() + oneDayMs))
            }
          >
            <HiArrowLeft style={{ transform: "rotate(180deg)" }} />
          </Buttons.PrimaryGreenButton>{" "}
        </Styled.Inline>
        <Styled.AlbumViewMinH>
          {birthday.length ? (
            <AlbumView albums={birthday} />
          ) : (
            <h4>No album in your view was released on a day like this day.</h4>
          )}
        </Styled.AlbumViewMinH>
      </Styled.Layout>
    </>
  );
}

const oneDayMs = 1000 * 60 * 60 * 24;

export default CompleteStats;
