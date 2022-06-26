import Link from "components/util/Link";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import Styled from "./NavItem.styles";
interface INavItemProps {
  item: ReactNode | ReactNode[];
  label: string;
  isActive: boolean;
  onClick?: () => void;
  href?: string;
}

const ItemVariant = {
  active: {
    transition: {
      type: "normal",
      duration: 0.4,
    },
  },
  inactive: {
    width: "10%",
    transition: {
      type: "normal",
      duration: 0.4,
    },
  },
};

const ItemLabelVariant = {
  active: {
    opacity: 1,
    display: "block",
  },
  inactive: {
    opacity: 0,
    transitionEnd: { display: "none" },
  },
};

function NavItem({
  item,
  label,
  isActive,
  onClick,
  href,
}: INavItemProps): JSX.Element {
  const [key, _] = useState(new Date().toDateString());

  return (
    <Link
      href={href}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Styled.Wrap onClick={onClick} isActive={isActive}>
        <motion.div
          key={key}
          variants={ItemVariant}
          animate={isActive ? "active" : "inactive"}
        >
          <Styled.Inline>
            <span>{item}</span>

            <motion.span
              variants={ItemLabelVariant}
              animate={isActive ? "active" : "inactive"}
            >
              <Styled.Label>{label}</Styled.Label>
            </motion.span>
          </Styled.Inline>
        </motion.div>
      </Styled.Wrap>
    </Link>
  );
}

export default NavItem;
