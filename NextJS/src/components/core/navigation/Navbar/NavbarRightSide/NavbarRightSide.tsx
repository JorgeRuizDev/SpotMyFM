import { AnimatePresence } from "framer-motion";

import { useState } from "react";
import { useClientsStore } from "store/useClients";
import { useLoginStore } from "store/useLogin";
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
      <Styled.IconWrap>
        <Styled.Globe />
        <Styled.Github />
        <Styled.Help />
        <Styled.Settings />
      </Styled.IconWrap>

      <AnimatePresence>
        <Styled.p
          style={{ textTransform: "capitalize", userSelect: "none" }}
          onClick={toggleLogOut}
        >
          Welcome {user.spotifyUser?.display_name || "Stranger"}! {""}
        </Styled.p>
        <Styled.Relative>
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
          <Styled.Arrow />
        </Styled.Relative>

        <Styled.LogOutDiv
          key={"B"}
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
