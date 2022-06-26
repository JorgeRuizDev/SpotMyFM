import InfiniteLoadingBar from "components/core/display/atoms/InfiniteLoadingBar";

import Link from "components/util/Link";
import { useLoginStore } from "store/useLogin";
import { useSessionStore } from "store/useSession";

import Styled from "./Navbar.styles";
import NavbarLeftItems from "./NavbarLeftItems";

import NavbarRightSide from "./NavbarRightSide";

function Navbar(): JSX.Element {
  const { isLogged } = useLoginStore();
  const { isLoading } = useSessionStore();

  return isLogged ? (
    <Styled.Navbar>
      <Styled.NavWrapper>
        <Styled.LeftSide>
          <Link href={"/"} style={{ width: "min-content" }}>
            <Styled.LogoTitle>
              <Styled.Logo />
              <Styled.Title>SpotMyFM</Styled.Title>
            </Styled.LogoTitle>
          </Link>

          <NavbarLeftItems />
        </Styled.LeftSide>
        <Styled.RightSide>
          <NavbarRightSide />
        </Styled.RightSide>
      </Styled.NavWrapper>

      <InfiniteLoadingBar isLoading={!!isLoading} />
    </Styled.Navbar>
  ) : (
    <></>
  );
}

export default Navbar;
