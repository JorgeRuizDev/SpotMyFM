import Link from "components/util/Link";
import React, { ReactNode } from "react";
import Styled from "./DropdownMenu.styles";

interface IDropItem {
  component: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface IDropdownMenuProps {
  children: ReactNode;
  items?: IDropItem[];
  titleStyle?: "spotify";
  itemStyle?: "lastFM";
}

function DropdownMenu({
  children,
  items,
  titleStyle,
  itemStyle,
}: IDropdownMenuProps): JSX.Element {
  return (
    <Styled.Wrap className={"group"}>
      <Styled.Title titleStyle={titleStyle}>
        {children}
        <Styled.DropIcons />
      </Styled.Title>
      <Styled.ItemList>
        {items?.map((x, i) => (
          <Link href={x.href} key={i}>
            <Styled.Item onClick={x.onClick} itemStyle={itemStyle}>
              {x.component}
            </Styled.Item>
          </Link>
        ))}
      </Styled.ItemList>
    </Styled.Wrap>
  );
}

export default DropdownMenu;
