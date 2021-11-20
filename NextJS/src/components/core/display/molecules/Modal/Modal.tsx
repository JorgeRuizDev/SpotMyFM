import ReactDOM from "react-dom";
import useBackButton from "hooks/back/useBackButton";
import useEscapeKey from "hooks/back/useEscapeKey";
import React, { createRef, useState } from "react";
import { MouseEvent, useEffect } from "react";
import Buttons from "styles/Buttons";
import Styled from "./Modal.styles";

interface IModalProps {
  children?: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: () => void;
  scrollOverflow?: boolean;
  lockBodyScroll?: boolean;

  // The modal BG is the same as the page body (instead of the card bg)
  bodyBackgroundColor?: boolean;

  // Hides the Modal instead of umonting it from the DOM, so the modal body keeps it's states
  doNotUmount?: boolean;
}

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

/**
 *
 * Small Modal that shows a component in the middle of the screen.
 * The modal can be closed by:
 *  - Clicking the BackGround
 *  - Clicking the Close Button
 *  - Pressing ESC key
 *  - Back browser action.
 * @param {IModalProps} { children, isOpen, onClose }
 * @return {*}
 */
function Modal({
  children,
  isOpen,
  onClose,
  doNotUmount = false,
  bodyBackgroundColor = false,
  scrollOverflow = true,
  lockBodyScroll = true,
}: IModalProps): JSX.Element {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  // Mark as opened on open:
  useEffect(() => {
    !hasBeenOpened && isOpen && setHasBeenOpened(true);
  }, [isOpen, hasBeenOpened]);

  // Listen for the Back and ESC press actions
  useBackButton(onClose, isOpen);
  useEscapeKey(onClose, isOpen);

  function disableClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  // Lock / Unlock Body Scroll logic
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    // Check if the body scroll was already locked
    const wasLocked = document.body.style.overflow === "hidden";

    // Lock
    lockBodyScroll && lockBackScroll();

    // On component unmount: Unlock
    return () => {
      !wasLocked && unlockBackScroll();
    };
  }, [isOpen, lockBodyScroll]);

  const modalBody = (
    <Styled.FullScreenBackground
      onClick={onClose}
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
      data-testid="modal-bg"
    >
      <Styled.ModalBody
        onClick={disableClick}
        darkBackground={bodyBackgroundColor}
      >
        <Styled.TopRow>
          <Buttons.GreenCloseButton
            onClick={onClose}
            data-testid="modal-close-btn"
          />
        </Styled.TopRow>
        <div style={{ overflow: scrollOverflow ? "auto" : "hidden" }}>
          {children}
        </div>
      </Styled.ModalBody>
    </Styled.FullScreenBackground>
  );

  const modalHideLogic = doNotUmount
    ? // If can't be unmounted: Mount it once and show/hide it with CSS magic.
      hasBeenOpened && (
        <div
          style={
            doNotUmount && isOpen ? { display: "block" } : { display: "none" }
          }
        >
          {modalBody}
        </div>
      )
    : // Mount / Umount conditionally.
      isOpen && <>{modalBody}</>;
  return ReactDOM.createPortal(
    modalHideLogic,
    document.getElementById("modal-core") || document.createElement("div")
  );
}

function lockBackScroll(): void {
  document.body.style.overflow = "hidden";
  document.body.style.height = "100%";
}

function unlockBackScroll(): void {
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}

export default React.memo(Modal);
