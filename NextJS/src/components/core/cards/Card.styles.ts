import styled from "styled-components";
import { motion } from "framer-motion";
import tw from "twin.macro";

interface ILayout {
  compact?: boolean;
}

const Layout = styled.article<ILayout>(({ compact }) => [
  tw`
		flex
		flex-col
		space-y-1

		min-width[14rem]
		max-width[20rem]
		p-3
		
		dark:bg-darkCard-base
		bg-white

		text-black
		rounded-b-2xl
		filter
		drop-shadow-sm	
		dark:hover:bg-green-900
		hover:bg-green-300
		shadow-xl
		

	`,

  compact && tw`width[15rem]`,
]);

const ButtonRow = tw.div`
	flex
	flex-row
	flex-wrap
	items-center
`;

const Image = tw(motion.img)`
	width[312px]
	h-auto
`;

const Styled = { Layout, ButtonRow, Image };

export default Styled;
