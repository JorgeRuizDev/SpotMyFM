import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import { useState } from "react";
import { useLoginStore } from "store/useLogin";
import Buttons from "styles/Buttons";
import { getOauth } from "util/spotify/oauthFrontend";

export default function Home() {
  const isLogged = useLoginStore((set) => set.isLogged);

  return (
    <>
      <Buttons.PrimaryGreenButton
        onClick={() => {
          getOauth().promptCredentials();
        }}
      >
        Log In
      </Buttons.PrimaryGreenButton>
      <ToggleThemeButtonFlip />
      {isLogged && <h1>Logueado</h1>}
    </>
  );
}
