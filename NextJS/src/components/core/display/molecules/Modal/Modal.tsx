import ReactDOM from "react-dom";
import useBackButton from "hooks/back/useBackButton";
import useEscapeKey from "hooks/back/useEscapeKey";
import React, { createRef, useState } from "react";
import { MouseEvent, useEffect } from "react";
import Buttons from "styles/Buttons";
import Styled from "./Modal.styles";
import { AnimatePresence, motion } from "framer-motion";

interface IModalProps {
  children?: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: () => void;
  scrollOverflow?: boolean;
  lockBodyScroll?: boolean;
  setModalBodyId?: (id: string) => void;
  // The modal BG is the same as the page body (instead of the card bg)
  bodyBackgroundColor?: "material" | "card" | "card-hover";

  // Hides the Modal instead of umonting it from the DOM, so the modal body keeps it's states
  doNotUmount?: boolean;
}

const variants = {
  open: { opacity: 1 },

  closed: { opacity: 0 },
};

const isBrowser = typeof window !== "undefined";

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
  bodyBackgroundColor = "material",
  scrollOverflow = true,
  lockBodyScroll = true,
  setModalBodyId,
}: IModalProps): JSX.Element {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [key, setKey] = useState(new Date().getTime());

  useEffect(() => {
    setModalBodyId && setModalBodyId(key.toString());
  }, [key, setModalBodyId]);

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
      show_parent();
      !wasLocked && unlockBackScroll();
    };
  }, [isOpen, lockBodyScroll]);

  const modalBody = (
    <motion.div
      variants={variants}
      transition={{ duration: 0.3 }}
      animate={isOpen ? "open" : "closed"}
      key={key}
    >
      <Styled.FullScreenBackground
        onClick={onClose}
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: "0vh" }}
        exit={{ opacity: 0, y: "100vh" }}
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
          <div
            style={{
              overflow: scrollOverflow ? "auto" : "hidden",
              padding: "5px",
            }}
            id={key.toString()}
          >
            {children}
          </div>
        </Styled.ModalBody>
      </Styled.FullScreenBackground>
    </motion.div>
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
  return isBrowser ? (
    ReactDOM.createPortal(
      <AnimatePresence exitBeforeEnter>{modalHideLogic}</AnimatePresence>,
      document.getElementById("modal-core") || document.createElement("div")
    )
  ) : (
    <></>
  );
}

function lockBackScroll(): void {
  document.body.style.overflow = "hidden";

  document.body.style.height = "100%";
  const main = document.getElementById("main");
  main && main.classList.add("hide-modal-body");
}

function show_parent(): void {
  const main = document.getElementById("modal-core");
  if (main) {
    const children = main.children;
    const upper_brother = children[Math.max(0, children.length - 2)];
    if (upper_brother) {
      upper_brother.classList.add("modal-second-last-child");
      setTimeout(() => {
        upper_brother.classList.remove("modal-second-last-child");
      }, 300);
    }
  }
}

function unlockBackScroll(): void {
  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
  const main = document.getElementById("main");

  main && main.classList.remove("hide-modal-body");
}

export default React.memo(Modal);
