import tw from "twin.macro";

const Inline = tw.div`
  flex
  flex-row
  items-center
  justify-around
`;

const LabelWrap = tw.div`
  bg-darkCard-base
  rounded-md
  m-1
  
`;

const Styled = { Inline, LabelWrap };

export default Styled;
