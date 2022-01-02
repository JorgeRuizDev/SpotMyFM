import Buttons from "styles/Buttons";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { severity } from "hooks/notification/useNotificationSystem";

interface INotificationDiv {
  notificationSeverity: severity;
}

const NotificationDiv = styled(motion.div)<INotificationDiv>(
  ({ notificationSeverity }) => [
    tw`
	w-full
	min-height[20px]
	p-4
	mb-2
	overflow-auto
	flex

	flex-col
	md:flex-row
	md:items-center
	items-end
	justify-end
	rounded-xl
	drop-shadow-md
  cursor[grab]
  
	`,

    notificationSeverity === "warning" && tw`bg-yellow-400`,
    notificationSeverity === "error" && tw`bg-red-400`,
    notificationSeverity === "info" && tw`bg-blue-300`,
  ]
);

const ComponentWrapper = tw.div`
	w-full
	text-black
`;

const CloseButton = tw(Buttons.CloseButton)`
  md:relative
  absolute
  top-2
  right-2
`;

const Styled = { NotificationDiv, ComponentWrapper, CloseButton };
export default Styled;
