import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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

const GENRES_PER_STAMP = 8;

interface IData {
  [k: string]: number;
}

function GenreEvolution({ tracks }: IGenreEvolutionProps): JSX.Element {
  const [data, setData] = useState<IData[]>([]);
  const [genres, setGenres] = useState<string[]>([]);

  const { currentTheme } = useThemeStore();
  const { getStroke, width, height, margin, CustomTooltip } = useRechartsHelper();

  const groupByDecade = useCallback(() => {
    const decadeMap = new Map<number, Map<string, number>>();
    const data: IData[] = [];
    const displayGenres = new Set<string>();

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

    // Get the TOP 5 Genres of each Decade:
    for (const [decade, genres] of Array.from(decadeMap.entries()).sort(
      (a, b) => a[0] - b[0]
    )) {
      // Slice Top 5
      const sortedGenres: [string, number][] = Array.from(genres.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, GENRES_PER_STAMP)
        .map(([genre, _], i) => [genre, GENRES_PER_STAMP - i]);

      const genreDict = Object.fromEntries(sortedGenres);
      genreDict["decade"] = decade;
      console.log(genreDict);
      //genreDict["decade"] = decade;
      data.push(genreDict);

      for (const genre of sortedGenres) {
        displayGenres.add(genre[0]);
      }

      const oldestDecade = data[0];
      const newestDecade = data[data.length - 1];
      setData([
        { decade: oldestDecade.decade - 10 },
        ...data,
        { decade: newestDecade.decade + 10 },
      ]);
      setGenres(Array.from(displayGenres.values()));
    }
  }, [tracks]);

  useEffect(() => groupByDecade(), [groupByDecade]);

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={getStroke()} />
        <XAxis dataKey="decade" stroke={getStroke()} />
        <YAxis stroke={getStroke()} />
        <Tooltip
          itemSorter={(itm) => -(itm.value || 1)}
          content={({ payload, label }) => (
            <CustomTooltip payload={payload} label={label} />
          )}
        />

        {genres.map((g) => (
          <Line
            key={g}
            dataKey={g}
            stroke={generateColorFromString(g, currentTheme)}
            dot={{
              stroke: generateColorFromString(g, currentTheme),
              strokeWidth: 10,
              r: 1,
              strokeDasharray: "",
            }}
            strokeWidth={3}
          />
        ))}
      </LineChart>
    </>
  );
}

export default React.memo(GenreEvolution);
