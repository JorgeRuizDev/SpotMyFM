import Link from "components/util/Link";
import { FaCog, FaGithub, FaQuestionCircle } from "react-icons/fa";
import Styled from "./NavDropItems.styles";
import Buttons from "styles/Buttons";
import ThemeStyles from "components/theme/ToggleThemeButtonFlip/ToggleThemeButtonFlip.styles";
import { useThemeStore } from "store/useTheme";
import { Theme } from "enums/Theme";
import { useClientsStore } from "store/useClients";
import SpotifyPlayer from "components/core/display/organisms/SpotifyPlayer";
import { useMemo } from "react";
import { useLoginStore } from "store/useLogin";
import LocaleSelector from "components/util/LocaleSelector";
import { AiFillApi } from "react-icons/ai";
import useTranslation from "next-translate/useTranslation";
interface INavDropItemsProps {
  closeMe?: () => void;
}

function NavDropItems({ closeMe = () => {} }: INavDropItemsProps): JSX.Element {
  const { currentTheme, toggleTheme } = useThemeStore();
  const { user } = useClientsStore();
  const { logOut } = useLoginStore();
  const avatar = useMemo(
    () => user.spotifyUser?.images?.[0].url,
    [user.spotifyUser?.images]
  );
  const { t } = useTranslation();

  return (
    <Styled.Col>
      <Styled.SpaceRow>
        <Styled.LinkWrap>
          <Link href="https://github.com/JorgeRuizDev/SpotMyFM">
            <Styled.IconWrap>
              <FaGithub style={{ height: "40px", width: "40px" }} />
            </Styled.IconWrap>
          </Link>
        </Styled.LinkWrap>
        <Styled.LinkWrap>
          <Link href="https://github.com/JorgeRuizDev/SpotMyFM">
            <FaQuestionCircle style={{ height: "40px", width: "40px" }} />
            <Styled.IconWrap></Styled.IconWrap>
          </Link>
        </Styled.LinkWrap>
      </Styled.SpaceRow>
      <Styled.Center>
        <LocaleSelector />
      </Styled.Center>
      <Styled.Center>
        <Styled.PlayerWrap>
          <SpotifyPlayer />
        </Styled.PlayerWrap>
      </Styled.Center>
      <hr />
      <Styled.Center>
        <h4>{user.spotifyUser?.display_name || "Stranger"}</h4>
        {avatar && <Styled.Avatar src={avatar} alt="User Avatar" />}
      </Styled.Center>

      <Link href="/settings" style={{ height: "auto" }}>
        <Styled.RowItem onClick={closeMe}>
          <FaCog /> <span>{t("settings:settings")}</span>
        </Styled.RowItem>
      </Link>

      <Styled.RowItem onClick={toggleTheme}>
        {currentTheme === Theme.DARK ? (
          <>
            <ThemeStyles.Sun /> <span>{t("cards:set_light_theme")}</span>
          </>
        ) : (
          <>
            <ThemeStyles.Moon /> <span>{t("cards:set_dark_theme")}</span>
          </>
        )}
      </Styled.RowItem>
      <Link style={{ height: "auto" }} href="/openapi-ui">
        <Styled.RowItem>
          <AiFillApi />
          <span>{t("cards:openapi_specification")}</span>
        </Styled.RowItem>
      </Link>
      <Styled.Center>
        <Buttons.PrimaryBlueButton style={{ width: "70%" }} onClick={logOut}>
          {t("cards:log_out")}
        </Buttons.PrimaryBlueButton>
      </Styled.Center>
    </Styled.Col>
  );
}

export default NavDropItems;
