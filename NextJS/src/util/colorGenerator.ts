import { Theme } from "enums/Theme";

/**
 * https://stackoverflow.com/a/66494926/11810358
 * @param str: String to get color from
 * @param theme: Background theme, light or dark
 */
export function generateColorFromString(str: string, theme: Theme) {
  const stringUniqueHash = [...str].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 100%, ${
    theme == Theme.DARK ? 64 : 45
  }%)`;
}
