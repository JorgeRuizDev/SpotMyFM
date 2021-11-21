import tw from "twin.macro";

const TwoCols = tw.div`
	grid
	grid-cols-1
	md:grid-cols-2

	gap-5
	
	
`;

const Scrollable = tw.div`
	w-full
	flex
	flex-col
	items-center

	overflow-y-auto

	h-full
	m-4
	space-y-5
`;

const Col = tw.article`
	w-full
	flex
	flex-col
	items-center
	
	space-y-5
`;

const Img = tw.img`
	width[350px]
	height[350px]
`;
const JustifyLeft = tw.section`
	w-full
	pl-3
`;

const Center = tw.div`
	flex
	flex-col
	items-center

	m-2
`;

const Styled = { TwoCols, Col, JustifyLeft, Img, Scrollable, Center };
export default Styled;
