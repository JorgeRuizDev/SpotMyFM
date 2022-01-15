import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import AlbumManager from "components/pages/AlbumManager";
import Head from "components/util/Head";
import { ActivePage } from "enums/ActivePage";
import { useEffect } from "react";
import { useSessionStore } from "store/useSession";

/**
 * Album Manager Page
 * @returns
 */
export default function AlbumManagerPage(): JSX.Element {
  const { setActivePage } = useSessionStore();

  useEffect(() => {
    setActivePage(ActivePage.ALBUM_MGR);
  }, [setActivePage]);

  return (
    <ProtectedRoute onlyLogged>
      <Head subtitle="Album Manager" />

      <AlbumManager />
    </ProtectedRoute>
  );
}
