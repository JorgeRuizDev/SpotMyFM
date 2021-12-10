import { motion } from "framer-motion";
import tw from "twin.macro";

const HorizontalCard = tw.article`
	flex

	// Wrap
	2xl:flex-nowrap
	xl:flex-wrap
	md:flex-nowrap
	sm:flex-wrap
	flex-wrap

	
	md:items-start
	
	justify-center

	// Colors
	bg-lightCard-base
	dark:bg-darkCard-base

	// Shape:
	m-4
	min-width[fit-content]
	rounded-2xl

	shadow-xl

`;

const Inline = tw.div`

	flex
	flex-row
	flex-wrap

	items-center

	space-x-2
`;

const ColumnItems = tw.section`
	p-2
	flex
	flex-col


	space-y-4
`;

const GenrePill = tw.button`
	bg-blue-400
	hover:bg-blue-500

	cursor-default
`;

const GenrePillWrap = tw.section`
	flex
	flex-row
	flex-wrap
  justify-center
  sm:justify-start
`;

const Image = tw(motion.img)`
	max-width[210px]
	min-width[185px]
	rounded
	m-2
	z-50
	overflow-scroll

	row-span-4
`;

const Styled = {
  HorizontalCard,
  ColumnItems,
  Image,
  GenrePill,
  GenrePillWrap,
  Inline,
};

export default Styled;
