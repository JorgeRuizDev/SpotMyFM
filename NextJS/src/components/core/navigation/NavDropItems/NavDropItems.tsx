import Link from "components/util/Link";
import { FaCog, FaGithub, FaQuestionCircle } from "react-icons/fa";
import Styled from "./NavDropItems.styles";
import Buttons from "styles/Buttons";
import ThemeStyles from "components/theme/ToggleThemeButtonFlip/ToggleThemeButtonFlip.styles";
import { useThemeStore } from "store/useTheme";
import { Theme } from "enums/Theme";
interface INavDropItemsProps {}

function NavDropItems(props: INavDropItemsProps): JSX.Element {
  const { currentTheme, toggleTheme } = useThemeStore();

  return (
    <Styled.Col>
      <Styled.SpaceRow>
        <Link href="https://github.com/JorgeRuizDev/SpotMyFM">
          <Styled.IconWrap>
            <FaGithub />
          </Styled.IconWrap>
        </Link>

        <Link href="https://github.com/JorgeRuizDev/SpotMyFM">
          <Styled.IconWrap>
            <FaQuestionCircle />
          </Styled.IconWrap>
        </Link>
      </Styled.SpaceRow>

      <Buttons.PrimaryBlueButton style={{ width: "90%" }}>
        Log Out
      </Buttons.PrimaryBlueButton>

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
    </Styled.Col>
  );
}

export default NavDropItems;
