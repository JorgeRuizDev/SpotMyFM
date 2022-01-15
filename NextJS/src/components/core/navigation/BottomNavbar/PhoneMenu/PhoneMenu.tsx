import useBackButton from "hooks/back/useBackButton";
import useEscapeKey from "hooks/back/useEscapeKey";
import NavDropItems from "../../NavDropItems";
import Styled from "./PhoneMenu.styles";
interface IPhoneMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function PhoneMenu({ isOpen, onClose }: IPhoneMenuProps): JSX.Element {
  useBackButton(onClose, isOpen);
  useEscapeKey(onClose, isOpen);

  return isOpen ? (
    <Styled.FullScreen>
      <NavDropItems />
    </Styled.FullScreen>
  ) : (
    <></>
  );
}

export default PhoneMenu;
