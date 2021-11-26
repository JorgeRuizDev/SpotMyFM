
import type { AppProps } from "next/app";

import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "styles/GlobalStyle";

import "styles/custom.css"
import "styles/tailwind.css"
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { useLoginStore } from "store/useLogin";
import { useClientsStore } from "store/useClients";


function MyApp({ Component, pageProps }: AppProps) {
  const isLogged = useLoginStore().isLogged
  useClientsStore().getUser(isLogged)
  
  return (
    <>
      <div id="modal-core"></div>
        <ToastConfig />
        <ToggleThemeButtonFlip />
        <GlobalStyle />
        <Component {...pageProps} />
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
