import tw from "twin.macro";

const CardLayout = tw.div`
	w-full
	flex
	flex-row
	flex-wrap


	justify-around
	items-start

	overflow-hidden

  max-height[600px]

  md:max-height[1200px]
`;

const Styled = { CardLayout };

export default Styled;
