import { isMobile } from "react-device-detect";
import create from "zustand";

interface IUseSessionStore {
  enableAnimations: boolean;
  isLoading: number;
  setAsLoading: () => void;
  unsetAsLoading: () => void;
}

/**
 * Store that contains some of the most important Session Variables
 */
export const useSessionStore = create<IUseSessionStore>((set, get) => {
  const enableAnimations = !isMobile;
  const isLoading = 0;

  const setAsLoading = () =>
    set((s) => ({
      isLoading: s.isLoading + 1,
    }));

  const unsetAsLoading = () =>
    set((s) => {
      isLoading: s.isLoading - 1;
    });

  return { enableAnimations, isLoading, setAsLoading, unsetAsLoading };
});
