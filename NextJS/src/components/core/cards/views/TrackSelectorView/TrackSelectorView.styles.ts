import tw from "twin.macro";

const FinishWrap = tw.div`

  w-full
  flex
  justify-center


  fixed
  bottom-0
  //TODO: Responsive Bottom with phone navigation
`;

const FinishPlaylist = tw.div`


  flex
  flex-row
  dark:bg-darkCard-base
  bg-lightCard-base
  rounded
`;

const Styled = { FinishPlaylist, FinishWrap };

export default Styled;
