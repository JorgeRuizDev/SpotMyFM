import tw from "twin.macro";
import Buttons from "styles/Buttons";
import styled from "styled-components";
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
interface IElementSelectWrapper {
  isSelected?: boolean;
  isNotSelected?: boolean;
}
const ElementSelectWrapper = styled.div<IElementSelectWrapper>(
  ({ isSelected = false, isNotSelected = false }) => [
    tw`
		rounded-xl

		// animation:
		transition-all
		duration-200
		ease-in-out

		height[min-content]
		//min-height[min-content]
	`,

    isSelected && tw`ring-2 ring-green-400`,

    isNotSelected && tw`opacity-50`,
  ]
);
const Styled = {
  CardLayout,
  LayoutButtonsWrap,
  ButtonRound,
  Scrollable,
  ElementSelectWrapper,
};
export default Styled;
