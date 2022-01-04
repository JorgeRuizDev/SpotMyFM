import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import AlbumManager from "components/pages/AlbumManager";
import Head from "components/util/Head";

/**
 * Album Manager Page
 * @returns
 */
export default function AlbumManagerPage(): JSX.Element {
  return (
    <ProtectedRoute onlyLogged>
      <Head subtitle="Album Manager" />

      <AlbumManager />
    </ProtectedRoute>
  );
}
