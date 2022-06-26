import tw from "twin.macro";

const Card = tw.div`
	w-full

	flex
	flex-col
	flex-nowrap
	space-y-2
`;
const Center = tw.div`
	flex
	flex-col
	flex-nowrap

	items-center
	justify-center

	space-y-6
`;

const Row = tw.div`
	flex
	flex-row
	flex-wrap
	justify-center
	space-x-6
`;

const PillWrap = tw.div`
	flex
	flex-row
	flex-wrap

	justify-center

	w-full
	
`;

const Input = tw.input`
	cursor-pointer
`;

const Styled = { Card, PillWrap, Input, Center, Row };

export default Styled;
