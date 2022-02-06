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
  RadialBarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Styled from "./TrackFavDistribution.styles";
interface ITrackFavDistributionProps {
  tracks: Track[];
}

interface IData {
  name: string;
  Total: number;
}

function TrackFavDistribution({
  tracks,
}: ITrackFavDistributionProps): JSX.Element {
  const savedTracks = useMemo(() => tracks.filter((t) => t.savedAt), [tracks]);

  const [yearData, setYearData] = useState<IData[]>([]);
  const [monthData, setMonthData] = useState<IData[]>([]);
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

    setMonthData(
      Array.from(monthMap)
        .sort((a, b) => a[0] - b[0])
        .map(([m, c]) => ({
          name: months[m],
          Total: c,
        }))
    );
  }, [months, savedTracks]);

  useEffect(() => {
    __load();
  }, [__load]);

  return savedTracks.length > tracks.length * 0.2 ? (
    <>
      <StatStyles.OverScroll>
        <h3>Saved Tracks Per Month:</h3>
        <p>There are {savedTracks.length} saved tracks.</p>
        <AreaChart
          width={width}
          height={height}
          data={monthData}
          margin={margin}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            stroke={getStroke()}
          />
          <YAxis stroke={getStroke()}>
            <Label
              value={"Saved Tracks"}
              angle={-90}
              position="insideBottomLeft"
            />
          </YAxis>
          <Tooltip
            content={({ payload, label }) => (
              <CustomTooltip payload={payload} label={label} />
            )}
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke={colors[0]}
            fill={colors[0]}
            animationDuration={animationDuration}
          />
        </AreaChart>
      </StatStyles.OverScroll>

      <StatStyles.OverScroll>
        <h3>Saved Tracks Per Year:</h3>
        <p>There are {savedTracks.length} saved tracks.</p>
        <AreaChart
          width={width}
          height={height}
          data={yearData}
          margin={{ bottom: 40, top: 10, left: 10, right: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            stroke={getStroke()}
          />
          <YAxis stroke={getStroke()}>
            <Label
              value={"Saved Tracks"}
              angle={-90}
              position="insideBottomLeft"
            />
          </YAxis>
          <Tooltip
            content={({ payload, label }) => (
              <CustomTooltip payload={payload} label={label} />
            )}
          />
          <Area
            type="monotone"
            dataKey="Total"
            stroke={colors[4]}
            fill={colors[4]}
            animationDuration={animationDuration}
          />
        </AreaChart>
      </StatStyles.OverScroll>
    </>
  ) : (
    <></>
  );
}

export default TrackFavDistribution;
