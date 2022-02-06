import { Theme } from "enums/Theme";
import { useCallback, useMemo } from "react";
import { Legend } from "recharts";
import { useThemeStore } from "store/useTheme";

const colors = [
  "#10B981",
  "#75CA79",
  "#B2DA79",
  "#EAE784",
  "#3DA2FF",
  "#FF7450",
];

const width = 750;
const height = 250;

export function useRechartsHelper() {
  const { currentTheme } = useThemeStore();

  const getStroke = useCallback(
    () => (currentTheme === Theme.DARK ? "white" : ""),
    [currentTheme]
  );

  return { getStroke, colors, width, height };
}
