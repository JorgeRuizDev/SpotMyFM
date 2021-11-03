import Link from "next/link";
import tw from "twin.macro";

const NextLink = tw(Link)`
	width[inherit]
	height[inherit]
	color[inherit]
`;

const A = tw.a`
	width[inherit]
	height[inherit]
	color[inherit]
	hover:no-underline
`;

const Styled = { NextLink, A };

export default Styled;
