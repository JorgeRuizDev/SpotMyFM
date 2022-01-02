import { FaSpotify } from "react-icons/fa";
import tw from "twin.macro";

const Navbar = tw.nav`

  sticky
  top-0
  left-0
	z-40
`;

const NavWrapper = tw.div`
  w-full
  h-14
  bg-green-500
  dark:bg-green-600
  rounded-b-md
  hidden

  md:flex
  flex-row
  justify-between
  items-center
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
  hidden
  lg:block
	ml-1
	mr-4
`;

const LeftSide = tw.div`
	items-center
	flex
	justify-start

	h-full
	
`;

const RightSide = tw.div`
	items-center
	flex
	justify-end

	h-full
`;

const PlayerWrap = tw.div`
  w-[30%]
  max-w-[300px]
  
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
  NavWrapper,
  LeftSide,
  PlayerWrap,
  RightSide,
  ProfilePic,
  p,
  LogoTitle,
  Logo,
  Title,
};
export default Styled;
