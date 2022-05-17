import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import { useCallback, useEffect, useMemo, useState } from "react";
import Text from "styles/Text";
import StatStyles from "../../molecule/CompleteStats/CompleteStats.styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Styled from "./TrackFavDistribution.styles";
import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import useTranslation from "next-translate/useTranslation";
interface ITrackFavDistributionProps {
  tracks: Track[];
  years: number[];
}

interface IData {
  name: string;
  Total: number;
}

function dataFromMonthMap(map: Map<number, number>, months: string[]) {
  return Array.from(map)
    .sort((a, b) => a[0] - b[0])
    .map(([m, c]) => ({
      name: months[m],
      Total: c,
    }));
}

function TrackFavDistribution({
  tracks,
  years,
}: ITrackFavDistributionProps): JSX.Element {
  const savedTracks = useMemo(() => tracks.filter((t) => t.savedAt), [tracks]);

  const [yearData, setYearData] = useState<IData[]>([]);
  const [monthData, setMonthData] = useState<IData[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const [dropSel, setDropSel] = useState<string | number>("year");

  const {
    width,
    height,
    colors,
    months,
    getStroke,
    CustomTooltip,
    margin,
    animationDuration,
  } = useRechartsHelper();
  const __load = useCallback(async () => {
    const yearMap = new Map<number, number>();
    const monthMap = new Map<number, number>();

    for (const t of savedTracks) {
      if (t.savedAt !== undefined) {
        const year = t.savedAt.getFullYear();
        const month = t.savedAt.getMonth();
        yearMap.set(year, (yearMap.get(year) || 0) + 1);
        monthMap.set(month, (monthMap.get(month) || 0) + 1);
      }
    }

    setYearData(
      Array.from(yearMap)
        .sort((a, b) => a[0] - b[0])
        .map(([y, c]) => ({
          name: "Year " + y,
          Total: c,
        }))
    );

    setMonthData(dataFromMonthMap(monthMap, months));
  }, [months, savedTracks]);

  useEffect(() => {
    __load();
  }, [__load]);
  const {t} = useTranslation();
  useEffect(() => {
    if (typeof dropSel == "number") {
      const map = new Map<number, number>();
      for (const t of tracks) {
        const d = t.savedAt;
        if (d && d.getFullYear() == dropSel) {
          const month = d.getMonth();
          map.set(month, (map.get(month) || 0) + 1);
        }
      }

      setData(dataFromMonthMap(map, months));
    } else if (dropSel == "year") {
      setData(yearData);
    } else {
      setData(monthData);
    }
  }, [dropSel, monthData, months, tracks, yearData]);

  return savedTracks.length > tracks.length * 0.2 ? (
    <>
      <h3>{t('cards:saved_tracks_per_month')}</h3>
      <p>{t('cards:there_are_saved_tracks', {'%length%': savedTracks.length})}</p>
      <Styled.Center>
        <DropdownMenu
          items={[
            {
              component: (
                <span
                  style={{
                    textDecoration: dropSel == "year" ? "underline" : "",
                  }}
                >
                  {t('cards:per_year')}
                </span>
              ),
              onClick: () => {
                setDropSel("year");
              },
            },
            {
              component: (
                <span
                  style={{
                    textDecoration: dropSel == "acc" ? "underline" : "",
                  }}
                >
                  {t('cards:accumulated_months')}
                </span>
              ),
              onClick: () => {
                setDropSel("acc");
              },
            },
            ...years.map((y) => ({
              component: (
                <span
                  style={{
                    textDecoration: dropSel == y ? "underline" : "",
                  }}
                >
                  {t('cards:saved_on', {'%y%': y})}
                </span>
              ),
              onClick: () => {
                setDropSel(y);
              },
            })),
          ]}
        >
          {t('cards:activity_interval')}
        </DropdownMenu>
      </Styled.Center>
      <ResponsiveContainer height={height} width={width}>
        <AreaChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            stroke={getStroke()}
          />
          <YAxis dataKey="Total" stroke={getStroke()} />
          <Legend
            stroke={getStroke()}
            verticalAlign="top"
            wrapperStyle={{ marginTop: -25 }}
          />
          <Tooltip
            content={({ payload, label }) => (
              <CustomTooltip payload={payload} label={label} />
            )}
          />
          <Area
            type="monotone"
            dataKey="Total"
            name="Total Saved Tracks"
            stroke={colors[0]}
            fill={colors[0]}
            animationDuration={animationDuration}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  ) : (
    <></>
  );
}

export default TrackFavDistribution;
