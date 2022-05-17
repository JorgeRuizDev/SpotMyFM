import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import Switch from "components/core/input/atoms/Switch";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import Text from "styles/Text";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useThemeStore } from "store/useTheme";
import { generateColorFromString } from "util/colorGenerator";
import Styled from "./GenreEvolution.styles";
import useTranslation from "next-translate/useTranslation";
interface IGenreEvolutionProps {
  tracks: Track[];
  years: number[];
}

interface IData {
  [k: string | number]: number | string;
}

type intervalT = [number, number];

/**
 * Graph that shows the evolution of the artist genres
 * @param param0
 * @returns
 */
function GenreEvolution({ tracks, years }: IGenreEvolutionProps): JSX.Element {
  // Data to display in the graph
  const [data, setData] = useState<IData[]>([]);
  // Genres to display
  const [genres, setGenres] = useState<string[]>([]);
  // Connect the null values
  const [connect, setConnect] = useState(false);
  // Top Interval [0, 5] -> Top 5 Items, Top [6,10] -> Next 5 Items
  const [interval, setInterval] = useState<intervalT>([0, 5]);
  // State that stores the function that groups up the genre evolution and fills up the data state.
  const [groupFn, setGroupFn] = useState<(interval: intervalT) => void>(
    () => (int: intervalT) => groupBy(() => perDecade(tracks), int)
  );

  // Save the group type selection ("decade" or an specific year)
  const [dropGroupSel, setDropGroupSel] = useState<string | number>("decade");
  const { currentTheme } = useThemeStore();
  const { getStroke, width, height, margin, CustomTooltip, months } =
    useRechartsHelper();

  // Group By Main Function
  const groupBy = useCallback(
    (
      getGroup: () => Map<number, Map<string, number>>,
      interval: intervalT,
      formatXlbl: (lbl: number) => number | string = (lbl) => lbl
    ) => {
      const groupMap = getGroup();
      const displayGenres = new Set<string>();
      const data: IData[] = [];

      // Get the TOP 5 Genres of each Decade:
      for (const [decade, genres] of Array.from(groupMap.entries()).sort(
        (a, b) => a[0] - b[0]
      )) {
        // Slice Top 5
        const sortedGenres: [string, number][] = Array.from(genres.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(interval[0], interval[1])
          .map(([genre, _], i) => [genre, interval[1] - i]);

        const genreDict: IData = Object.fromEntries(sortedGenres);

        genreDict["decade"] = formatXlbl(decade);

        data.push(genreDict);

        for (const genre of sortedGenres) {
          displayGenres.add(genre[0]);
        }

        const extendedLines = data.flatMap((e) => [e, { ...e, decade: "" }]);

        setData([{}, ...extendedLines, {}]);
        setGenres(Array.from(displayGenres.values()));
      }
    },
    []
  );

  useEffect(() => {
    groupFn(interval);
  }, [groupFn, interval]);
  const { t } = useTranslation();

  return (
    <>
      <h3>{t("cards:artist_genres_evolution")}</h3>
      <Styled.Inline>
        <DropdownMenu
          items={[
            {
              component: (
                <span style={underlineIfTrue(interval[1] === 5)}>
                  {t("cards:top_5")}
                </span>
              ),
              onClick: () => setInterval([0, 5]),
            },
            {
              component: (
                <span style={underlineIfTrue(interval[1] === 8)}>
                  {t("cards:top_8")}
                </span>
              ),
              onClick: () => setInterval([0, 8]),
            },
            {
              component: (
                <span style={underlineIfTrue(interval[1] === 10)}>
                  {t("cards:top_610")}
                </span>
              ),
              onClick: () => setInterval([6, 10]),
            },
            {
              component: (
                <span style={underlineIfTrue(interval[1] === 15)}>
                  {t("cards:top_1115")}
                </span>
              ),
              onClick: () => setInterval([11, 15]),
            },
          ]}
        >
          <span>{t("cards:top_interval")}</span>
        </DropdownMenu>
        <DropdownMenu
          items={[
            {
              component: (
                <span style={underlineIfTrue("decade" === dropGroupSel)}>
                  {t("cards:track_release_decades")}
                </span>
              ),
              onClick: () => {
                setGroupFn(
                  () => (int: intervalT) =>
                    groupBy(() => perDecade(tracks), int)
                );
                setDropGroupSel("decade");
              },
            },
            ...years.map((y) => ({
              component: (
                <span style={underlineIfTrue(y === dropGroupSel)}>
                  {t("cards:saved_on", { "%y%": y })}
                </span>
              ),
              onClick: () => {
                setGroupFn(
                  () => (int: intervalT) =>
                    groupBy(
                      () => perSavedYear(tracks, y),
                      int,
                      (lbl) => months[lbl]
                    )
                );
                setDropGroupSel(y);
              },
            })),
          ]}
        >
          <span>{t("cards:group_by")}</span>
        </DropdownMenu>
        <Switch isChecked={connect} onToggle={() => setConnect((c) => !c)}>
          <span>{t("cards:connect_genre_skips")}</span>
        </Switch>
      </Styled.Inline>
      <p>
        {t("cards:showing")}{" "}
        <Text.green>
          {t("cards:top")}{" "}
          {interval[0] === 0 ? interval[1] : interval.join(" - ")}
        </Text.green>{" "}
        {t("cards:artist_genres_found_in_your_saved_tracks")}{" "}
        <Text.green>
          {" "}
          {dropGroupSel === "decade"
            ? "grouped by decades"
            : "of " + dropGroupSel}
        </Text.green>
      </p>
      <ResponsiveContainer width={width} height={height}>
        <LineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" stroke={getStroke()} />
          <XAxis
            dataKey="decade"
            stroke={getStroke()}
            angle={-45}
            textAnchor="end"
            domain={["dataMin", "dataMax "]}
          />
          <YAxis stroke={getStroke()} domain={["dataMin - 1", "dataMax + 1"]} />
          <Tooltip
            itemSorter={(itm) => -(itm.value || 0)}
            content={({ payload, label }) => (
              <CustomTooltip
                payload={payload}
                label={label}
                sort={(a, b) => b.value - a.value}
              />
            )}
          />

          {genres.map((g) => (
            <Line
              key={g}
              connectNulls={connect}
              dataKey={g}
              stroke={generateColorFromString(g, currentTheme)}
              dot={{
                stroke: generateColorFromString(g, currentTheme),
                strokeWidth: 4,
                r: 1,
                strokeDasharray: "",
              }}
              strokeWidth={3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function underlineIfTrue(underline: boolean) {
  return underline ? { textDecoration: "underline" } : {};
}

function perDecade(tracks: Track[]) {
  const decadeMap = new Map<number, Map<string, number>>();

  // Get all the tracks by year
  for (const t of tracks) {
    const year = t.album?.spotifyReleaseDate?.getFullYear();
    if (!year) {
      continue;
    }

    // Get the decade
    const decade = Math.floor(year / 10) * 10;

    const decadeGenres = decadeMap.get(decade) || new Map<string, number>();

    // Add Genre to Count
    for (const genre of t.artists.flatMap((a) => a.spotifyGenres || [])) {
      const currentCount = decadeGenres.get(genre) || 0;

      decadeGenres.set(genre, currentCount + 1);
    }
    decadeMap.set(decade, decadeGenres);
  }

  return decadeMap;
}

function perSavedYear(tracks: Track[], year: number) {
  const map = new Map<number, Map<string, number>>();

  for (const t of tracks) {
    const savedAt = t.savedAt;
    if (!savedAt || savedAt.getFullYear() !== year) {
      continue;
    }

    const month = savedAt.getMonth();

    const genres = map.get(month) || new Map<string, number>();

    // Add Genre to Count
    for (const genre of t.artists.flatMap((a) => a.spotifyGenres || [])) {
      const currentCount = genres.get(genre) || 0;

      genres.set(genre, currentCount + 1);
    }
    map.set(month, genres);
  }

  return map;
}
export default React.memo(GenreEvolution);
