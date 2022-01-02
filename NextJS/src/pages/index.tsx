import React, { useEffect, useState } from "react";

import { useLoginStore } from "store/useLogin";
import Buttons from "styles/Buttons";
import { getOauth } from "util/spotify/oauthFrontend";
import HomeTopTracks from "components/pages/HomeTopTracks";
import {
  useLibraryCache,
  useLibraryCacheStore,
} from "hooks/cache/useLibraryCache";
import { useSessionStore } from "store/useSession";
import { ActivePage } from "enums/ActivePage";

export default function Home(): JSX.Element {
  useLibraryCache();
  const { isLogged } = useLoginStore();
  const init = useLibraryCacheStore((s) => s.initialize);

  useEffect(init, [init]);

  const setActivePage = useSessionStore((s) => s.setActivePage);
  useEffect(() => {
    setActivePage(ActivePage.HOME);
  }, [setActivePage]);

  return (
    <>
      {!isLogged ? (
        isLogged === undefined ? (
          <></>
        ) : (
          <Buttons.PrimaryGreenButton
            onClick={() => {
              getOauth().promptCredentials();
            }}
          >
            Log In
          </Buttons.PrimaryGreenButton>
        )
      ) : (
        <HomeTopTracks />
      )}
    </>
  );
}
