import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import tw from "twin.macro";

const ToggleButton = tw(motion.div)`
	w-full
	height[25px]

	//shape:
	rounded-full


	flex
	justify-center
	items-center



	// Colors:
	hover:dark:bg-darkCard-base
	hover:bg-lightCard-base

	dark:bg-darkCard-hover
	bg-lightCard-hover

	cursor-pointer

	border
	

`;

const ToggleIcon = tw(MdKeyboardArrowDown)`
	text-lightGreen-base
	hover:text-lightGreen-hover

	text-3xl
`;

const Wrapper = tw(motion.div)`

`;

const CenterChild = tw.div`
	flex
	flex-col
	items-center
	justify-center
`

const Styled = { ToggleButton, Wrapper, ToggleIcon, CenterChild};

export default Styled;
