

import ProtectedRoute from "components/core/wrappers/ProtectedRoute";
import Head from "components/util/Head";
import React from "react";

export default function LibraryManager() {
  return (
    <>
      <Head subtitle={"Library Manager"} />
      <ProtectedRoute onlyCached onlyLogged>
        
      </ProtectedRoute>
    </>
  );
}
