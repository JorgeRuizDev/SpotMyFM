import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import PlaylistManager_ from "components/pages/PlaylistManager";
import Head from "components/util/Head";
import { ActivePage } from "enums/ActivePage";
import { useEffect } from "react";
import { useSessionStore } from "store/useSession";

export default function PlaylistManager() {
  const setActivePage = useSessionStore().setActivePage;
  useEffect(() => setActivePage(ActivePage.PLAYLIST_MGR), [setActivePage]);

  return (
    <>
      <ProtectedRoute onlyLogged>
        <Head subtitle="Playlist Manager" />
        <PlaylistManager_ />
      </ProtectedRoute>
    </>
  );
}
