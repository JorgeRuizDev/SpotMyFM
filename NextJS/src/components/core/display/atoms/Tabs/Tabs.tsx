import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";
import Styled from "./Tabs.styles";

/*
USAGE EXAMPLE: 
  <Tabs defaultTabId={"1"}>
    <TabWrap>
      <Tab id={"1"}><p>UNO</p></Tab>
      <Tab id={"2"}><p>DOS</p></Tab>
    </TabWrap>

    <TabContentWrap>
      <TabContent id={"1"}>
        <p>Hola</p>
      </TabContent>
      <TabContent id={"2"}>
        <p>Adios</p>
      </TabContent>
    </TabContentWrap>
  </Tabs>

*/

// Context
interface IActiveTabContex {
  id: string;
  setId: (id: string) => void;
}

const ActiveTabContext = createContext<IActiveTabContex | undefined>(undefined);
function useActiveTabContext() {
  const c = useContext(ActiveTabContext);
  if (c === undefined) throw "ActiveTabContext has no Provider";
  return c;
}

interface ITabsProps {
  defaultTabId: string;
  children: React.ReactNode[];
}
function Tabs({ defaultTabId, children }: ITabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(defaultTabId);

  function setId(id: string) {
    setActiveTab(id);
  }

  return (
    <>
      <ActiveTabContext.Provider value={{ id: activeTab, setId }}>
        {children}
      </ActiveTabContext.Provider>
    </>
  );
}

interface ITabProps {
  id: string;
  isColumn?: boolean;
  children: React.ReactNode[] | React.ReactNode;
}
function Tab({ id, children, isColumn }: ITabProps): JSX.Element {
  const { id: activeId, setId } = useActiveTabContext();
  return (
    <>
      <Styled.Tab
        isColumn={isColumn}
        isActive={id === activeId}
        onClick={() => setId(id)}
      >
        {children}
      </Styled.Tab>
    </>
  );
}

interface ITabContentProps {
  id: string;
  children: React.ReactNode;
}

const variants = {
  open: {
    opacity: 1,
    height: "auto",
    display: "block",
    transition: { ease: "easeInOut", duration: 0.3 },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { ease: "easeInOut", duration: 0.3 },
    transitionEnd: { display: "none" },
  },
};

function TabContent({ id, children }: ITabContentProps): JSX.Element {
  const activeId = useActiveTabContext().id;

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={activeId === id ? "open" : "closed"}
      variants={variants}
      style={{ display: activeId === id ? "block" : "none" }}
    >
      {children}
    </motion.div>
  );
}

const TabWrap = Styled.TabWrap;
const TabContentWrap = Styled.TabContentWrap;
export { Tabs, Tab, TabContent, TabWrap, TabContentWrap };
