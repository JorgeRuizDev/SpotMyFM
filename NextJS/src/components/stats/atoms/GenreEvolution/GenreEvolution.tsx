import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import React from "react";
import { useCallback, useEffect, useState } from "react";
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
interface IGenreEvolutionProps {
  tracks: Track[];
}

const GENRES_PER_STAMP = 5;

interface IData {
  [k: string | number]: number | string;
}

function GenreEvolution({ tracks }: IGenreEvolutionProps): JSX.Element {
  const [data, setData] = useState<IData[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const [interval, setInterval] = useState([0, 5]);

  const { currentTheme } = useThemeStore();
  const { getStroke, width, height, margin, CustomTooltip, months } =
    useRechartsHelper();

  const groupBy = useCallback(
    (
      getGroup: () => Map<number, Map<string, number>>,
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

        setData([{}, ...data, {}]);
        setGenres(Array.from(displayGenres.values()));
      }
    },
    [interval]
  );

  useEffect(
    () =>
      groupBy(
        () => perSavedYear(tracks, 2020),
        (lbl) => months[lbl]
      ),
    [groupBy, months, tracks]
  );

  return (
    <>
      <DropdownMenu
        items={[
          { component: <span>Top 5</span>, onClick: () => setInterval([0, 5]) },
          { component: <span>Top 8</span>, onClick: () => setInterval([0, 8]) },
          {
            component: <span>Top 6-10</span>,
            onClick: () => setInterval([6, 10]),
          },
          {
            component: <span>Top 11-15</span>,
            onClick: () => setInterval([6, 10]),
          },
        ]}
      >
        <span>Top Interval</span>
      </DropdownMenu>
      <ResponsiveContainer width={width} height={height}>
        <LineChart data={data} margin={margin} stroke={getStroke()}>
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
              connectNulls
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
