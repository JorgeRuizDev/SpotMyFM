import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { Theme } from "enums/Theme";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import { clearPreviewData } from "next/dist/server/api-utils";
import { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useThemeStore } from "store/useTheme";
import Text from "styles/Text";
import Styled from "./GenrePie.styles";
interface IGenrePieProps {
  tracks: Track[];
  years: number[];
  decades: number[];
}

interface IData {
  name: string;
  count: number;
}
const PERCENTILE = 1 - 0.01;

type genreMapT = Map<string, number>;

function GenrePie({ tracks, years, decades }: IGenrePieProps): JSX.Element {
  const [data, setData] = useState<IData[]>([]);
  const { currentTheme } = useThemeStore();
  const { width, height, CustomTooltip, colors } = useRechartsHelper();

  const [dropOption, setDropOption] = useState<number | string>("full");

  const getData = useCallback(
    (getGenreMap: () => [map: Map<string, number>, total: number]) => {
      // k: genre, v: number of appearances
      const [genreMap, totalAppearances] = getGenreMap();
      const fivePercent = totalAppearances * (1 - PERCENTILE);

      const pieData: IData[] = [];

      for (const [genre, app] of [...genreMap].sort((a, b) => b[1] - a[1])) {
        pieData.push({ name: genre, count: app });

        if (app < fivePercent) {
          break;
        }
      }
      setData(pieData);
    },
    []
  );

  useEffect(() => {
    getData(() => getMapFullInterval(tracks));
  }, [getData, tracks]);

  function customLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const item = data[index];
    return percent > 0.03 ? (
      <text
        x={x}
        y={y}
        fill={
          currentTheme == Theme.DARK ? colors[index % colors.length] : "black"
        }
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {item.name} ({item.count})
      </text>
    ) : (
      <></>
    );
  }

  return (
    <>
      <h3>Your Favorite Genres ({PERCENTILE * 100} Percentile)</h3>
      <p>
        Showing your favorite genres from{" "}
        <Text.green>
          {dropOption.toString().includes("'s")
            ? "the " + dropOption
            : typeof dropOption == "number"
            ? "saved on " + dropOption
            : "all time"}
        </Text.green>
      </p>
      <Styled.Inline>
        <DropdownMenu
          items={[
            {
              component: (
                <span
                  style={{
                    textDecoration: dropOption == "full" ? "underline" : "",
                  }}
                >
                  All Tracks
                </span>
              ),
              onClick: () => {
                setDropOption("full");
                getData(() => getMapFullInterval(tracks));
              },
            },
            { component: "" },
            ...years.map((y) => ({
              component: (
                <span
                  style={{
                    textDecoration: dropOption == y ? "underline" : "",
                  }}
                >
                  Saved On {y}
                </span>
              ),
              onClick: () => {
                setDropOption(y);
                getData(() => getMapYear(tracks, y));
              },
            })),
          ]}
        >
          <span>Genre Interval (Saved Year)</span>
        </DropdownMenu>
        <DropdownMenu
          items={[
            {
              component: (
                <span
                  style={{
                    textDecoration: dropOption == "full" ? "underline" : "",
                  }}
                >
                  All Tracks
                </span>
              ),
              onClick: () => {
                setDropOption("full");
                getData(() => getMapFullInterval(tracks));
              },
            },
            { component: "" },
            ...decades.map((d) => ({
              component: (
                <span
                  style={{
                    textDecoration: dropOption == d + "'s" ? "underline" : "",
                  }}
                >
                  Released On {d}
                </span>
              ),
              onClick: () => {
                setDropOption(d + "'s");
                getData(() => getMapDecade(tracks, d));
              },
            })),
          ]}
        >
          <span>Genre Interval (Decade)</span>
        </DropdownMenu>
      </Styled.Inline>
      <ResponsiveContainer width={width} height={height * 1.4}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            outerRadius={"60%"}
            label={customLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload, label }) => (
              <CustomTooltip
                payload={payload}
                label={label}
                sort={(a, b) => b.value - a.value}
              />
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

const RADIAN = Math.PI / 180;

const getMapFullInterval = (tracks: Track[]): [genreMapT, number] => {
  const genreMap = new Map<string, number>();
  let totalAppearances = 0;
  for (const t of tracks) {
    const genres = t.artists.flatMap((a) => a.spotifyGenres || []);
    for (const genre of genres) {
      const currentCount = genreMap.get(genre) || 0;
      genreMap.set(genre, currentCount + 1);
      totalAppearances += 1;
    }
  }

  return [genreMap, totalAppearances];
};

const getMapYear = (tracks: Track[], year: number): [genreMapT, number] => {
  const genreMap = new Map<string, number>();
  let totalAppearances = 0;
  for (const t of tracks) {
    if ((t.savedAt?.getFullYear() || 0) === year) {
      const genres = t.artists.flatMap((a) => a.spotifyGenres || []);
      for (const genre of genres) {
        const currentCount = genreMap.get(genre) || 0;
        genreMap.set(genre, currentCount + 1);
        totalAppearances += 1;
      }
    }
  }

  return [genreMap, totalAppearances];
};

const getMapDecade = (tracks: Track[], decade: number): [genreMapT, number] => {
  const genreMap = new Map<string, number>();
  let totalAppearances = 0;
  for (const t of tracks) {
    if ((t.album?.spotifyReleaseDate?.getFullYear() || 0) === decade) {
      const genres = t.artists.flatMap((a) => a.spotifyGenres || []);
      for (const genre of genres) {
        const currentCount = genreMap.get(genre) || 0;
        genreMap.set(genre, currentCount + 1);
        totalAppearances += 1;
      }
    }
  }

  return [genreMap, totalAppearances];
};
export default GenrePie;
