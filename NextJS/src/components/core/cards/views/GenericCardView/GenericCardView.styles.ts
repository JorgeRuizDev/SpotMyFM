import tw from "twin.macro";
import Buttons from "styles/Buttons";
const CardLayout = tw.div`
	w-full
	flex
	flex-row
	flex-wrap


	justify-around
	items-start
  relative
	
`;

const LayoutButtonsWrap = tw.section`
	flex
	flex-row
	flex-wrap

	items-center
	justify-center
`;

const ButtonRound = tw(Buttons.PrimaryGreenButton)`
	px-4
	py-4
`;

const Scrollable = tw.div`
	w-auto
	h-auto

	overflow-y-auto

`;

const Styled = { CardLayout, LayoutButtonsWrap, ButtonRound, Scrollable };
export default Styled;
