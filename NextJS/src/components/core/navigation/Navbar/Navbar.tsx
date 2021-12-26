import Link from "components/util/Link";
import { useLoginStore } from "store/useLogin";

import Styled from "./Navbar.styles";
import NavbarLeftItems from "./NavbarLeftItems";

import NavbarRightSide from "./NavbarRightSide";

function Navbar(): JSX.Element {
  const { isLogged } = useLoginStore();

  return isLogged ? (
    <>
      <Styled.Navbar>
        <Styled.LeftSide>
          <Link href={"/"} style={{ width: "min-content" }}>
            <Styled.LogoTitle>
              <Styled.Logo />
              <Styled.Title>MySpotifyFM</Styled.Title>
            </Styled.LogoTitle>
          </Link>

          <NavbarLeftItems />
        </Styled.LeftSide>

        <Styled.RightSide>
          <NavbarRightSide />
        </Styled.RightSide>
      </Styled.Navbar>
    </>
  ) : (
    <></>
  );
}

export default Navbar;
