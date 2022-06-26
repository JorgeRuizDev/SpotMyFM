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

const LogOutDiv = tw(motion.div)`
	flex
	justify-center
	overflow-hidden
`;

const PlayerWrap = tw.div`
  max-w-[250px]
  mr-8
  hidden
  xl:block
`;

const Styled = {
  RightSide,
  p,
  ProfilePic,
  LogOutButton,
  LogOutDiv,
  Relative,
  PlayerWrap,
};
export default Styled;
