import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import Head from "components/util/Head";
import { ActivePage } from "enums/ActivePage";
import React from "react";
import { useSessionStore } from "store/useSession";

export default function LibraryManager() {
  //useSessionStore().setActivePage(ActivePage.LIBRARY_MGR);
  return (
    <>
      <Head subtitle={"Library Manager"} />
      <ProtectedRoute onlyCached onlyLogged></ProtectedRoute>
    </>
  );
}
