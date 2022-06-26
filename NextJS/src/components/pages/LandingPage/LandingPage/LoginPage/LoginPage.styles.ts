import tw from "twin.macro";

const CardWrap = tw.div`
  flex
  flex-row

  flex-wrap

  items-start
  justify-center

`;

const Card = tw.div`
  flex
  flex-col
  items-center
  justify-center
  max-width[400px]

  m-10

`;

const ColCenter = tw.div`
  flex
  flex-col
  items-center
  justify-center

  space-y-2

`;

const ContentWrapper = tw.div`
  flex
  flex-col
  items-center
  justify-center
  space-y-12

  p-2

  z-10

  // because of the curvy thing
  margin-top[146px]
  2xl:mt-0
`;

const ButtonWrap = tw.div`
  flex
  flex-row
  flex-wrap
  w-full

  items-center
  justify-center
`;

const TopButtonWrap = tw(ButtonWrap)`

  xl:display[none]
  flex
  flex-col
  space-y-2

`;

const Green = tw.span`
  text-center
  dark:text-lightGreen-base
  text-darkGreen-hover
  
`;

const Red = tw.span`
  text-center
  dark:text-red-400
  text-red-500
  
`;

export const P = tw.p`
  text-center

`;

const Title = tw.h2`
  text-center
  //md:text-5xl
`;

const Subtitle = tw.h3`
  text-center
  //md:text-4xl
`;

const LoginRow = tw.div`
  flex
  flex-row
  items-center
  justify-center
  space-x-3
`;

const Styled = {
  Card,
  CardWrap,
  Green,
  Red,
  ContentWrapper,
  ColCenter,
  ButtonWrap,
  TopButtonWrap,
  Title,
  Subtitle,
  LoginRow,
};

export default Styled;
