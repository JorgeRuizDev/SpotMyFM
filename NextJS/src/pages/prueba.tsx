import NavItem from "components/core/navigation/Navbar/NavItem";
import NavDropItems from "components/core/navigation/NavDropItems";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { toast } from "react-toastify";
import { BackendDBClient } from "restClients/backendDB/backendDBclient";
import cookieManager from "util/cookies/loginCookieManager";
import {
  Tab,
  TabContent,
  TabContentWrap,
  TabWrap,
  Tabs,
} from "components/core/display/atoms/Tabs";
import PromptAreYouSure from "components/core/input/molecules/PromptAreYouSure";
import { BsFillTrashFill } from "react-icons/bs";

export default function Prueba() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <PromptAreYouSure
        message="Do you really want to delete your account?"
        onCancel={() => {}}
        onClose={() => {}}
        onSure={() => {}}
        svg={<BsFillTrashFill />}
      ></PromptAreYouSure>
    </>
  );
}
