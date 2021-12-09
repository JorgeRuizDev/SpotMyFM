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
  darkBackground?: string;
}

const ModalBody = styled.div<IModalBody>(({ darkBackground }) => [
  tw`
    md:(m-2 p-2)
    pt-0
    md:(mt-20 mb-20)
    rounded-2xl

    

    // Size:

    md:(max-height[95vh])
    md:(max-width[95vw])
    max-h-full
    max-w-full

    //Flex:
    flex
    flex-col
    justify-end
    // Background Color
    dark:bg-darkCard-base
    bg-lightCard-base

  `,

  darkBackground == "material" &&
    tw`dark:bg-darkMaterialBG-base bg-lightMaterialBG-base`,
  darkBackground == "card" && tw`dark:bg-darkCard-base bg-lightCard-base`,

  darkBackground == "card-hover" &&
    tw`dark:bg-darkCard-hover bg-lightCard-hover`,
]);

const Styled = { FullScreenBackground, ModalBody, TopRow };

export default Styled;
