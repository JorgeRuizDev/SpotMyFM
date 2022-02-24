import DropdownMenu from "components/core/input/atoms/DropdownMenu";
import { Album } from "data/cacheDB/dexieDB/models/Album";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useRechartsHelper } from "hooks/recharts/useRechartsHelper";
import Text from "styles/Text";
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
  years: number[];
}

interface IDecade {
  Decade: string;
  "Album Count": number;
  "Track Count": number | undefined;
}

function FavDecades({ tracks, albums, years }: IFavDecadesProps): JSX.Element {
  const { getStroke, colors, width, height, margin } = useRechartsHelper();

  const [decades, setDecades] = useState<IDecade[]>([]);

  const [tracksToShow, setTracksToShow] = useState(tracks);
  const [dropSelection, setDropSelection] = useState<number | string>("all");
  const __setDecades = useCallback(async (tracks: Track[]) => {
    const albumDecades = new Map<number, number>();
    const trackDecades = new Map<number, number>();
    const albums = tracks.flatMap((t) => t.album || []);
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
  }, []);

  useEffect(() => {
    __setDecades(tracksToShow);
  }, [__setDecades, tracksToShow]);

  return (
    <>
      <h3>📆 Your Favorite Decades:</h3>
      <p>Distribution of your favorite albums and songs in each decade .</p>
      <Styled.CenterInline>
        <DropdownMenu
          items={[
            {
              component: (
                <span
                  style={{
                    textDecoration:
                      tracks.length === tracksToShow.length ? "underline" : "",
                  }}
                >
                  All Tracks
                </span>
              ),
              onClick: () => {
                setDropSelection("all");
                setTracksToShow(tracks);
              },
            },
            ...years.map((y) => ({
              component: (
                <span
                  style={{
                    textDecoration: dropSelection === y ? "underline" : "",
                  }}
                >
                  Saved On {y}
                </span>
              ),
              onClick: () => {
                setDropSelection(y);
                setTracksToShow(
                  tracks.filter((t) => (t.savedAt?.getFullYear() || 0) === y)
                );
              },
            })),
          ]}
        >
          Saved Interval
        </DropdownMenu>
      </Styled.CenterInline>
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
    </>
  );
}

export default FavDecades;
