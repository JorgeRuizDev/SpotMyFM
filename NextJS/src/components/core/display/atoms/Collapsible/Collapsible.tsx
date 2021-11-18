import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Styled from "./Collapsible.styles";
interface ICollapsibleProps {
  isOpenDefault?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

const variants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

function Collapsible({ isOpenDefault, children }: ICollapsibleProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault || false);
  const isAnimated = true;
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <Styled.Wrapper
            initial={(isAnimated && { height: 0, y: -200, opacity: 0 }) || {}}
            animate={(isAnimated && { height: "auto", y: 0, opacity: 1 }) || {}}
            exit={(isAnimated && { height: 0, y: -200, opacity: 0 }) || {}}
            transition={{ ease: "easeInOut", duration: 0.4 }}
          >
            <Styled.CenterChild>{children}</Styled.CenterChild>
          </Styled.Wrapper>
        ) : null}
      </AnimatePresence>

      {/* Toggle Button: */}
      <>
        <Styled.ToggleButton onClick={toggleIsOpen}>
          <motion.div
            variants={variants}
            animate={isOpen ? "open" : "closed"}
            transition={{ ease: "easeIn", duration: 0.4 }}
          >
            <Styled.ToggleIcon />
          </motion.div>
        </Styled.ToggleButton>
      </>
    </>
  );

  function ToggleButton() {}
}

export default Collapsible;
