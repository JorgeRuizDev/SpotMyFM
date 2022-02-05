import styled from "styled-components";
import tw from "twin.macro";

const pBlack = tw.p`
	text-black
	dark:text-black
`;

const Inline = tw.article`
	flex
	flex-row
  items-center
  
	flex-wrap
	space-x-2
`;

const Center = tw.div`
  flex
  justify-center
  w-full
`;

interface IColumn {
  centered?: boolean;
}

const Column = styled.span<IColumn>(({ centered }) => [
  tw`
    flex
    flex-col
    space-y-3
    w-full
  `,
  centered && tw`items-center`
]);
const pGreen = tw.span`
	text-darkGreen-base
	dark:text-lightGreen-base
`;

const green = pGreen;

const Styled = { pBlack, pGreen, Inline, green, Center, Column };

export default Styled;
