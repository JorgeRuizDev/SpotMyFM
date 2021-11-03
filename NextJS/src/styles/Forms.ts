import tw, { TwComponent } from "twin.macro";

const Radio: TwComponent<"input"> = tw.input`
	text-darkGreen-base
	active:text-darkGreen-hover
	hover:bg-red-400
`;

const Styled = { Radio };

export default Styled;
