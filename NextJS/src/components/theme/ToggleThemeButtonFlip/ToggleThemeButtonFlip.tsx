import { Theme } from "enums/Theme";
import Styled from "./ToggleThemeButtonFlip.styles";
import { useThemeStore } from "store/useTheme";
import { useEffect, useState } from "react";

function ToggleThemeButtonFlip({
  isLogged,
}: {
  isLogged?: boolean;
}): JSX.Element {
  const { currentTheme, toggleTheme } = useThemeStore();

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  // Cool Initial Effect 
  useEffect(() => {
    setIsDarkTheme(currentTheme === Theme.DARK)
  }, [currentTheme])

  return (
    <Styled.ButtonPos isLogged={isLogged}>
      <Styled.Flip>
        <Styled.InnerFlip
          aria-label="Theme Button"
          flipped={isDarkTheme}
          onClick={toggleTheme}
        >
          <Styled.Back>
            <Styled.Sun />
          </Styled.Back>
          <Styled.Front>
            <Styled.Moon />
          </Styled.Front>
        </Styled.InnerFlip>
      </Styled.Flip>
    </Styled.ButtonPos>
  );
}

export default ToggleThemeButtonFlip;
