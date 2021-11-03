import tw from "twin.macro";

const pBlack = tw.p`
	text-black
	dark:text-black
`;

const Inline = tw.article`
	flex
	flex-row
	flex-wrap
	space-x-2
`;

const pGreen = tw.span`
	text-darkGreen-base
	dark:text-lightGreen-base
`;

const Styled = { pBlack, pGreen, Inline };

export default Styled;
