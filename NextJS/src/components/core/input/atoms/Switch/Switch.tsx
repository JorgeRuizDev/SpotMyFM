import Sw from "react-switch";
import Styled from "./Switch.styles";
interface ISwitchProps {
  isChecked: boolean;
  onToggle: () => void;
  disabled?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

function Switch({
  isChecked,
  onToggle: toggleAction,
  children,
  disabled,
}: ISwitchProps) {
  return (
    <Styled.Inline>
      <Sw
        checked={isChecked}
        onChange={toggleAction}
        // Checked
        onColor="#A7F3D0"
        onHandleColor="#10B981"
        // Unchecked:
        offColor="#BFDBFE"
        handleDiameter={17}
        uncheckedIcon={false}
        checkedIcon={false}
        disabled={disabled || false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={17}
        width={35}
      />
      {children}
    </Styled.Inline>
  );
}

export default Switch;
