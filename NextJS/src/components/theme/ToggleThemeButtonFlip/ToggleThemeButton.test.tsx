import ToggleThemeButtonFlip from "./ToggleThemeButtonFlip";

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useThemeStore } from "store/useTheme";
import { Theme } from "enums/Theme";

describe("<ToggleThemeButtonFlip />", () => {
  test("Renders a button and checks that it toggles the current theme", () => {
    const component = render(<ToggleThemeButtonFlip />);

    const { result: themeResult } = renderHook(() => useThemeStore());

    act(() => {
      expect(themeResult.current.currentTheme).toBe(Theme.DARK);
    });

    const btn = component.getByLabelText("Theme Button");
    act(() => {
      fireEvent.click(btn);
    });

    act(() => {
      expect(themeResult.current.currentTheme).toBe(Theme.LIGHT);
    });
  });
});
