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
interface INavDropItemsProps {}

function NavDropItems(props: INavDropItemsProps): JSX.Element {
  const { currentTheme, toggleTheme } = useThemeStore();
  const { user } = useClientsStore();
  const { logOut } = useLoginStore();
  const avatar = useMemo(
    () => user.spotifyUser?.images?.[0].url,
    [user.spotifyUser?.images]
  );

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

      <Styled.PlayerWrap>
        <SpotifyPlayer />
      </Styled.PlayerWrap>
      <hr />
      <Styled.Center>
        <h4>{user.spotifyUser?.display_name || "Stranger"}</h4>
        {avatar && <Styled.Avatar src={avatar} alt="User Avatar" />}
      </Styled.Center>

      <Styled.RowItem>
        <FaCog /> <span>Settings</span>
      </Styled.RowItem>
      <Styled.RowItem onClick={toggleTheme}>
        {currentTheme === Theme.DARK ? (
          <>
            <ThemeStyles.Sun /> <span>Set Light Theme</span>
          </>
        ) : (
          <>
            <ThemeStyles.Moon /> <span>Set Dark Theme</span>
          </>
        )}
      </Styled.RowItem>
      <Styled.RowItem>
        <FaCog /> <span>Change Language</span>
      </Styled.RowItem>
      <Styled.Center>
        <Buttons.PrimaryBlueButton style={{ width: "70%" }} onClick={logOut}>
          Log Out
        </Buttons.PrimaryBlueButton>
      </Styled.Center>
    </Styled.Col>
  );
}

export default NavDropItems;
