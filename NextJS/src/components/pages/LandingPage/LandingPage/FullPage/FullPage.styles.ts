import { FaArrowDown } from "react-icons/fa";
import tw from "twin.macro";
const SnapWrap = tw.div`
  lg:scroll-snap-y-mandatory
  scroll-snap-y
  scroll-behavior[smooth]

  flex
  flex-col
  flex-nowrap
  overflow-x-hidden
  overflow-y-auto

  max-height[100vh]
  max-width[100vw]

  no-scrollbar
  lg:scrollbar

  relative
`;

interface ISideListItem {
  isOpen: boolean;
}

const ListItem = tw.li`
  cursor-pointer

  flex
  items-center
  justify-center


  p-2
  m-1

  rounded-lg


  min-h-0
  h-7
  w-7

  bg-green-100

  
	text-green-700
	border-green-700
	border
	
	hover:bg-green-200

  dark:(text-green-700)
	z-index[31]
`;

const ActiveListItem = tw(ListItem)`
  bg-green-600
  hover:bg-green-500
  text-white

  dark:(bg-green-600 hover:bg-green-500 text-white)
  
`;

const SideListPos = tw.div`
  absolute
  h-screen
  lg:right-8
  md:right-4
  right-2
  
`;

const SideList = tw.ul`
  flex
  flex-col
  items-center
  justify-center
  relative
  h-full
  w-full
  select-none
`;

const TopButtonWrap = tw.div`
  w-full
  absolute
  bottom-5
  z-0
  
  flex
  flex-row
  items-center
  justify-center
`;

const BouncyArrowWrap = tw.div`
  absolute
  
  bottom-5
  w-full

  flex
  items-start
  justify-start

`;

const BouncyArrow = tw(FaArrowDown)`
	animate-bounce
  block
	m-8
	md:text-5xl
  text-3xl

  text-darkGreen-base
  dark:text-white
`;

const Styled = {
  SnapWrap,
  SideList,
  SideListPos,
  ListItem,
  ActiveListItem,
  TopButtonWrap,
  BouncyArrow,
  BouncyArrowWrap,
};

export default Styled;
