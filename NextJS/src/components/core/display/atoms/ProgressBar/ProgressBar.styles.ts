import tw from "twin.macro";

const BarWrapper = tw.div`

	flex
	flex-row
	items-center

	overflow-auto
`;

const p = tw.p`
	dark:text-gray-700	
`;

const Percentage = tw(p)`
	pl-8
	pr-2
`;

const BackgroundBar = tw.div`

	overflow-hidden
	h-2
	
	text-xs
	flex
	rounded
	bg-indigo-400
	w-full
`;

const ProgressBar = tw.div`
	shadow-none
	flex
	flex-col
	text-center
	max-w-full
	overflow-hidden
	text-white
	justify-center
	bg-indigo-600

`;

const Styled = { ProgressBar, BackgroundBar, BarWrapper, p, Percentage };
export default Styled;
