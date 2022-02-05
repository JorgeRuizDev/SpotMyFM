import tw from "twin.macro";
import Buttons from "styles/Buttons";
const BtnWrap = tw.div`
  flex
  flex-row
  rounded-full
  width[fit-content]


  divide-x
  divide-green-300
  overflow-hidden
`;

const Btn = tw(Buttons.PrimaryGreenButton)`
  m-0
  rounded-none
  border-0
`;
const BtnSecondary = tw(Buttons.SecondaryGreenButton)`
  m-0
  rounded-none
  border-0
`;

const Styled = { BtnWrap, Btn, BtnSecondary };

export default Styled;
