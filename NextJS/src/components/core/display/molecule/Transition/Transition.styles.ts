import { Transition as _Transition } from "@headlessui/react";
import styled from "styled-components";
import tw from "twin.macro";

const Transition = styled(_Transition)`
  &.enter {
    ${tw`transition ease-out duration-1000`}
  }
  &.enterFrom {
    ${tw`transform scale-95 opacity-0`}
  }
  &.enterTo {
    ${tw`transform scale-100 opacity-100`}
  }
  &.leave {
    ${tw`transition duration-1000 ease-out`}
  }
  &.leaveFrom {
    ${tw`transform scale-100 opacity-100`}
  }
  &.leaveTo {
    ${tw`transform scale-95 opacity-0`}
  }
`
const Styled = {Transition};

export default Styled;
