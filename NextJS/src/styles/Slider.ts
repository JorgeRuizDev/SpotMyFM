import tw from "twin.macro";
import ReactSlider from "react-slider";
import styled from "styled-components";

const StyledThumb = tw.div`

	margin-top[-0.8rem]	
	h-8
	line-height[25px]
	w-8

	rounded-full

	text-align[center]
	bg-lightGreen-base
	hover:bg-lightGreen-hover
	text-white
	cursor[grab]
	
	outline-none
`;

const ThumbBox = tw.div`
	w-8
	
	outline-none
	flex
	flex-col
	items-center
`;

const ValueBox = tw.div`
	// Hide / Show
	opacity-0
	group-hover:opacity-100
	group-active:opacity-100

	rounded-md
	bg-lightGreen-base

	// Padding and margin
	p-1
	mt-2
	
	min-width[2rem]
	width[fit-content]
	

	// Center the Text & style
	text-white
	font-bold
	text-lg

	flex
	flex-row
	items-center
	justify-center

	overflow-visible
`;

const StyledSlider = tw(ReactSlider)`
	flex
	items-start
	
	justify-start
	w-full
	h-2
`;

interface ITrackIndex {
  index: any;
}

const StyledTrack = styled.div<ITrackIndex>((index) => [
  tw`
		h-2
		top-0
		left-0
		right-0
		bottom-0

		rounded-full
		cursor-pointer
	`,

  index.index === 0 && tw`bg-blue-500`,
  index.index === 1 && tw`bg-blue-400`,
  index.index === 2 && tw`bg-red-400`,
]);

const StyledDoubleTrack = styled(StyledTrack)<ITrackIndex>((index) => [
  index.index === 0 && tw`bg-blue-300`,
  index.index === 1 && tw`bg-blue-500`,
  index.index === 2 && tw`bg-blue-300`,
]);

const Styled = {
  StyledThumb,
  StyledTrack,
  StyledDoubleTrack,
  ValueBox,
  ThumbBox,
};

export default Styled;
