import { RiArrowDropDownLine } from "react-icons/ri";
import styled from "styled-components";
import tw from "twin.macro";
import Buttons from "styles/Buttons";

interface ITitle {
  titleStyle?: "spotify";
}

const Title = styled(Buttons.PrimaryGreenButton)<ITitle>(({ titleStyle }) => [
  tw`

  
	p-0
	pl-4

	`,

  titleStyle == "spotify" &&
    tw`
		bg-green-200
		hover:bg-green-300
		dark:(hover:bg-green-500 bg-green-400)
		dark:text-white
		text-gray-600
		rounded-xl
	`,
]);

const Wrap = tw.div`
	width[fit-content]

  z-10
`;

const DropIcon = tw(RiArrowDropDownLine)`
	h-11
	w-11
	dark:text-white
`;

const ItemList = tw.ul`
	hidden
	group-hover:block


	absolute
	text-gray-700
	width[fit-content]

	ml-3
	pl-0
	rounded-2xl
	overflow-hidden
`;

interface itemStyle {
  itemStyle?: "lastFM";
}

const Item = styled.a<itemStyle>(({ itemStyle }) => [
  tw`
		text-gray-600
		dark:text-white

		bg-green-200
		hover:bg-green-300
		dark:(hover:bg-green-700 bg-green-600)

		cursor-pointer


		ml-0
		py-2
		px-4

		flex
		flex-row
		items-center
		justify-start
		space-x-2

		hover:no-underline
		

		`,
  itemStyle == "lastFM"
    ? tw`
		bg-red-300
		hover:(bg-red-400 )
		dark:(hover:bg-red-400 bg-red-500 )
	`
    : null,
]);

const Styled = {
  Title,
  DropIcons: DropIcon,
  ItemList,
  Item,
  Wrap,
};

export default Styled;
