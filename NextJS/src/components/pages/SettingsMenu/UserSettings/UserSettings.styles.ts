import tw from "twin.macro";

const Col = tw.div`
  flex
  flex-col
  space-y-2
`;

const Avatar = tw.img`
  h-10
  w-10
  rounded-full
  object-fit[cover]
`;

const Padding = tw.article`
  pl-14
`;

const Styled = { Col, Avatar, Padding };

export default Styled;
