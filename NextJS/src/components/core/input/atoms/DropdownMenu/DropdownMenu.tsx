import Link from "components/util/Link";
import React, { ReactNode } from "react";
import Styled from "./DropdownMenu.styles";

export interface IDropItem {
  component: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface IDropdownMenuProps {
  children: ReactNode;
  items?: IDropItem[];
  titleStyle?: "spotify" | "input";
  itemStyle?: "spotify" | "input";
}

/**
 * DropDown API
 * Children: Current Dropdown API
 * items: Items to Render
 *    - component: Component to Render
 *    - href: If link, converts the item into an <a/> tag
 *    - onClick: on item select
 */
function DropdownMenu({
  children,
  items,
  titleStyle = "spotify",
  itemStyle = "spotify",
}: IDropdownMenuProps): JSX.Element {
  return (
    <Styled.Wrap className={"group"}>
      <Styled.Title titleStyle={titleStyle}>
        {children}
        <Styled.DropIcons titleStyle={titleStyle}/>
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
