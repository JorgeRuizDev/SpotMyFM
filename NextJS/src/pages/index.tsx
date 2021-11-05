import ToggleThemeButtonFlip from "components/theme/ToggleThemeButtonFlip";
import Buttons from "styles/Buttons";
import { getOauth } from "util/spotify/oauthFrontend";
export default function Home() {
  return (
    <>
      <h1>Hola</h1>;
      <Buttons.PrimaryGreenButton
        onClick={() => {
          getOauth().promptCredentials();
        }}
      >
        Log In
      </Buttons.PrimaryGreenButton>
      <ToggleThemeButtonFlip />
    </>
  );
}
