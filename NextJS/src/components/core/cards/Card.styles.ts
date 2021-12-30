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
		
		
		dark:bg-darkCard-base
		bg-white

		text-black
    rounded-md
		rounded-b-2xl
		filter
		drop-shadow-sm	
		dark:hover:bg-green-900
		hover:bg-green-300
		shadow-xl
		
    

	`,

  compact && tw`width[15rem]`,
]);

const Content = tw.div`
  p-2
`;

const ButtonRow = tw.div`
	flex
	flex-row
	flex-wrap
	items-center
`;

const Image = tw(motion.img)`
  rounded
	width[20rem]
	h-auto
`;

const Styled = { Layout, ButtonRow, Image, Content };

export default Styled;
