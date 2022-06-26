import { ReactNode } from "react";
import Styled from "./Pill.styles";
interface IPillProps {
  children: ReactNode | ReactNode[];
  type: string;
  onClose: () => void;
}

/**
 * Pill Component: A rounded button with different colors.
 * @param param0
 * @returns
 */
function Pill({ onClose, type, children }: IPillProps): JSX.Element {
  return (
    <Styled.Pill typeColor={type} onClick={onClose}>
      {children}
    </Styled.Pill>
  );
}

export default Pill;
