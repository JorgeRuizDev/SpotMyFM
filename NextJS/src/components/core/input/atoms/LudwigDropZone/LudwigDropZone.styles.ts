import styled from "styled-components";
import tw from "twin.macro";

import { BsFillFileEarmarkMusicFill } from "react-icons/bs";
interface IGetColor {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
}

const getColor = (props: IGetColor) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div<IGetColor>`
  ${tw`
    flex
    flex-col
    items-center
    justify-center
    text-6xl
    p-5
    m-1
    border-2
    rounded-sm
    border-dashed
    dark:(bg-darkCard-base text-white hover:bg-darkCard-hover)
    bg-lightCard-base
    hover:bg-lightCard-hover
    text-gray-900
    relative 
    h-64
    hover:cursor-pointer
    text-center
  `}
  flex: 1;
  border-color: ${(props) => getColor(props)};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const BgIcon = tw(BsFillFileEarmarkMusicFill)`

  text-9xl

  absolute
  opacity-5
`;

const Layout = tw.div`
  flex
  flex-col
  items-center
  justify-center
  space-y-12
`;
const Styled = { Container, BgIcon, Layout };

export default Styled;
