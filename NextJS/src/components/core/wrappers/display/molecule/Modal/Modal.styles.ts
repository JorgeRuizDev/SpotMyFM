import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

const FullScreenBackground: ForwardRefComponent<
  HTMLDivElement,
  HTMLMotionProps<"div">
> = tw(motion.div)`
	// Size
	w-full
	h-full

	// Position: 
	fixed

	top-0
	left-0

	z-50

	// Background:
	backdrop-blur-2xl	
	backdrop-filter


	flex
	items-center
	justify-center

	// Overflow:
	overflow-hidden
  
  background[rgba(0,0,0, 0.5)]
	
	
`;

const TopRow = tw.div`
	// Flex
	flex
	flex-row
	items-center
	justify-end

	// Full Width
	w-full

`;

interface IModalBody {
  darkBackground?: boolean;
}

const ModalBody = styled.div<IModalBody>(({ darkBackground }) => [
  tw`
    md:(m-2 p-2)
    pt-0
    md:(mt-20 mb-20)
    rounded-2xl

    // Size:

    max-height[95vh]
    max-width[95vw]

    //Flex:
    flex
    flex-col
    justify-end
    // Background Color
    dark:bg-darkCard-base
    bg-lightCard-base

  `,

  darkBackground && tw`dark:bg-darkMaterialBG-base bg-lightMaterialBG-base`
]);

interface IChildWrap {
  overflowScroll: boolean;
}

const ChildWrap = styled.div<IChildWrap>(({ overflowScroll }) => [
  overflowScroll ? tw`overflow-y-auto` : tw`overflow-y-hidden`
]);

const Styled = { FullScreenBackground, ModalBody, TopRow };

export default Styled;
