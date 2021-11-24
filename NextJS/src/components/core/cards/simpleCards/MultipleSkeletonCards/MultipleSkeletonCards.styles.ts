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

  gap-x-5
  gap-y-5
`;

const Styled = { CardLayout };

export default Styled;
