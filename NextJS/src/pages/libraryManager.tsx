import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import Head from "components/util/Head";
import { ActivePage } from "enums/ActivePage";
import React, { useEffect } from "react";
import { useSessionStore } from "store/useSession";
import LibraryManager_ from "components/pages/LibraryManager";
export default function LibraryManager() {
  const setActivePage = useSessionStore().setActivePage;

  useEffect(() => {
    setActivePage(ActivePage.LIBRARY_MGR);
  }, [setActivePage]);

  return (
    <>
      <Head subtitle={"Library Manager"} />
      <ProtectedRoute onlyCached onlyLogged>
        <LibraryManager_ />
      </ProtectedRoute>
    </>
  );
}
