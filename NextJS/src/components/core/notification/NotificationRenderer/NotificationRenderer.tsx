import { useNotificationSystem } from "hooks/notification/useNotificationSystem";
import Notification from "./../Notification";
import Styled from "./NotificationRenderer.styles";
interface INotificationRendererProps {}

/**
 * Specific component that displays the individual notifications in chronological order.
 *
 * It can be used anywhere inside the provider.
 *
 * In the case of this specific App, the notifications must be rendered bellow the Navbar
 * @returns
 */
function NotificationRenderer() {
  const { notifications, hideNotification } = useNotificationSystem();

  return (
    <div>
      {Array.from(notifications.values())
        .sort((a, b) => {
          return a.datetime.getTime() - b.datetime.getTime();
        })
        .map((x) => {
          return (
            <Notification
              id={x.id}
              key={x.datetime.getTime()}
              severity={x.severity}
              onClose={() => hideNotification(x.id)}
            >
              {x.component}
            </Notification>
          );
        })}
    </div>
  );
}

export default NotificationRenderer;
