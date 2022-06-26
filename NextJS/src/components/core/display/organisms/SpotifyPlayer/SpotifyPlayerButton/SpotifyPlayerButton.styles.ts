import styled from "styled-components";
import tw from "twin.macro";

const PlayerWrap = tw.div`
  w-full
  flex
  items-center
  space-x-3
  flex-row
  flex-nowrap
`;

const Title = tw.span`
  text-xl
  text-textColor-darkTheme
  dark:text-textColor-darkTheme
`;

const Subtitle = tw.span`
  text-lg
  text-textColor-darkTheme
  dark:text-textColor-darkTheme
`;

const TextColWrap = tw.div`
  flex
  flex-col
  overflow-x-hidden

`;

const TrackImg = tw.img`
  max-height[50px]
  rounded-md

`;

const PlayingStatusWrap = tw.div`
  
  relative
  space-x-5
  flex
  overflow-x-hidden
  overflow-y-hidden
`;

const PlayingText = tw.div`
  whitespace-nowrap
`;

interface IMarquee {
  animateMarq?: boolean;
}
const Marquee1 = styled.div<IMarquee>(({ animateMarq = true }) => [
  animateMarq &&
    tw`
    animate-marquee
    whitespace-nowrap
  `,
]);

const Marquee2 = styled.div<IMarquee>(({ animateMarq = true }) => [
  tw`
    animate-marquee2
    whitespace-nowrap
    absolute
    top-0
    hidden
  `,

  animateMarq &&
    tw`
    block
  `,
]);

const Styled = {
  PlayerWrap,
  TextColWrap,
  PlayingStatusWrap,
  PlayingText,
  Marquee1,
  Marquee2,
  Title,
  Subtitle,
  TrackImg,
};

export default Styled;
