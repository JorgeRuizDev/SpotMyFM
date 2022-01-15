import { AnimatePresence } from "framer-motion";

import { useState } from "react";
import { useClientsStore } from "store/useClients";
import { useLoginStore } from "store/useLogin";
import NavDropDown from "../NavDropDown";
import Styled from "./NavbarRightSide.styles";

function NavbarRightSide(): JSX.Element {
  const { isLogged, logOut } = useLoginStore();
  const { user } = useClientsStore();

  const [showLogOut, setShowLogOut] = useState(false);

  function toggleLogOut() {
    setShowLogOut(!showLogOut);
  }

  return isLogged ? (
    <>
      <AnimatePresence>
        <NavDropDown />

        <Styled.Relative key={2}>
          <Styled.ProfilePic
            key={"A"}
            src={
              user.spotifyUser?.images?.[1]?.url ||
              user.spotifyUser?.images?.[0]?.url ||
              "BlankAvatar.png"
            }
            whileHover={{
              scale: 0.95,
              transition: { ease: "easeInOut", duration: 0.1 },
            }}
            alt={"Profile Picture"}
            animate={showLogOut ? { rotate: 360 } : ""}
            transition={{ duration: 0.5 }}
            onClick={toggleLogOut}
          />
        </Styled.Relative>

        <Styled.LogOutDiv
          key={"3"}
          animate={showLogOut ? { width: 150 } : { width: 0 }}
          transition={{ style: "linear", duration: 0.4 }}
        >
          <Styled.LogOutButton
            key={"C"}
            onClick={logOut}
            initial={{ x: "150%" }}
            animate={showLogOut ? { x: 0 } : { x: "150%" }}
            exit={{ x: "150%" }}
            transition={{ style: "linear", duration: 0.4 }}
          >
            Log Out
          </Styled.LogOutButton>
        </Styled.LogOutDiv>
      </AnimatePresence>
    </>
  ) : (
    <></>
  );
}

export default NavbarRightSide;
