import styled from "styled-components";
import tw from "twin.macro";

const Center = tw.section`
	flex
	flex-row
	flex-wrap

	items-center
	justify-center
`;

const MenuWrap = tw.div`
	m-3
	space-y-2

	flex
	flex-col

`;

const Scrollable = tw.div`
	max-height[70vh]
	overflow-y-auto
	overflow-x-hidden
`;

interface IElementSelectWrapper {
  isSelected?: boolean;
  isNotSelected?: boolean;
}
const ElementSelectWrapper = styled.div<IElementSelectWrapper>(
  ({ isSelected = false, isNotSelected = false }) => [
    tw`

		// animation:
		transition-all
		duration-200
		ease-in-out
    rounded-b-xl
		height[min-content]
	`,

    isSelected && tw`ring-2 ring-green-400`,

    isNotSelected && tw`opacity-50`,
  ]
);

const CardLayoutBg = tw.div`
  dark:bg-darkMaterialBG-base
  bg-lightMaterialBG-base
  rounded
  max-height[70vh]
  overflow-y-auto
  p-1
`;

const Styled = {
  Center,
  MenuWrap,
  Scrollable,
  ElementSelectWrapper,
  CardLayoutBg,
};

export default Styled;
