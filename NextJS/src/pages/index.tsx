import axios from "axios";
import GenericCardView from "components/core/cards/views/GenericCardView";
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
import HomeTopTracks from "components/pages/HomeTopTracks";

export default function Home(): JSX.Element {
  const { isLogged } = useLoginStore();

  return (
    <>
      {!isLogged ? (
        <Buttons.PrimaryGreenButton
          onClick={() => {
            getOauth().promptCredentials();
          }}
        >
          Log In
        </Buttons.PrimaryGreenButton>
      ) : (
        <HomeTopTracks />
      )}
    </>
  );
}
