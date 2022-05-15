import { FaArrowDown } from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import StyledCards from "../../Card.styles";
const Wrapper = tw.div`
	h-auto
	rounded-2xl
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

const Column = styled.div(({ centerCol }: { centerCol?: boolean }) => [
  tw`
	flex
	flex-col
	space-y-4
	items-center
  
  m-2
  `,

  centerCol && tw`justify-center`,
]);
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

	height[fit-content]
	mt-4
	mb-4
`;

const TagsButtonRow = tw(ButtonRow)`
	2xl:max-width[700px]
  xl:max-width[600px]
  min-width[40%]
`;

const NoDescLayout = tw.div`
  p-4
  w-auto
  grid
  justify-items-center  
  md:grid-cols-2
  grid-cols-1
  gap-6

`;

const Card = tw.div`
  
  flex
  flex-col

  // Colors
  bg-lightCard-base
  dark:bg-darkCard-base

  // Shape:

  min-width[90%]
  height[fit-content]
  rounded-2xl

  shadow-xl
  p-4
  



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
  NoDescLayout,
  Card
};

export default Styled;
