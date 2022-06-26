import { AnimatePresence, PanInfo } from "framer-motion";
import {
  severity,
  useNotificationSystem,
} from "hooks/notification/useNotificationSystem";
import React, { useCallback } from "react";
import { ReactNode } from "react";

import Styled from "./Notification.styles";
interface INotificationProps {
  onClose: () => void;
  id: string;
  severity: severity;
  children?: ReactNode | ReactNode[];
}

function Notification(props: INotificationProps): JSX.Element {
  const { hideNotification } = useNotificationSystem();

  const hide = useCallback(() => {
    hideNotification(props.id);
  }, [hideNotification, props.id]);

  return (
    <>
      <Styled.NotificationDiv
        key={props.id}
        notificationSeverity={props.severity}
        initial={{
          opacity: 0,
          x: "-100vw",
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: "100vw",
        }}
        transition={{
          ease: "easeIn",
          duration: 0.3,
        }}
      >
        <Styled.ComponentWrapper>{props.children}</Styled.ComponentWrapper>
        <Styled.CloseButton onClick={hide} />
      </Styled.NotificationDiv>
    </>
  );
}

export default React.memo(Notification);
