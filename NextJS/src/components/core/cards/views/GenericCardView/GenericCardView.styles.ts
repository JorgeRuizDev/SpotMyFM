import tw from "twin.macro";
import Buttons from "styles/Buttons";
import styled from "styled-components";

interface ICardLayoutProps {
  addSpace?: boolean;
}

const CardLayout = styled.div<ICardLayoutProps>(({ addSpace = false }) => [
  tw`
	w-full
	flex
	flex-row
	flex-wrap
  align-top

	justify-around
	items-start
  relative
  `,

  addSpace && tw`gap-x-5 gap-y-8`,
]);

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

const Styled = {
  CardLayout,
  LayoutButtonsWrap,
  ButtonRound,
  Scrollable,
};
export default Styled;
