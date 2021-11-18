import axios from "axios";
import SimpleTrackCard from "components/core/cards/simpleCards/SimpleTrackCard";
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { getArtistsBySpotifyId } from "data/cacheDB/dexieDB/logic/dbArtists";
import { Track } from "data/cacheDB/dexieDB/models/Track";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SpotifyClient } from "restClients/spotify/spotifyClient";
import SpotifyWebApi from "spotify-web-api-node";
import { useClientsStore } from "store/useClients";
import { useLoginStore } from "store/useLogin";
import Buttons from "styles/Buttons";
import { getOauth } from "util/spotify/oauthFrontend";

export default function Home(): JSX.Element {
  const { isLogged, spotifyApi } = useLoginStore();
  const {
    getArtists,
    numberCaching,
    trackStatus,
    getArtistsById,
    getTracks,
    getTracksByIds,
    getAlbums,
  } = useDataFacade();
  const { spotifyApi: dos } = useClientsStore();

  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (isLogged) {
      const token = spotifyApi.getAccessToken() || "";

      try {
        axios
          .post("/api/database/user/isAdmin", { spotifyAuthToken: token })
          .then((r) => console.log(r.data))
          .catch((e) => toast.error);
      } catch (e) {
        toast.error(e as any);
      }
    }
  }, [isLogged, spotifyApi]);

  const testFetch = async () => {
    const res = await spotifyApi.getMyTopTracks();
    const tracks = await getTracks(res.items);
    console.log("Tracks:");
    console.log(tracks);
    setTracks(tracks);
  };

  return (
    <>
      <Buttons.PrimaryGreenButton
        onClick={() => {
          getOauth().promptCredentials();
        }}
      >
        Log In
      </Buttons.PrimaryGreenButton>
      {numberCaching > 0 ? <p>{trackStatus}</p> : ""}
      <ToggleThemeButtonFlip />
      {isLogged && (
        <Buttons.PrimaryGreenButton onClick={testFetch}>
          Test Fetch
        </Buttons.PrimaryGreenButton>
      )}
      {tracks.map((t, i) => (
        <SimpleTrackCard track={t} key={i} />
      ))}
    </>
  );
}
