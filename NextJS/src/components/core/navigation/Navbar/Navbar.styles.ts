import { FaSpotify } from "react-icons/fa";
import tw from "twin.macro";

const Navbar = tw.nav`
	w-full
	h-14
	bg-green-500
	dark:bg-green-600
	rounded-b-md
	hidden
	
	md:flex
	fixed
	z-50
`;

const LogoTitle = tw.div`
	h-full
	width[fit-content]
	flex
	flex-row
	justify-start
	items-center
	cursor-pointer
`;

const Logo = tw(FaSpotify)`
	text-white
	dark:text-white
	p-2
	h-full
	width[auto]

`;

const Title = tw.h3`
	text-white
	dark:text-white
	ml-1
	mr-4
`;

const LeftSide = tw.div`
	items-center
	flex
	justify-start
	w-7/12
	h-full
	
`;

const RightSide = tw.div`
	items-center
	flex
	justify-end
	w-5/12
	h-full
`;

const p = tw.p`
	dark:text-white
	text-white
`;

const ProfilePic = tw.img`
	rounded-3xl
	h-5/6
	m-2
	border-solid
	border
	border-black
	cursor-pointer
`;

const Styled = {
  Navbar,
  LeftSide,
  RightSide,
  ProfilePic,
  p,
  LogoTitle,
  Logo,
  Title
};
export default Styled;
