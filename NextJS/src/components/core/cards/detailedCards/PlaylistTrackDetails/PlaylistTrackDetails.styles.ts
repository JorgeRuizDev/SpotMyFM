import tw from "twin.macro";

const ProfilePic = tw.img`
  height[40px]
  width[40px]

  rounded-full
  object-fit[cover]
`;

const Wrap = tw.div`
  md:p-6
  sm:p-4
  p-2
  mb-4
`;

const Styled = { ProfilePic, Wrap };

export default Styled;
