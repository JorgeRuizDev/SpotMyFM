import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import Buttons from "styles/Buttons";
interface ITab {
  isActive: boolean;
  isColumn?: boolean;
}

const Tab = styled(Buttons.BasicButton)<ITab>(({ isActive, isColumn }) => [
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

    sm:w-auto
    w-full
	`,

  isColumn && tw`w-full sm:w-full`,

  isActive && tw`border-2 sm:(border-0 border-b-4 ) pb-0 `,
]);

interface ITabWrap {
  isColumn?: boolean;
}

const TabWrap = styled.div<ITabWrap>(({ isColumn = false }) => [
  tw`
    flex
    sm:(flex-row space-y-0)
    flex-col
    space-y-2

    flex-wrap
    flex-shrink-0

    items-center
  `,
  isColumn && tw`flex-col sm:flex-col w-full space-y-2`,
]);

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
