
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "styles/GlobalStyle";

import "styles/custom.css"
import "styles/tailwind.css"
import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";


function MyApp({ Component, pageProps }: AppProps) {
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
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default MyApp;
