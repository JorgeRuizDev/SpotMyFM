import styled from 'styled-components';
import { motion } from "framer-motion";
import tw from "twin.macro";

interface ILayout {
	compact?: boolean
}

const Layout = styled.article<ILayout>(({compact})=>[
	tw`
		flex
		flex-col
		space-y-1

		min-width[14rem]
		max-width[21rem]
		p-3
		mb-8
		dark:bg-darkCard-base
		bg-white

		text-black
		rounded-b-2xl
		filter
		drop-shadow-sm	
		dark:hover:bg-green-900
		hover:bg-green-300
		shadow-xl
		m-5
		
		transition-colors duration-200 ease-in-out
	`,

	compact && tw`width[15rem]`


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
	rounded-b-md
`;

const Styled = { Layout, ButtonRow, Image };

export default Styled;