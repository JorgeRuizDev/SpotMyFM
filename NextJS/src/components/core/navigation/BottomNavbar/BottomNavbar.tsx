import Styled from "./BottomNavbar.styles";
interface IBottomNavbarProps {
  isLogged?: boolean;
}

function BottomNavbar({ isLogged }: IBottomNavbarProps): JSX.Element {
  return isLogged ? (
    <Styled.Display>
      <Styled.FixPos>
        <h1>Hola</h1>
        <h1>Adios</h1>
      </Styled.FixPos>
    </Styled.Display>
  ) : (
    <></>
  );
}

export default BottomNavbar;
