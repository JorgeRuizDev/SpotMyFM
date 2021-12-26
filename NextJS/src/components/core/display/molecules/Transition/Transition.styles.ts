import { Transition as _Transition } from "@headlessui/react";
import styled from "styled-components";
import tw from "twin.macro";

const Transition = styled(_Transition)`
  &.enter {
    ${tw`transition ease-out duration-200`}
  }
  &.enterFrom {
    ${tw`opacity-0 translate-y-1`}
  }
  &.enterTo {
    ${tw`opacity-100 translate-y-0`}
  }
  &.leave {
    ${tw`transition ease-in duration-150`}
  }
  &.leaveFrom {
    ${tw`opacity-100 translate-y-0`}
  }
  &.leaveTo {
    ${tw`opacity-0 translate-y-1`}
  }
`
const Styled = {Transition};

export default Styled;
