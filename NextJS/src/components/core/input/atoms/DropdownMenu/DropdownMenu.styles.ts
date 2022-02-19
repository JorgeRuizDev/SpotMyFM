import { RiArrowDropDownLine } from "react-icons/ri";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import Buttons from "styles/Buttons";

interface ITitle {
  titleStyle?: "spotify" | "input";
}

const Title = styled.button<ITitle>(({ titleStyle }) => [
  tw`
    p-0
    pl-4
    flex
    flex-row
    w-full
    items-center
    justify-center
    space-x-2

    width[fit-content]
    md:(min-height[40px] max-height[40px])
    min-height[35px]
    max-height[35px]
	`,


  titleStyle == "spotify" &&
    tw`
		bg-green-500
    hover:bg-green-400 
    text-white
		
		rounded-full
	`,

  titleStyle == "input" &&
    tw`
    rounded-none
    text-textColor-lightTheme
    

    //dark:(bg-white hover:(bg-gray-200))
    bg-white
    m-0
    shadow-none

    hover:bg-gray-200 
  `,
]);

const Wrap = tw.div`
	width[fit-content]
`;

const DropIcon = styled(RiArrowDropDownLine)(({ titleStyle }: ITitle) => [
  tw`
    h-11
    w-11
    text-white
  `,
  titleStyle == "input" && tw`text-textColor-lightTheme `,
]);

const ItemList = tw.ul`
	hidden
	group-hover:block


	absolute
  z-10

	text-gray-700
	width[fit-content]

	ml-3
	pl-0
	rounded-2xl
	overflow-hidden
`;

interface itemStyle {
  itemStyle?: "spotify" | "input" | "lastFM";
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
