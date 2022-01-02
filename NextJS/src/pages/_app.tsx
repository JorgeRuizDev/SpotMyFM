import type { AppProps } from "next/app";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "styles/GlobalStyle";

import "styles/custom.css";
import "styles/tailwind.css";
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { useLoginStore } from "store/useLogin";
import { useClientsStore } from "store/useClients";
import Navbar from "components/core/navigation/Navbar";

import NotificationRenderer from "components/core/notification/NotificationRenderer";
import { ReusableProvider } from "reusable";

function MyApp({ Component, pageProps }: AppProps) {
  const isLogged = useLoginStore().isLogged;
  useClientsStore().getUser(isLogged);

  return (
    <ReusableProvider>
      <main>
        <div id="modal-core"></div>

        <Navbar />
        <NotificationRenderer />
        <ToastConfig />
        <ToggleThemeButtonFlip />
        <GlobalStyle />
        <div style={{ minHeight: "100%", padding: "7px" }}>
          <Component {...pageProps} />
        </div>
      </main>
    </ReusableProvider>
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
