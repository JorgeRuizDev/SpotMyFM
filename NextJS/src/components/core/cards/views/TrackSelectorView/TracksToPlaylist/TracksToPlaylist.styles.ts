import tw from "twin.macro";

const CenterContent = tw.div`
	w-full

	flex
	flex-wrap
	justify-center
`;

const ItemBox = tw.div`
	// Shape and size
	flex
	flex-col
	flex-wrap

	rounded
	max-width[900px]
	width[900px]


	p-5
	md:m-10

	// Background: 
	dark:bg-darkCard-base
	bg-lightCard-base

	

	shadow-md
	transform
	duration-1000
	ease-in-out
`;

const Styled = {
  CenterContent,
  ItemBox
};

export default Styled;
