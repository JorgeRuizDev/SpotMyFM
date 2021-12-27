import { addDays } from "date-fns";
import { useNotificationSystem } from "hooks/notification/useNotificationSystem";
import { useCallback, useEffect } from "react";
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
        if (get().cacheStatus === cacheStatusType.INITIALIZING){
          setNotCached()
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

type CacheNotification = "OUTDATED" | "NOCACHED" | "INCONSISTENT" | "CACHING";

const cacheNotification: Record<CacheNotification, string> = {
  INCONSISTENT: "INCONSISTENT",
  OUTDATED: "OUTDATED",
  CACHING: "CACHING",
  NOCACHED: "NOCACHED",
};

export function useLibraryCache() {
  const { pushNotification, hideNotification } = useNotificationSystem();

  const { cacheStatus } = useLibraryCacheStore();

  const cacheTrackLibrary = useCallback(() => {
    
  }, []);

  const dropCache = useCallback(() => {}, []);

  const deepRefreshTrackCache = useCallback(() => {}, []);

  // On Load: pop a notification
  useEffect(() => {
    switch (cacheStatus) {
      case cacheStatusType.OUTDATED:
        pushNotification(cacheNotification.OUTDATED, "warning", <h1>Outdated</h1>);
        break;
      case cacheStatusType.INCONSISTENT:
        pushNotification(cacheNotification.INCONSISTENT, "error", <h1>Inconsistent</h1>)
        break
      case cacheStatusType.UNDEFINED:
        pushNotification(cacheNotification.NOCACHED, "info", <h1>Cash Me Outside</h1>)
        break;
      
    }
  }, [cacheStatus, pushNotification]);
}
