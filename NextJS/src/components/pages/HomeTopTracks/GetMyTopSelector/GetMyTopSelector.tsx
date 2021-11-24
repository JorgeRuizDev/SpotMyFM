import { Artist } from "data/cacheDB/dexieDB/models/Artist";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";

import Styled from "./GetMyTopSelector.styles";

interface IGetMyTopSelectorProps {
  setTracks: (tracksIds: Track[] | undefined) => void;
  setArtists: (artistIds: Artist[] | undefined) => void;
  setHeaderType: (type: string) => void;
  setIsLoading: (is: boolean) => void;
}

type HomeItemType = "Tracks" | "Artists";

export const homeItemType: Record<HomeItemType, string> = {
  Tracks: "Tracks",
  Artists: "Artists",
};

enum Term {
  Last = "last",
  Short = "short_term",
  Medium = "medium_term",
  Long = "long_term",
}

function GetMyTopSelector({
  setTracks,
  setArtists,
  setHeaderType,
  setIsLoading,
}: IGetMyTopSelectorProps): JSX.Element {
  const [term, setTerm] = useState<string>(Term.Short);
  const [type, setType] = useState<string>(homeItemType.Tracks);

  const api = useClientsStore((s) => s.spotifyApi);
  const { getTracks, getTracksByIds, getArtists } = useDataFacade();

  const limit = 50;

  const getAllTracks = useCallback(async () => {
    try {
      setIsLoading(true);
      if (type === homeItemType.Tracks) {
        // Set the IDs to empty so the card skeleton shows up.
        setTracks([]);

        // Get Tracks:
        if (term === Term.Last) {
          const res = await api.getMyRecentlyPlayedTracks({ limit });
          const last_tracks = await getTracksByIds(
            res.items.map((t) => t.track.id)
          );
          setTracks(last_tracks);
        } else {
          const res = await api.getMyTopTracks({
            time_range: term,
            limit,
          });
          const tracks = await getTracks(res.items);

          setTracks(tracks);
        }

        //setArtistIds(undefined);
        setHeaderType(homeItemType.Tracks);
      } else {
        // If the term is not available:
        if (term === Term.Last) {
          setTerm(Term.Short);
          return;
        }
        // Set the IDs to empty so the card skeleton shows up.
        setArtists([]);
        // Get Artists:
        const res = await api.getMyTopArtists({
          time_range: term,
          limit,
        });
        const artists = await getArtists(res.items);
        setTracks(undefined);
        setArtists(artists);
        setHeaderType(homeItemType.Artists);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      const code = api.parse(e);
      toast.error(
        `[GetMyTopSelector] Could not fetch your selection: ${code?.status} | ${code?.message}`
      );
    }
  }, [
    setIsLoading,
    type,
    setTracks,
    term,
    setHeaderType,
    api,
    getTracksByIds,
    getTracks,
    setArtists,
    getArtists,
  ]);

  useEffect(() => {
    getAllTracks();
  }, [getAllTracks]);

  const handleType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setType(event.target.value);
    },
    []
  );

  const handleTerm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTerm(event.target.value);
    },
    []
  );

  return (
    <>
      <Styled.CenterGrid>
        <Styled.TwoColumns>
          <TypeSelector type={type} handleType={handleType} />

          <TermSelector type={type} term={term} handleTerm={handleTerm} />
        </Styled.TwoColumns>
      </Styled.CenterGrid>
    </>
  );
}

interface ITypeSelector {
  type: string;
  handleType: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TypeSelector({ type, handleType }: ITypeSelector) {
  return (
    <Styled.Column>
      <Styled.JustifyStart>
        <Styled.Inline>
          <input
            type="radio"
            checked={type == homeItemType.Tracks}
            name="type"
            value={homeItemType.Tracks}
            onChange={handleType}
          />
          <p>My Top Tracks</p>
        </Styled.Inline>

        <Styled.Inline>
          <input
            type="radio"
            checked={type == homeItemType.Artists}
            name="type"
            value={homeItemType.Artists}
            onChange={handleType}
          />
          <p>My Top Artists</p>
        </Styled.Inline>
      </Styled.JustifyStart>
    </Styled.Column>
  );
}

interface ITermSelector {
  term: string;
  type: string;
  handleTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TermSelector({ term, type, handleTerm }: ITermSelector) {
  return (
    <Styled.Column>
      <Styled.JustifyStart>
        <Styled.Inline>
          <input
            type="radio"
            checked={term == Term.Last}
            name="term"
            value={Term.Last}
            disabled={type !== homeItemType.Tracks}
            onChange={handleTerm}
          />
          <p>Last Played</p>
        </Styled.Inline>
        <Styled.Inline>
          <input
            type="radio"
            checked={term == Term.Short}
            name="term"
            value={Term.Short}
            onChange={handleTerm}
          />
          <p>Short Term (4 weeks)</p>
        </Styled.Inline>

        <Styled.Inline>
          <input
            type="radio"
            checked={term == Term.Medium}
            name="term"
            value={Term.Medium}
            onChange={handleTerm}
          />
          <p>Medium Term (6 months)</p>
        </Styled.Inline>

        <Styled.Inline>
          <input
            type="radio"
            checked={term == Term.Long}
            name="term"
            value={Term.Long}
            onChange={handleTerm}
          />
          <p>Long Term (Since the beginning)</p>
        </Styled.Inline>
      </Styled.JustifyStart>
    </Styled.Column>
  );
}

export default React.memo(GetMyTopSelector);
