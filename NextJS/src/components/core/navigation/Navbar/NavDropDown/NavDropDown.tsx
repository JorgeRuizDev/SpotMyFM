import { Popover } from "@headlessui/react";
import Transition from "components/core/display/molecules/Transition";
import { useState } from "react";
import { usePopper } from "react-popper";
import NavDropItems from "../../NavDropItems";
import Styled from "./NavDropDown.styles";
interface INavDropDownProps {
  username?: string;
}

function NavDropDown({ username }: INavDropDownProps): JSX.Element {
  // Popper Attributes:
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left-end",
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          mainAxis: false, // true by default
          altAxis: true,
          padding: 10,
          rootBoundary: "document",
        },
      },
    ],
  });

  return (
    <Popover
      tw="relative"
      as="div"
      style={{ position: "relative", height: "100%" }}
    >
      <Popover.Button
        as="div"
        ref={setReferenceElement}
        style={{ cursor: "pointer", height: "100%" }}
      >
        <Button username={username || "Stranger"} />
      </Popover.Button>

      <div
        ref={setPopperElement}
        style={{
          ...styles.popper,
          position: "absolute",
          zIndex: 41,
          top: 32,
          right: -120,
        }}
        {...attributes.popper}
      >
        <Transition>
          <Popover.Panel as="div">
            <Styled.PanelStyle>
              <NavDropItems />
            </Styled.PanelStyle>
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}

function Button({ username }: { username: string }) {
  return (
    <Styled.Row>
      <Styled.Arrow/>
      <Styled.BtnLayout>
        <Styled.Message>Welcome Back</Styled.Message>
        <Styled.Username>{username}</Styled.Username>
      </Styled.BtnLayout>
    </Styled.Row>
  );
}

export default NavDropDown;
