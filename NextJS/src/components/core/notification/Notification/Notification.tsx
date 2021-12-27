import { AnimatePresence } from "framer-motion";
import { severity } from "hooks/notification/useNotificationSystem";
import { ReactNode } from "react";

import Styled from "./Notification.styles";
interface INotificationProps {
  onClose: () => void;
  id: string;
  severity: severity;
  children?: ReactNode | ReactNode[]
}

function Notification(props: INotificationProps) {
  return (
    <>
      <AnimatePresence>
        <Styled.NotificationDiv
          key={props.id}
          notificationSeverity={props.severity}
          exit={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            ease: "easeIn",
            duration: 0.3
          }}
        >
          <Styled.ComponentWrapper>{props.children}</Styled.ComponentWrapper>
          <Styled.CloseButton onClick={props.onClose} />
        </Styled.NotificationDiv>
      </AnimatePresence>
    </>
  );
};

export default Notification;
