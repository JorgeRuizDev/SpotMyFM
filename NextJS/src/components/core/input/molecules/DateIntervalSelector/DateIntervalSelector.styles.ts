import tw from "twin.macro";

const SliderWrap = tw.div`
	w-full
	p-5

`;

const Center = tw.div`
	w-full
	flex
	flex-col
	justify-center
	items-center

	space-y-3

`;

const CenterRow = tw.div`
	w-full
	flex
	md:flex-row
	flex-col
	flex-wrap
	justify-around
	items-center
	
	space-y-8
	md:space-y-0
	
	p-8

`;

const Col = tw.div`
	flex
	flex-col
	space-y-3

`;

const Styled = { SliderWrap, Center, CenterRow, Col };

export default Styled;
