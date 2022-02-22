import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useCallback, useState } from "react";
import Styled from "./GenrePie.styles";
interface IGenrePieProps {
  tracks: Track[];
}

interface IData {
  genre: string;
  count: number;
}

function GenrePie({ tracks }: IGenrePieProps): JSX.Element {
  const [data, setData] = useState([]);

  const getData = useCallback(() => {
    // k: genre, v: number of appearances
    const map = new Map<string, number>();
    let totalAppearances = 0;
    for (const t of tracks) {
      const genres = t.artists.flatMap((a) => a.spotifyGenres || []);
      for (const genre of genres) {
        const currentCount = map.get(genre) || 0;
        map.set(genre, currentCount + 1);
        totalAppearances += 1;
      }
    }
  }, [tracks]);

  return <></>;
}

export default GenrePie;
