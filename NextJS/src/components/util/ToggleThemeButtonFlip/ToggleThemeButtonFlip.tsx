import { Theme } from "enums/Theme";
import Styled from "./ToggleThemeButtonFlip.styles";
import { useThemeStore } from "store/useTheme";
const ToggleThemeButtonFlip = () => {
  const { currentTheme, toggleTheme } = useThemeStore();

  return (
    <Styled.ButtonPos isLogged={false}>
      <Styled.Flip>
        <Styled.InnerFlip
          flipped={currentTheme === Theme.DARK}
          onClick={toggleTheme}
        >
          <Styled.Front>
            <Styled.Moon />
          </Styled.Front>
          <Styled.Back>
            <Styled.Sun />
          </Styled.Back>
        </Styled.InnerFlip>
      </Styled.Flip>
    </Styled.ButtonPos>
  );
};

export default ToggleThemeButtonFlip;
