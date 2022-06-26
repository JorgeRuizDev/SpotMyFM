import tw from "twin.macro";

const Wrap = tw.div`
	w-full
	flex
	flex-col

	space-y-6

	min-height[200px]

	overflow-x-hidden
`;

const Center = tw.div`
	w-full
	h-auto
	flex
	flex-col
	items-center
`;

const SliderWrap = tw.div`
	p-5
`;
const Styled = { Wrap, SliderWrap, Center };

export default Styled;
