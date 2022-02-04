import ProgressBar from "components/core/display/atoms/ProgressBar";
import AskForLibraryCache from "components/core/notification/notificationContents/AskForLibraryCache";
import CacheOutdatedMessage from "components/core/notification/notificationContents/CacheOutdatedMessage";
import CachingInProgress from "components/core/notification/notificationContents/CachingInProgress";
import InconsistentCacheMessage from "components/core/notification/notificationContents/InconsistentCacheMessage";
import { CacheDb } from "data/cacheDB/CacheDB";
import { addDays } from "date-fns";
import { useDataFacade } from "hooks/dataFacade/useDataFacade";
import { useNotificationSystem } from "hooks/notification/useNotificationSystem";
import { useCallback, useEffect } from "react";
import { useClientsStore } from "store/useClients";
import { useLoginStore } from "store/useLogin";
import create from "zustand";
import { persist } from "zustand/middleware";
type CacheStatusType =
  | "INITIALIZING"
  | "CACHED"
  | "OUTDATED"
  | "UNDEFINED"
  | "NOTCACHEDONTASK"
  | "CACHING"
  | "INCONSISTENT";

export const cacheStatusType: Record<CacheStatusType, number> = {
  INITIALIZING: -1,
  UNDEFINED: 0,
  CACHED: 1, // The data is cached
  CACHING: 2,
  INCONSISTENT: 3,
  OUTDATED: 4,
  NOTCACHEDONTASK: 5,
};

interface ILibraryCacheStorePersistent {
  _lastCache: Date | undefined;
  cacheStatus: number;
}

interface ILibraryCacheStore extends ILibraryCacheStorePersistent {
  setCaching(): void;
  getLastCacheDate(): Date;
  setCached(): void;
  setNotCached(): void;
  setOutdated(): void;
  setNotCachedDontAsk(): void;
  setInconsistent(): void;
  initialize(): void;
  _hasLoaded: boolean;
}

/**
 * Cache Status State.
 * Controls the current state of the library
 */
