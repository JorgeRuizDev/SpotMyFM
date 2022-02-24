import NavItem from "components/core/navigation/Navbar/NavItem";
import NavDropItems from "components/core/navigation/NavDropItems";
import React, { useCallback, useEffect, useState } from "react";

import GroupedGreenButton from "components/core/input/atoms/GroupedGreenButton";
import { HiFilter } from "react-icons/hi";
import { BiReset } from "react-icons/bi";

export default function Prueba() {
  const [isActive, setIsActive] = useState(true);

  return (
    <>
      <GroupedGreenButton
        buttons={[
          {
            body: (
              <>
                <HiFilter /> <span>Filtrame</span>
              </>
            ),
            onClick: () => {
              setIsActive(false);
            },
          },
          {
            body: (
              <>
                <BiReset />
              </>
            ),
            onClick: () => {
              setIsActive(true);
            },
            disabled: isActive,
            secondary: true,
          },
        ]}
      />
    </>
  );
}
