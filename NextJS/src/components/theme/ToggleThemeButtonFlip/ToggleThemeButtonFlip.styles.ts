import { HiMoon, HiSun } from "react-icons/hi";
import styled, { css } from "styled-components";
import tw from "twin.macro";

interface StyleProps {
  isLogged?: boolean;
}

/**
 * @description Animation by:
 * @author Iván Ruiz Gázquez <https://github.com/irg1008>
 */
const Flip = tw.div`
  w-16
  h-16
  perspective[900px]
`;

const ButtonPos = styled.div(({ isLogged }: { isLogged?: boolean }) => [
  !isLogged && tw`flex`,
  tw`
    fixed
    bottom-0 
    right-0 

    md:m-8 
    m-4

    filter
    drop-shadow-2xl

    hidden
    md:flex
    z-50
  `,
]);

const InnerFlip = styled.div(
  ({ flipped, isLogged }: { flipped: boolean; isLogged?: boolean }) => [
    tw`
    relative
    w-full
    h-full
    transform-style[preserve-3d]
    transition-transform
    duration-500
    ease-in-out
    cursor-pointer
    rounded-full
  `,
    flipped && tw`transform[rotateY(180deg)]`,

    isLogged ? tw`hidden md:block` : tw`block`,
  ]
);

const Side = tw.div`
  absolute
  backface-visibility[hidden]
  w-full
  h-full
  flex
  items-center
  justify-center
  rounded-full
`;

const Front = tw(Side)`
  bg-gray-900
  hover:bg-gray-800
`;

const Back = tw(Side)`
  bg-gray-200
  hover:bg-gray-300
  transform[rotateY(180deg)]
`;

const Moon = tw(HiMoon)`
	h-6
	w-6
	text-indigo-500
`;

const Sun = tw(HiSun)`
	h-6
	w-6
	text-yellow-500
`;

const Styled = {
  Flip,
  InnerFlip,
  Front,
  Back,
  Moon,
  Sun,
  ButtonPos,
};
export default Styled;
