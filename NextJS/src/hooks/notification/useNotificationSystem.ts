import { ReactNode, useCallback } from "react";
import create from "zustand";
/**
 * Notification Severity:
 *
 * Each severity level has a specific background color for the notification.
 */
export type severity = "info" | "warning" | "error";

/**
 * Notification Items.
 *
 * Each notification must store an unique id, a datetime (to render the notifications in a chronological order
 * a severity to identify the background color and the inner component that we want to render )
 */
interface INotification {
  id: string;
  datetime: Date;
  severity: severity;
  component: ReactNode | ReactNode[];
}

interface INotificationStore {
  notifications: Map<string, INotification>;
  putNotification: (n: INotification) => void;
  hideNotification: (id: string) => void;
  hideAll: () => void;
}

const useNotificationStore = create<INotificationStore>((set, get) => {
  const initial = {
    notifications: new Map<string, INotification>(),
  };

  const putNotification = (n: INotification) => {
    const noti = get().notifications;
    noti.set(n.id, n);
    set((s) => ({ notifications: noti }));
  };

  const hideNotification = (id: string) => {
    const noti = get().notifications;
    noti.delete(id);
    set((s) => ({ notifications: noti }));
  };

  const hideAll = () => {
    set((s) => ({ notifications: new Map() }));
  };

  return { ...initial, putNotification, hideNotification, hideAll };
});

export function useNotificationSystem() {
  const {
    hideNotification: hideNotiState,
    putNotification: putNotiState,
    hideAll,
    notifications,
  } = useNotificationStore();

  /**
   * Hides the notification by deleting it from the Map
   * @param id of the notification we wan to hide.
   */
  const hideNotification = useCallback(
    (id: string) => {
      hideNotiState(id);
    },
    [hideNotiState]
  );

  const refreshNotification = useCallback(
    (id: string, component: ReactNode | ReactNode[]) => {
      const oldNot = notifications.get(id);

      if (oldNot !== undefined) {
        const newNoti = {
          id: id,
          datetime: oldNot.datetime,
          severity: oldNot.severity,
          component: component,
        };
        putNotiState(newNoti);
      }
    },
    [notifications, putNotiState]
  );

  const pushNotification = useCallback(
    (id: string, severity: severity, component: ReactNode | ReactNode[]) => {
      const newNoti = {
        id: id,
        component: component,
        datetime: new Date(),
        severity: severity,
      };

      putNotiState(newNoti);
    },
    [putNotiState]
  );

  return {
    notifications,
    pushNotification,
    refreshNotification,
    hideNotification,
  };
}
