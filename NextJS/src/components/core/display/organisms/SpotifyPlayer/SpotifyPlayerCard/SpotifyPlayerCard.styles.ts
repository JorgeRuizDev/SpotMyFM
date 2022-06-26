import tw from "twin.macro";
import Buttons from "styles/Buttons";
const Card = tw.div`
  flex
  flex-col
  items-center
  justify-center
  
  w-full
  p-4
  rounded-md
  text-center

  border-2
  

  dark:(bg-darkCard-hover border-darkCard-base)
  bg-lightCard-hover
  border-lightCard-base
  
  drop-shadow-2xl
  shadow-2xl

  
  

  space-y-3
`;

const relative = tw.div`
  relative

`;

const RightCorner = tw.div`
  absolute
  right-2
  bottom-2

  group-hover:block
  md:hidden
  color["white"]
  mix-blend-mode["difference"]

`;

const Cover = tw.img`
  rounded-md
  cursor-pointer
`;

const Inline = tw.div`
  flex
  flex-row
  flex-wrap
  gap-x-4
  gap-y-2
`;

const ButtonRow = tw.div`
  w-full

  flex
  flex-row
  items-center
  justify-center


  space-x-4
`;

const PlayBtn = tw(Buttons.SecondaryGreenButton)`
  scale-125
`;

const Styled = {
  Card,
  Cover,
  Inline,
  PlayBtn,
  ButtonRow,
  relative,
  RightCorner,
};

export default Styled;
