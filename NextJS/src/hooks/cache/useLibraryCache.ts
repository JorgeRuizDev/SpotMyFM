import { addDays } from "date-fns";
import { useCallback } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
type CacheStatusType =
  | "INITIALIZING"
  | "CACHED"
  | "OUTDATED"
  | "UNDEFINED"
  | "CACHING"
  | "INCONSISTENT";

export const cacheStatusType: Record<CacheStatusType, number> = {
  INITIALIZING: -1,
  UNDEFINED: 0,
  CACHED: 1, // The data is cached
  CACHING: 2,
  INCONSISTENT: 3,
  OUTDATED: 4,
};

interface ILibraryCacheStorePersistent {
  lastCache: Date | undefined;
  cacheStatus: number;
}

interface ILibraryCacheStore extends ILibraryCacheStorePersistent {
  setCaching(): void;
  setCached(): void;
  setNotCached(): void;
  setOutdated(): void;
  setInconsistent(): void;
  initialize(): void;
  _hasLoaded: boolean;
}

export const useLibraryCacheStore = create<ILibraryCacheStore>(
  persist(
    (set, get) => {
      const initialStatusData: ILibraryCacheStorePersistent = {
        lastCache: undefined,
        cacheStatus: cacheStatusType.INITIALIZING,
      };

      const _hasLoaded = false;

      const setCaching = () =>
        set(() => ({
          cacheStatus: cacheStatusType.CACHING,
        }));

      const setCached = () =>
        set(() => ({
          cacheStatus: cacheStatusType.CACHED,
          lastCache: new Date(),
        }));

      const setNotCached = () =>
        set(() => ({
          cacheStatus: cacheStatusType.UNDEFINED,
          lastCache: undefined,
        }));

      const setOutdated = () =>
        set(() => ({
          cacheStatus: cacheStatusType.OUTDATED,
        }));

      const setInconsistent = () =>
        set(() => ({
          cacheStatus: cacheStatusType.INCONSISTENT,
        }));

      const initialize = () => {
        if (get()._hasLoaded) {
          return;
        }

        // if the cache is older than expected:
        const lastCache = get().lastCache;
        if (lastCache !== undefined) {
          if (addDays(lastCache, 5).getTime() > new Date().getTime()) {
            setOutdated();
          }
        }
        // If on load the flag is caching -> the cache stopped in the middle of an operation
        if (get().cacheStatus === cacheStatusType.CACHING) {
          setInconsistent();
        }
        set(() => ({ _hasLoaded: true }));
      };

      return {
        ...initialStatusData,
        setCached,
        setCaching,
        setInconsistent,
        setOutdated,
        setNotCached,
        initialize,
        _hasLoaded,
      };
    },

    {
      name: "cache_status",
      whitelist: ["cacheStatus", "lastCache"],
    }
  )
);

function useLibraryCache() {
  const cacheTrackLibrary = useCallback(() => {}, []);

  const dropCache = useCallback(() => {}, []);

  const deepRefreshTrackCache = useCallback(() => {}, []);

}
