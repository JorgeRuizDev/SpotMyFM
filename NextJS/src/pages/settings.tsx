import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import SettingsMenu from "components/pages/SettingsMenu";
import Head from "components/util/Head";
import { ActivePage } from "enums/ActivePage";
import { useEffect } from "react";
import { useSessionStore } from "store/useSession";

export default function Settings() {
  const setActivePage = useSessionStore().setActivePage;
  useEffect(() => setActivePage(ActivePage.SETTINGS), [setActivePage]);
  return (
    <ProtectedRoute onlyLogged>
      <Head subtitle="Settings" />
      <SettingsMenu />
    </ProtectedRoute>
  );
}
