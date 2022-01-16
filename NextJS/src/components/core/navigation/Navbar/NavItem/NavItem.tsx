import Link from "components/util/Link";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import Styled from "./NavItem.styles";
interface INavItemProps {
  item: ReactNode | ReactNode[];
  label: ReactNode | ReactNode[];
  isActive: boolean;
  onClick?: () => void;
  href?: string;
}

const ItemVariant = {
  active: {
    width: "100%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  inactive: {
    width: "10%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const ItemLabelVariant = {
  active: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: -30,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.1,
    },
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
    <Styled.Wrap onClick={onClick}>
      <Link href={href}>
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
              {label}
            </motion.span>
          </Styled.Inline>
        </motion.div>
      </Link>
    </Styled.Wrap>
  );
}

export default NavItem;
