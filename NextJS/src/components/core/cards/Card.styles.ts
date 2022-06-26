import styled from "styled-components";
import { motion } from "framer-motion";
import tw from "twin.macro";
import NextImage from "next/image";
interface ILayout {
  compact?: boolean;
}

const Layout = styled.article<ILayout>(({ compact }) => [
  tw`
		flex
		flex-col
		space-y-1

		min-width[14rem]
		max-width[320px]
		
		
		dark:bg-darkCard-base
		bg-white

		text-black
    rounded-md
		rounded-b-2xl
		filter
    shadow-lg
		drop-shadow-2xl
		dark:hover:bg-green-900
		hover:bg-green-300

    
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

const Image = tw.img`
  rounded
  rounded-b-none
	width[320px]
	h-auto
`;

const Styled = { Layout, ButtonRow, Image, Content };

export default Styled;
