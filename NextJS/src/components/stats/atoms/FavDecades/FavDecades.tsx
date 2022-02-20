import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Styled from "./FavDecades.styles";
interface IFavDecadesProps {
  tracks: Track[];
  albums: Album[];
}

interface IDecade {
  Decade: string;
  "Album Count": number;
  "Track Count": number | undefined;
}

function FavDecades({ tracks, albums }: IFavDecadesProps): JSX.Element {
  const { getStroke, colors, width, height, margin } = useRechartsHelper();

  const [decades, setDecades] = useState<IDecade[]>([]);

  const __setDecades = useCallback(async () => {
    const albumDecades = new Map<number, number>();
    const trackDecades = new Map<number, number>();

    // Fill albumDecades
    for (const a of albums || []) {
      const year =
        Math.floor((a.spotifyReleaseDate?.getFullYear() || 0) / 10) * 10;
      const times = albumDecades.get(year) || 0;
      albumDecades.set(year, times + 1);
    }

    // Fill trackDecades:
    for (const t of tracks || []) {
      const year =
        Math.floor((t.album?.spotifyReleaseDate?.getFullYear() || 0) / 10) * 10;

      if (year != 0) {
        // If the year is valid: Increment the decade in the dictionary:
        const times = trackDecades.get(year) || 0;
        trackDecades.set(year, times + 1);
      }
    }

    // Create the "data" object
    const data = Array.from(albumDecades)
      .sort((x, y) => x[0] - y[0])
      .map((x) => {
        return {
          Decade: x[0].toString(),
          "Album Count": x[1],
          "Track Count": trackDecades.get(x[0]),
        };
      });

    setDecades(data);
  }, [albums, tracks]);

  useEffect(() => {
    __setDecades();
  }, [__setDecades]);

  return (
    <>
      <h3>📆 Your Favorite Decades:</h3>
      <p>
        View the distribution of your favorite albums and songs in each decade.
      </p>

      <ResponsiveContainer width={width} height={height}>
        <BarChart data={decades} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Decade" stroke={getStroke()} />
          <YAxis stroke={getStroke()} />
          <Tooltip />
          <Legend
            stroke={getStroke()}
            verticalAlign="top"
            wrapperStyle={{ marginTop: -25 }}
          />
          <Bar dataKey="Album Count" fill={colors[0]} />
          <Bar dataKey="Track Count" fill={colors[1]} />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width={width} height={height}>
        <BarChart data={decades} margin={{ top: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Decade" stroke={getStroke()} />
          <YAxis stroke={getStroke()} />
          <Tooltip />
          <Legend
            stroke={getStroke()}
            verticalAlign="top"
            wrapperStyle={{ marginTop: -25 }}
          />
          <Bar dataKey="Album Count" fill={colors[0]} />
          <Bar dataKey="Track Count" fill={colors[1]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default FavDecades;
