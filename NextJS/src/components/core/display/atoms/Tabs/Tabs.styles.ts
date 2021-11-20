import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
interface ITab {
  isActive: boolean;
}

const Tab = styled(motion.button)<ITab>(({ isActive }) => [
  tw`
		rounded-none
		border-0
		border-lightGreen-base
		m-0
		shadow-none
		pb-1
		flex-shrink-0

		dark:bg-darkCard-base
		dark:hover:bg-darkCard-hover
		bg-lightCard-base
		hover:bg-lightCard-hover

		transition-colors duration-500 ease-in-out
	`,

  isActive && tw`border-b-4 pb-0`
]);

interface IHide {
  isActive: boolean;
}

const TabWrap = tw.div`
	flex
	flex-row
	flex-wrap
	flex-shrink-0

	items-center
`;

const TabContentWrap = tw.div`
	flex
	flex-col
	w-full
	justify-start
	border-t
	border-lightGreen-base
`;

const Styled = { Tab, TabWrap, TabContentWrap };

export default Styled;
