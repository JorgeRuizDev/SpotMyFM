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
import BottomNavbar from "components/core/navigation/BottomNavbar";
import { useSessionStore } from "store/useSession";

function MyApp({ Component, pageProps }: AppProps) {
  const isLogged = useLoginStore().isLogged;
  useClientsStore().getUser(isLogged);

  return (
    <ReusableProvider>
      <div>
        <div id="modal-core"></div>

        <Navbar />
        <NotificationRenderer />
        <ToastConfig />
        <ToggleThemeButtonFlip isLogged={isLogged} />
        <GlobalStyle />
        <div style={{ minHeight: "100%", padding: "7px" }}>
          <Component {...pageProps} />
        </div>
        <BottomNavbar isLogged={isLogged} />
      </div>
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
