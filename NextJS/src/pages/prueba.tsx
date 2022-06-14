import NavItem from "components/core/navigation/Navbar/NavItem";
import NavDropItems from "components/core/navigation/NavDropItems";
import React, { useCallback, useEffect, useState } from "react";

import GroupedGreenButton from "components/core/input/atoms/GroupedGreenButton";
import { HiFilter } from "react-icons/hi";
import { BiReset } from "react-icons/bi";
import useTranslation from "next-translate/useTranslation";
import LandingPage from "../components/pages/LandingPage/LandingPage";

export default function Prueba() {
  const [isActive, setIsActive] = useState(true);
  const { t } = useTranslation();
  return (
    <>
        <LandingPage></LandingPage>
    </>
  );
}
