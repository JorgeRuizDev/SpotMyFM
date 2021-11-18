import styled from "styled-components";
import tw from "twin.macro";

interface IActiveButton {
  isActive: boolean;
}

const Page = styled.button<IActiveButton>(({ isActive }) => [
  tw`
		rounded-none

		bg-white
		hover:bg-green-200
		border-darkGreen-base
		text-darkGreen-base

		disabled:(bg-gray-300 cursor-not-allowed shadow-none)
	
	`,
  isActive && tw` hover:bg-lightGreen-hover	bg-lightGreen-base text-white`
]);

const InlineCenter = tw.div`
	w-full

	flex
	flex-row
	flex-wrap
	items-center
	justify-center
`;

const Styled = { Page, InlineCenter };

export default Styled;
