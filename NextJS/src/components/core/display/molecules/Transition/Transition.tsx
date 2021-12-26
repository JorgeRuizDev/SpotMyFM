import { ReactNode } from "react";

import Styled from "./Transition.styles";
interface ITransitionProps {
  appear?: boolean;
  unmount?: boolean;
  show?: boolean;
  children?: ReactNode | ReactNode[];
}

function Transition(props: ITransitionProps) {
  return (
    <Styled.Transition
      {...props}
      enter="enter"
      enterFrom="enterFrom"
      enterTo="enterTo"
      leave="leave"
      leaveFrom="leaveFrom"
      leaveTo="leaveTo"
    >
      {props.children}
    </Styled.Transition>
  );
}

export default Transition;
