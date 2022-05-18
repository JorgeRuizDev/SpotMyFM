import tw from "twin.macro";
import Ms from "styles/Miscellaneous";
const Card = Ms.Card;

const CardLayout = tw.div`
	w-full
	flex
	flex-row
	flex-wrap


	justify-around
	items-start

	overflow-y-auto
`;

const Scrollable = tw.div`
	width[300px]
	h-auto

	overflow-y-auto

`;

const Wrap = tw.div`
  w-full
  space-y-6
`;

const Styled = { Card, CardLayout, Scrollable, Wrap };

export default Styled;
