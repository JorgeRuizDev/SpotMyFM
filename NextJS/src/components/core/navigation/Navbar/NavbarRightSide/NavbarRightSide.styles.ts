import { motion } from "framer-motion";
import tw from "twin.macro";

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
	flex-none

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

const LogOutDiv = tw(motion.div)`
	flex
	justify-center
	overflow-hidden
`;

const Styled = { RightSide, p, ProfilePic, LogOutButton, LogOutDiv };
export default Styled;
