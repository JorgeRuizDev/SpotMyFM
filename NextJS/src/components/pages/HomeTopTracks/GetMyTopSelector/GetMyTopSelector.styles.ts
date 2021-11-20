import tw from "twin.macro";

const TwoColumns = tw.div`
	grid
	md:grid-cols-2
	grid-cols-1

	gap-y-4
	
	//Responsive width
	xl:w-1/2
	lg:w-3/5
	w-4/5

	// design
	bg-lightCard-base
	dark:bg-darkCard-base
	shadow-md
	rounded


	p-3
	mt-8
	mb-8
`;

const Inline = tw.section`
	flex
	flex-row
	flex-nowrap
	
	items-center
	justify-start

	space-x-2
`;

const CenterGrid = tw.div`
	flex
	
	justify-center
`;

const JustifyStart = tw.div`
	flex
	flex-col
	justify-start
`;

const Column = tw.section`
	flex
	flex-col

	items-center
	justify-center
`;

const Styled = { TwoColumns, Column, Inline, JustifyStart, CenterGrid };

export default Styled;
