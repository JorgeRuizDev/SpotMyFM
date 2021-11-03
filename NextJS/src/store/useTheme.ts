import create from "zustand";
import { Theme } from "enums/Theme";
import persist from "zustand/middleware";
/**
 * Updates the current tailwind theme by appending it to the html body.
 * @param theme New theme enum to replace with.
 */
function setTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}

interface IThemeStore {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const useThemeStore = create<IThemeStore>((set, get) => {
  const currentTheme = Theme.DARK;

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
