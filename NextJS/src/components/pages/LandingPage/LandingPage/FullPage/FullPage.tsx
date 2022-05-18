import { AnimatePresence, motion } from "framer-motion";

import React, {
  ReactNode,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { CSSProperties } from "styled-components";
import Buttons from "styles/Buttons";
import Styled from "./FullPage.styles";
import FullPageElement from "./FullPageElement";
interface IFullPageProps {
  children: ReactNode[];
  styles?: (CSSProperties | null | undefined)[];
  topButton?: ReactNode;
  showTip?: boolean;
}
/**
 *
 * @param children Two or more children to render. Each children will be treated as an individual page
 * @param styles An array of styles, they must be in the same position as the children and will apply changes to the FullScreen children wrapper.
 * @returns
 */
function FullPage({
  children,
  styles,
  topButton,
  showTip = true,
}: IFullPageProps): JSX.Element {
  const refs = useRef<RefObject<HTMLDivElement>[]>(createRefs(children.length));

  const [activeRefId, setActiveRefId] = useState(0);

  useEffect(() => {
    refs.current = createRefs(children.length);
  }, [children]);

  return (
    <>
      <SideList />
      <Styled.SnapWrap>
        {children.map((c, i) => (
          <FullPageElement
            key={i}
            ref={refs.current?.[i]}
            style={styles?.[i] || undefined}
            markAsActive={() => {
              setActiveRefId(i);
            }}
          >
            {c}
          </FullPageElement>
        ))}
      </Styled.SnapWrap>
      <GoToTopBtn />
      <ArrowTip />
    </>
  );

  function ArrowTip(): JSX.Element {
    return (
      <AnimatePresence>
        {showTip && activeRefId === 0 && (
          <motion.div
            exit={{ opacity: 1 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ style: "linear", duration: 1 }}
          >
            <Styled.BouncyArrowWrap>
              <Styled.BouncyArrow />
            </Styled.BouncyArrowWrap>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  function GoToTopBtn(): JSX.Element {
    return (
      <AnimatePresence>
        {topButton && activeRefId !== 0 && (
          <motion.div
            exit={{ opacity: 1 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ style: "linear", duration: 1 }}
          >
            <Styled.TopButtonWrap>
              <Buttons.PrimaryGreenButton
                onClick={() => refs.current[0].current?.scrollIntoView()}
              >
                {topButton}
              </Buttons.PrimaryGreenButton>
            </Styled.TopButtonWrap>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  function SideList(): JSX.Element {
    return (
      <Styled.SideListPos>
        <Styled.SideList>
          <ListItem onClick={prev}>
            <FaAngleUp />
          </ListItem>
          {refs.current.map((r, i) => (
            <ListItem
              isOpen={i === activeRefId}
              key={i}
              onClick={() => r.current?.scrollIntoView()}
            >
              {i + 1}
            </ListItem>
          ))}
          <ListItem onClick={next}>
            <FaAngleDown />
          </ListItem>
        </Styled.SideList>
      </Styled.SideListPos>
    );
  }

  function prev() {
    const active = activeRefId > 0 ? activeRefId - 1 : children.length - 1;
    refs.current?.[active]?.current?.scrollIntoView();
  }

  function next() {
    const active = activeRefId < children.length - 1 ? activeRefId + 1 : 0;
    refs.current?.[active]?.current?.scrollIntoView();
  }
}

interface IListItem {
  children?: ReactNode;
  isOpen?: boolean;
  onClick: () => void;
}
/**
 * Styled components has some problems with dark mode, so isOpen color scheme was broken.
 * In order to fix it, i decided to use two different components
 * @param props: IListItem
 * @returns
 */
function ListItem({ children, isOpen = false, onClick }: IListItem) {
  return isOpen ? (
    <Styled.ActiveListItem onClick={onClick}>{children}</Styled.ActiveListItem>
  ) : (
    <Styled.ListItem onClick={onClick}>{children}</Styled.ListItem>
  );
}

function createRefs(numberRefs: number) {
  const _refs: RefObject<HTMLDivElement>[] = [];

  for (let i = 0; i < numberRefs; i++) {
    _refs.push(createRef<HTMLDivElement>());
  }
  return _refs;
}

export default FullPage;
