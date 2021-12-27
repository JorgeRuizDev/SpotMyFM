import { AnimatePresence } from "framer-motion";
import { useNotificationSystem } from "hooks/notification/useNotificationSystem";
import React from "react";
import Notification from "./../Notification";
import Styled from "./NotificationRenderer.styles";


/**
 * Specific component that displays the individual notifications in chronological order.
 *
 * It can be used anywhere
 *
 * In the case of this specific App, the notifications must be rendered bellow the Navbar
 * @returns A component
 */
function NotificationRenderer(): JSX.Element {
  const { notifications, hideNotification } = useNotificationSystem();

  return (
    <Styled.Wrapper>

      <AnimatePresence >
        {Array.from(notifications.values())
          .sort((a, b) => {
            return a.datetime.getTime() - b.datetime.getTime();
          })
          .map((x) => {
            return (
              <Notification
                id={x.id}
                key={x.id}
                severity={x.severity}
                onClose={() => hideNotification(x.id)}
              >
                {x.component}
              </Notification>
            );
          })}
      </AnimatePresence>
    </Styled.Wrapper>
  );
}

export default React.memo(NotificationRenderer);
