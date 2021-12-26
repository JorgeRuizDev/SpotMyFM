import type { AppProps } from "next/app";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "styles/GlobalStyle";

import "styles/custom.css";
import "styles/tailwind.css";
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { useLoginStore } from "store/useLogin";
import { useClientsStore } from "store/useClients";
import { useLibraryCacheStore } from "hooks/cache/useLibraryCache";
import Navbar from "components/core/navigation/Navbar";
import React from "react";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  const isLogged = useLoginStore().isLogged;
  useClientsStore().getUser(isLogged);
  useLibraryCacheStore().initialize();
  return (
    <>
      <div id="modal-core"></div>

      <Navbar />

      <ToastConfig />
      <ToggleThemeButtonFlip />
      <GlobalStyle />
      <div tw={"p-2 min-h-screen"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

function ToastConfig() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      transition={Flip}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default MyApp;
