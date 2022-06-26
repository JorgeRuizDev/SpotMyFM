import { useSessionStore } from "../store/useSession";
import { useEffect } from "react";
import { ActivePage } from "../enums/ActivePage";
import ProtectedRoute from "../components/core/wrappers/ProtectedRoute";
import Head from "../components/util/Head";
import SearchPage from "../components/pages/SearchPage";
import Upload from "../components/pages/Upload";

export default function UploadPage() {
  const setActivePage = useSessionStore().setActivePage;
  useEffect(() => setActivePage(ActivePage.UPLOAD), [setActivePage]);
  return (
    <ProtectedRoute onlyLogged>
      <Head subtitle="Upload" />
      <Upload />
    </ProtectedRoute>
  );
}
