import create from "zustand";
import { Theme } from "enums/Theme";
import { persist } from "zustand/middleware";

/**
 * Updates the current tailwind theme by appending it to the html body.
 * @param theme New theme enum to replace with.
 * @returns Current / new theme
 */
function setTheme(theme: Theme): Theme {
  const root = window.document.documentElement;
  root.classList.remove(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
  return theme;
}

/**
 * Loads the current saved theme
 * @returns {any}
 */
function loadSavedTheme(): Theme {
  let theme = Theme.DARK;
  if (typeof window === "undefined") {
    return Theme.DARK;
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === null || savedTheme == Theme.DARK) {
    return setTheme(Theme.DARK);
  } else {
    return setTheme(Theme.LIGHT);
  }
}

interface IThemeStore {
  currentTheme: Theme;
  toggleTheme: () => void;
}

/**
 * Store that manages the current theme
 * @returns {IThemeStore} A state consumer that returns the current theme and the theme toggler
 */
const useThemeStore = create<IThemeStore>((set, get) => {
  const currentTheme = loadSavedTheme();

  const toggleTheme = () => {
    const { currentTheme } = get();
    if (currentTheme === Theme.DARK) {
      setTheme(Theme.LIGHT);
      set(() => ({
        currentTheme: Theme.LIGHT,
      }));
    } else {
      setTheme(Theme.DARK);
      set(() => ({
        currentTheme: Theme.DARK,
      }));
    }
  };

  return { currentTheme, toggleTheme };
});

export { useThemeStore };
