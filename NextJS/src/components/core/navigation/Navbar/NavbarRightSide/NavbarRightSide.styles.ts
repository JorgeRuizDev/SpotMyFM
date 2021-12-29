import { motion } from "framer-motion";
import tw from "twin.macro";
import { IoChevronDown } from "react-icons/io5";
import { FaGithub, FaGlobeEurope } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { IoMdHelpCircleOutline } from "react-icons/io";
const RightSide = tw.div`
	items-center
	flex
	justify-end
	h-full
`;

const p = tw.p`
	dark:text-white
	overflow-auto
	text-white
  lg:block
  hidden
  cursor-pointer
`;

const LogOutButton = tw(motion.button)`
	rounded-full
	bg-indigo-700
	hover:bg-indigo-600
	p-2
	pl-5
	pr-5
	ml-2
	mr-2
	min-width[8rem]
	text-white
`;

const ProfilePic = tw(motion.img)`
	rounded-3xl
	h-5/6
	m-2
	border-solid
	border
	border-black
	cursor-pointer

`;

const Relative = tw.div`
  h-full
  flex
  items-center
  justify-center
  relative
`;

const Arrow = tw(IoChevronDown)`
  rotate-90
  dark:text-textColor-darkTheme
  text-textColor-darkTheme
  absolute
  left-2
  bottom-0
`;

const Github = tw(FaGithub)`
  dark:text-textColor-darkTheme
  text-textColor-darkTheme
  cursor-pointer

`;

const Settings = tw(AiFillSetting)`
  dark:text-textColor-darkTheme
  text-textColor-darkTheme
  cursor-pointer

`;

const Help = tw(IoMdHelpCircleOutline)`
  dark:text-textColor-darkTheme
  text-textColor-darkTheme
  cursor-pointer

`;
const LogOutDiv = tw(motion.div)`
	flex
	justify-center
	overflow-hidden
`;

const Globe = tw(FaGlobeEurope)`
  dark:text-textColor-darkTheme
  text-textColor-darkTheme
  cursor-pointer
`;

const IconWrap = tw.div`
  flex
  flex-row
  items-center
  
  space-x-4

  text-3xl
  ml-2
  mr-4
`;

const Styled = {
  RightSide,
  p,
  ProfilePic,
  LogOutButton,
  LogOutDiv,
  Relative,
  Arrow,
  Globe,
  Github,
  Help,
  Settings,
  IconWrap,
};
export default Styled;
