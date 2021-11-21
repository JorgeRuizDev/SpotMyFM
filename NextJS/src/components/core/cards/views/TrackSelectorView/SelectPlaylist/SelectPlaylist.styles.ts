import styled from "styled-components";
import tw from "twin.macro";
const CardLayout = tw.section`
	flex
	flex-row
	flex-wrap
	justify-around

	items-start

	// style:
	bg-lightCard-hover
	dark:bg-darkCard-hover
	rounded
	drop-shadow-2xl
	
	overflow-x-hidden
	overflow-y-hidden
`;

const Center = tw.section`
	flex
	flex-row
	flex-wrap

	items-center
	justify-center
`;

interface ISelectLayer {
  isSelected: boolean;
  isNotSelected: boolean;
}

const SelectLayer = styled.div<ISelectLayer>(p => [
  tw`
		rounded-2xl
		cursor-pointer
		
		m-5

		// animation:
		transition-all
		duration-200
		ease-in-out
	`,

  p.isSelected && tw`ring-4 ring-green-400`,

  p.isNotSelected && tw`opacity-50`
]);

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

const Styled = { CardLayout, SelectLayer, Center, MenuWrap, Scrollable };

export default Styled;
