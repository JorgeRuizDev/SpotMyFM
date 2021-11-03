import { ImSpinner2 } from "react-icons/im";
import tw from "twin.macro";

const LoadingSpinner = tw(ImSpinner2)`
	animate-spin
`;

const FlexInline = tw.div`
	flex
	flex-row
	flex-wrap
	items-center
	space-x-2
`;

const Card = tw.div`
	w-full

	bg-lightCard-base
	dark:bg-darkCard-base

	shadow-2xl

	flex
	flex-col
	flex-nowrap

	p-4
	space-y-2
`;

const Styled = { LoadingSpinner, FlexInline, Card };

export default Styled;
