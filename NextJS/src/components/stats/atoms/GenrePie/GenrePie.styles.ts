import tw from "twin.macro";

const LabelWrap = tw.div`
  bg-darkCard-base
  rounded-md
  m-1
  
`

const Inline = tw.div`
  flex
  flex-row
  items-center
  justify-around
`

const Styled = {LabelWrap, Inline};

export default Styled;
