import React, { useEffect, useState } from "react";

import { useLoginStore } from "store/useLogin";

import {
  useLibraryCache,
  useLibraryCacheStore,
} from "hooks/cache/useLibraryCache";
import { useSessionStore } from "store/useSession";
import { ActivePage } from "enums/ActivePage";
import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("components/pages/HomeTopTracks"));
const DynamicLanding = dynamic(
  () => import("components/pages/LandingPage/LandingPage")
);

export default function Home(): JSX.Element {
  useLibraryCache();
  const { isLogged } = useLoginStore();
  const init = useLibraryCacheStore((s) => s.initialize);

  useEffect(init, [init]);

  const setActivePage = useSessionStore((s) => s.setActivePage);
  useEffect(() => {
    setActivePage(ActivePage.HOME);
  }, [setActivePage]);

  if (isLogged == undefined) {
    return <></>;
  }

  return <>{!isLogged ? <DynamicLanding /> : <DynamicHome />}</>;
}
