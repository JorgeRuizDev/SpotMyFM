import styled, { StyledComponent } from "styled-components";
import { IoMdClose } from "react-icons/io";
import tw from "twin.macro";

import { IconType } from "react-icons";

interface IButton {
  rounded?: boolean;
}

const BasicButton: StyledComponent<
  "button",
  any,
  IButton,
  never
> = styled.button<IButton>(({ rounded }) => [rounded && tw`px-3 py-3`]);

const PrimaryBlueButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`

	dark:bg-indigo-700
	dark:hover:bg-indigo-600

	bg-indigo-600
	hover:bg-indigo-700

`;

const SecondaryBlueButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`

	bg-indigo-100
	hover:bg-indigo-200
	text-indigo-700
	border-indigo-700
	border
	hover:text-indigo-600

`;

const PrimaryGreenButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`

	dark:bg-green-500
	dark:hover:bg-green-400

	bg-green-600
	hover:bg-green-500
`;

const PrimaryRedButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`

	dark:bg-red-500
	dark:hover:bg-red-400

	bg-red-500
	hover:bg-red-400
`;

const SecondaryGreenButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`
	bg-green-100
	text-green-700
	border-green-700
	border
	
	hover:bg-green-200
	hover:text-green-600
`;

const SecondaryRedButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`
	bg-red-100
	text-red-500
	border-red-500
	border

	hover:bg-red-200
	hover:text-red-600
`;

const LoginButton: StyledComponent<"button", any, IButton, never> = tw(
  BasicButton
)`
	bg-gradient-to-r
	from-green-400
	to-green-600
	hover:from-green-700
	hover:to-green-900

	text-white
	font-bold

	py-3
	px-5
	
	rounded-full
`;

interface ICheckButton {
  isChecked: boolean;
}
const CheckableGreenButton: StyledComponent<
  "button",
  any,
  IButton & ICheckButton,
  never
> = styled(SecondaryGreenButton)<ICheckButton>(({ isChecked }) => [
  isChecked && tw`	bg-green-600	hover:bg-green-500 text-white hover:text-white`
]);

const CloseButton: IconType = tw(IoMdClose)`
	// Display in the first row / last col 
	order-first
	md:order-last

	// size
	mr-1
	mt-1

	// Size and Margin

	text-3xl

	// Color: 
	hover:text-lightCard-hover
	text-darkCard-base


	// Hover Style:
	cursor-pointer
`;

const GreenCloseButton: IconType = tw(CloseButton)`
	text-lightGreen-base
	hover:text-lightGreen-hover
`;

const LayoutCenter = tw.div`
	flex
	flex-row
	flex-wrap

	items-center
	justify-center
`;

const LayoutLeft = tw.div`
	flex
	flex-row
	flex-wrap

	items-center
	justify-start
`;

const Styled = {
  PrimaryBlueButton,
  SecondaryBlueButton,
  PrimaryGreenButton,
  SecondaryGreenButton,

  PrimaryRedButton,
  SecondaryRedButton,
  CheckableGreenButton,

  CloseButton,
  GreenCloseButton,
  LoginButton,

  LayoutCenter,
  LayoutLeft
};
export default Styled;