export const useLibraryCacheStore = create<ILibraryCacheStore>(
  persist(
    (set, get) => {
      const initialStatusData: ILibraryCacheStorePersistent = {
        _lastCache: undefined,
        cacheStatus: cacheStatusType.INITIALIZING,
      };

      const _hasLoaded = false;

      const getLastCacheDate = () => new Date(get()._lastCache || new Date());

      const setCaching = () =>
        set(() => ({
          cacheStatus: cacheStatusType.CACHING,
        }));

      const setCached = () =>
        set(() => ({
          cacheStatus: cacheStatusType.CACHED,
          _lastCache: new Date(),
        }));

      const setNotCached = () =>
        set(() => ({
          cacheStatus: cacheStatusType.UNDEFINED,
          _lastCache: undefined,
        }));

      const setOutdated = () =>
        set(() => ({
          cacheStatus: cacheStatusType.OUTDATED,
        }));

      const setInconsistent = () =>
        set(() => ({
          cacheStatus: cacheStatusType.INCONSISTENT,
        }));

      const setNotCachedDontAsk = () =>
        set(() => ({ cacheStatus: cacheStatusType.NOTCACHEDONTASK }));

      const initialize = () => {
        if (get()._hasLoaded) {
          return;
        }

        // if the cache is older than expected:
        const lastCache = getLastCacheDate();
        if (lastCache !== undefined) {
          if (addDays(lastCache, 5).getTime() < new Date().getTime()) {
            setOutdated();
          }
        }
        // If on load the flag is caching -> the cache stopped in the middle of an operation
        if (get().cacheStatus === cacheStatusType.CACHING) {
          setInconsistent();
        }
        if (get().cacheStatus === cacheStatusType.INITIALIZING) {
          setNotCached();
        }
        set(() => ({ _hasLoaded: true }));
      };

      return {
        ...initialStatusData,
        getLastCacheDate,
        setCached,
        setCaching,
        setInconsistent,
        setOutdated,
        setNotCached,
        setNotCachedDontAsk,
        initialize,
        _hasLoaded,
      };
    },

    {
      name: "cache_status",
      whitelist: ["cacheStatus", "_lastCache"],
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

/**
 * Hook that allows to cache the user Library.
 * @returns
 */
export function useLibraryCache() {
  const isLogged = useLoginStore((s) => s.isLogged);

  // Notification Operations
  const { pushNotification, hideNotification, refreshNotification } =
    useNotificationSystem();

  const api = useClientsStore().spotifyApi;
  const { trackStatus, getSavedTracks, percent } = useDataFacade();

  // Store elements + operations
  const {
    cacheStatus,
    getLastCacheDate,
    setCaching,
    setCached,
    setNotCachedDontAsk,
  } = useLibraryCacheStore();

  const hideAllNotifications = useCallback(() => {
    for (const id in cacheNotification) {
      hideNotification(id);
    }
  }, [hideNotification]);

  // On Log Out: Hide All the notifications
  useEffect(() => {
    if (!isLogged) {
      hideAllNotifications();
    }
  }, [hideAllNotifications, isLogged]);

  /**
   * Cache the full user library
   */
  const cacheTrackLibrary = useCallback(async () => {
    pushNotification(
      cacheNotification.CACHING,
      "info",
      <CachingInProgress progress={0} status={"loading"} />
    );
    const tracks = await api.getMySavedTracksFull();
    setCaching();
    await getSavedTracks(tracks);
    setCached();
    hideNotification(cacheNotification.CACHING);
  }, [
    pushNotification,
    api,
    setCaching,
    getSavedTracks,
    setCached,
    hideNotification,
  ]);

  const dropCache = useCallback(async () => {
    await CacheDb.resetDB();
    setNotCachedDontAsk();
  }, [setNotCachedDontAsk]);

  const deepRefreshTrackCache = useCallback(async () => {
    await dropCache();
    await cacheTrackLibrary();
  }, [cacheTrackLibrary, dropCache]);

  // If the cache starts caching: refresh the notification with the current status.
  useEffect(() => {
    if (cacheStatus === cacheStatusType.CACHING) {
      refreshNotification(
        cacheNotification.CACHING,
        <CachingInProgress progress={percent} status={trackStatus} />
      );
    }
  }, [cacheStatus, percent, refreshNotification, trackStatus]);

  // On Load: pop a notification
  useEffect(() => {
    // Do not prompt anything if the user is not logged in
    if (!isLogged) {
      return;
    }
    hideAllNotifications();
    switch (cacheStatus) {
      case cacheStatusType.OUTDATED:
        pushNotification(
          cacheNotification.OUTDATED,
          "warning",
          <CacheOutdatedMessage
            onClick={() => {
              hideNotification(cacheNotification.OUTDATED);
              cacheTrackLibrary();
            }}
            lastCacheUpdate={getLastCacheDate()}
          />
        );
        break;
      case cacheStatusType.INCONSISTENT:
        pushNotification(
          cacheNotification.INCONSISTENT,
          "error",
          <InconsistentCacheMessage
            onClick={() => {
              hideNotification(cacheNotification.INCONSISTENT);
              deepRefreshTrackCache();
            }}
          />
        );
        break;
      case cacheStatusType.UNDEFINED:
        pushNotification(
          cacheNotification.NOCACHED,
          "info",
          <AskForLibraryCache
            onClick={() => {
              hideNotification(cacheNotification.NOCACHED);
              cacheTrackLibrary();
            }}
          />
        );
        break;
    }
  }, [
    cacheStatus,
    cacheTrackLibrary,
    deepRefreshTrackCache,
    getLastCacheDate,
    hideAllNotifications,
    hideNotification,
    isLogged,
    pushNotification,
  ]);

  return { cacheTrackLibrary, dropCache, deepRefreshTrackCache, cacheStatus };
}
