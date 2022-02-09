import { motion } from "framer-motion";
import Buttons from "styles/Buttons";
import tw from "twin.macro";

const HorizontalCard = tw.article`
	flex
  scroll-snap-align[center]
	// Wrap
	2xl:(flex-nowrap justify-start)
	xl:(flex-wrap justify-center)
	md:(flex-nowrap justify-start)
	sm:(flex-wrap justify-center)
  justify-center
  content-start
	flex-wrap

	// Colors
	bg-lightCard-base
	dark:bg-darkCard-base

	// Shape:
  
	min-width[90%]
  height[fit-content]
	rounded-2xl

	shadow-xl
  p-1
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

const GenrePill = tw(Buttons.BasicButton)`
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
	max-width[300px]
  min-width[200px]
  self-center

	rounded-xl
	m-2
	z-50
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
