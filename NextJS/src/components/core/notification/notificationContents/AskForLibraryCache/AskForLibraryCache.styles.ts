import Buttons from "styles/Buttons";
import tw from "twin.macro";

const p = tw.p`
	text-gray-800
	dark:text-gray-800
`;

const b = tw.b`
	text-2xl
	leading-10
	text-black
	dark:text-black
`;

const Flex = tw.div`
	flex
	flex-col
	md:flex-row
	items-center
	justify-between
`;

const CacheButton = tw(Buttons.PrimaryBlueButton)`
	mt-4
	md:mt-0
`;

const Styled = {
  p,
  b,
  Flex,
  CacheButton,
};
export default Styled;
