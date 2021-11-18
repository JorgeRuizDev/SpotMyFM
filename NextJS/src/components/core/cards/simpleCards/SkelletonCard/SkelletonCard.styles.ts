import Buttons from "styles/Buttons";
import tw from "twin.macro";
import StyledCard from "../Card.styles";

const Layout = tw(StyledCard.Layout)`
	animate-pulse
	height[30rem]
	width[21rem]
	space-y-2

	hover:bg-lightCard-hover
	dark:hover:bg-darkCard-hover
`;

const Image = tw.div`
	w-full
	height[19.5rem]
	bg-gray-500
	rounded-b-md
`;

const Button = tw(Buttons.PrimaryGreenButton)`
	min-width[7rem]
	bg-gray-500
	dark:bg-gray-500
`;

const ButtonRow = tw(StyledCard.ButtonRow)``;

const Text1 = tw.div`
	h-8 bg-gray-500 rounded width[90%]
`;

const Text2 = tw.div`
	h-4 bg-gray-500 rounded width[30%]
`;

const Styled = { Layout, Image, Button, ButtonRow, Text1, Text2 };

export default Styled;
