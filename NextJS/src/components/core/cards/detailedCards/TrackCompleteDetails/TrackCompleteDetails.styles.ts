import { FaArrowDown } from "react-icons/fa";
import tw from "twin.macro";
import StyledCards from "../../Card.styles";
const Wrapper = tw.div`
	
	lg:max-height[80vh]
	lg:max-width[80vw]
	max-height[90vh]
	max-width[90vw]
	
	h-auto

	p-4

	rounded-2xl

	bg-lightCard-base
	dark:bg-darkCard-base


	flex
	md:(flex-row )
	
	flex-col

	
	
`;
const ImgSize = "350px";

const BouncyArrow = tw(FaArrowDown)`
	animate-bounce
	hidden
	lg:block
	m-6
	text-7xl
`;

const CenterElement = tw.div`
	w-full

	flex
	flex-col
	items-center
	justify-center
`;
const Image = tw(StyledCards.Image)`
	// Size
	
	md:width[${ImgSize}]
	min-width[10px]

	overflow-visible
	rounded
	mt-3
	mb-3
`;

const DescriptionBox = tw.article`
	max-width[60ch]
	
	m-2
`;

const Column = tw.div`
	flex
	flex-col
	
	items-center
`;
const AlbumColumn = tw.div`
	flex
	flex-col

	items-start
	max-width[${ImgSize}]

`;

const InfoGrid = tw.section`
	grid
	xl:grid-cols-2
	grid-cols-1

	gap-x-14
	gap-y-5
	justify-items-stretch
	
`;

const ButtonRow = tw(StyledCards.ButtonRow)`
	max-width[70%]
	justify-center
	
	mt-4
	mb-4
`;

const TagsButtonRow = tw(ButtonRow)`
	max-width[95%]
`;

const Styled = {
  Wrapper,
  Image,
  InfoGrid,
  Column,
  DescriptionBox,
  AlbumColumn,
  ButtonRow,
  TagsButtonRow,
  BouncyArrow,
  CenterElement,
};

export default Styled;
