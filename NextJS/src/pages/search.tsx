import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import SearchPage from "components/pages/SearchPage";
import SettingsMenu from "components/pages/SettingsMenu";
import Head from "components/util/Head";
import { ActivePage } from "enums/ActivePage";
import { useEffect } from "react";
import { useSessionStore } from "store/useSession";

export default function Search() {
  const setActivePage = useSessionStore().setActivePage;
  useEffect(() => setActivePage(ActivePage.SEARCH), [setActivePage]);
  return (
    <ProtectedRoute onlyLogged>
      <Head subtitle="Search" />
      <SearchPage />
    </ProtectedRoute>
  );
}
