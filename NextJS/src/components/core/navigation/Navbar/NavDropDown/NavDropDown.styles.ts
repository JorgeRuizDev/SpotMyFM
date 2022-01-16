import { MdOutlineArrowDropDown } from "react-icons/md";
import tw from "twin.macro";

const PanelStyle = tw.div`

  w-72

  rounded-2xl
  p-3

  bg-green-200
  dark:bg-darkGreen-base
`;

const BtnLayout = tw.div`
  flex
  flex-col
  justify-start
  items-start
  h-full


`;

const Row = tw.div`
  h-full
  flex
  flex-row
  items-center
  justify-center

  space-x-0.5

  transition-colors
  duration-100

  hover:(bg-green-400 rounded-md)
  p-1

`;

const Message = tw.span`
  text-white
  dark:text-white
  font-size[11px]

`;

const Username = tw.span`
  text-white
  dark:text-white
  text-2xl
  line-height[15px]

  capitalize
`;

const Arrow = tw(MdOutlineArrowDropDown)`
  h-8
  w-8
  text-white
  dark:text-white
`;

const Styled = { PanelStyle, BtnLayout, Message, Username, Row, Arrow };

export default Styled;
