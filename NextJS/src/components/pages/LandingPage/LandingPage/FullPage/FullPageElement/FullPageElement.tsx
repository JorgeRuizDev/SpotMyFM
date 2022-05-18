import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Styled from "./FullPageElement.styles";
import {useInView} from "react-intersection-observer";
interface IFullPageElementProps {
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;

  markAsActive: () => void;
}

const variants = {
  open: {
    opacity: 1,
    transition: { ease: "easeInOut", duration: 0.5 }
  },
  closed: {
    opacity: 0
  }
};

const FullPageElement = React.forwardRef<HTMLDivElement, IFullPageElementProps>(
  function Fpe({ children, style, markAsActive }, ref): JSX.Element {
    const [wasOpen, setWasOpen] = useState(false);

    const [inViewTopRef, inViewTop] = useInView({
      threshold: 0,
      rootMargin: "30px"
    });

    useEffect(() => {
      inViewTop && markAsActive();
      inViewTop && setWasOpen(true);
    }, [inViewTop, markAsActive]);

    return (
      <div>
        <motion.div
          style={style}
          variants={variants}
          animate={wasOpen ? "open" : "closed"}
        >
          <Styled.Observer ref={inViewTopRef}/>
          <Styled.FullPage ref={ref}>
            <Styled.CenterItem>{children}</Styled.CenterItem>
          </Styled.FullPage>
        </motion.div>
      </div>
    );
  }
);

export default FullPageElement;
